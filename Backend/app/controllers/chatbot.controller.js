const mongoose = require('mongoose');
const Category = require("../models/category.model.js");
const Food = require("../models/food.model.js");
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { console } = require('inspector');
require('dotenv').config();

class ChatController {
  //[GET] /chat?q=...
  async index(req, res) {

    try {
      const question = req.query.q;

      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      // Kiểm tra lời chào và tạm biệt
      const greetingPattern = /^(xin chào|chào|hello|hi|chào bạn|chào bot|hey)/i;
      const goodbyePattern = /^(tạm biệt|bye|goodbye|hẹn gặp lại|cảm ơn|thank you|thanks)/i;
      
      if (greetingPattern.test(question.trim())) {
        return res.json({ answer: "Xin chào! Tôi là chatbot hỗ trợ tư vấn món ăn. Tôi có thể giúp gì cho bạn?" });
      }
      
      if (goodbyePattern.test(question.trim())) {
        return res.json({ answer: "Cảm ơn bạn đã sử dụng dịch vụ! Chúc bạn một ngày tốt lành. Hẹn gặp lại!" });
      }

      // Kiểm tra xem câu hỏi có liên quan đến món ăn/sản phẩm không
      const questionLower = question.toLowerCase();
      const foodRelatedKeywords = [
        'món', 'món ăn', 'đồ ăn', 'thức ăn', 'food', 'sản phẩm', 'product',
        'giá', 'price', 'giá cả', 'giá tiền', 'cost',
        'menu', 'thực đơn', 'danh sách', 'list',
        'đặt', 'order', 'mua', 'buy', 'chọn', 'choose',
        'pizza', 'burger', 'pasta', 'salad', 'soup', 'nước', 'drink', 'đồ uống',
        'chuyên mục', 'category', 'loại', 'type',
        'dưới', 'trên', 'khoảng', 'tầm', 'nhỏ hơn', 'lớn hơn',
        'k', 'nghìn', 'ngàn', 'vnd', 'đồng'
      ];
      
      const hasFoodKeyword = foodRelatedKeywords.some(keyword => 
        questionLower.includes(keyword)
      );
      
      // Kiểm tra xem có số (có thể là giá) không
      const hasNumber = /\d/.test(question);
      
      // Nếu không có từ khóa liên quan đến món ăn và không có số, có thể là câu hỏi không liên quan
      if (!hasFoodKeyword && !hasNumber) {
        // Kiểm tra một số câu hỏi rõ ràng không liên quan
        const unrelatedPatterns = [
          /thời tiết|weather|nhiệt độ|temperature/i,
          /tin tức|news|báo|newspaper/i,
          /thể thao|sport|bóng đá|football/i,
          /phim|movie|film|cinema/i,
          /nhạc|music|bài hát|song/i,
          /game|trò chơi|play/i,
          /học|study|giáo dục|education/i,
          /công việc|job|work|việc làm/i,
          /du lịch|travel|trip|tour/i,
          /sức khỏe|health|bệnh|disease|doctor|bác sĩ/i,
          /chính trị|politics|chính phủ|government/i,
          /tài chính|finance|kinh tế|economy/i,
          /xã hội|society|giáo dục|education/i,
          /khoa học|science|technology|tech/i,
          /văn hóa|mày|địt|culture|art|artistic/i,
        ];
        
        const isUnrelated = unrelatedPatterns.some(pattern => pattern.test(question));
        
        if (isUnrelated) {
          return res.json({ answer: "Xin lỗi, tôi không có thông tin về điều đó! Tôi chỉ có thể tư vấn về món ăn và sản phẩm của nhà hàng." });
        }
      }

      // Lấy danh sách chuyên mục để hỗ trợ lọc
      const categories = await Category.find().select('name').lean();
      const categoryNames = categories.map(cat => cat.name).join(', ');

      // Lấy tất cả sản phẩm
      let foods = await Food.find({ show: true })
          .select('name price category')
          .populate('category', 'name')
          .sort({ updated_at: -1 })
          .lean();

      // Phân tích câu hỏi để lọc sản phẩm (questionLower đã được khai báo ở trên)
      
      // Lọc theo chuyên mục nếu có đề cập
      let filteredFoods = foods;
      const mentionedCategory = categories.find(cat => 
        questionLower.includes(cat.name.toLowerCase())
      );
      
      if (mentionedCategory) {
        filteredFoods = foods.filter(food => 
          food.category?.name === mentionedCategory.name
        );
      }

      // Lọc theo giá nếu có đề cập
      let priceValue = null;
      // Pattern 1: Tìm số có đơn vị (50k, 50 nghìn, 50000 vnd)
      const pricePattern1 = question.match(/(\d+)\s*(k|nghìn|ngàn|vnd|đồng)/i);
      // Pattern 2: Tìm từ khóa + số + đơn vị (dưới 50k, trên 50 nghìn)
      const pricePattern2 = question.match(/(dưới|trên|khoảng|tầm|nhỏ hơn|lớn hơn)\s*(\d+)\s*(k|nghìn|ngàn|vnd|đồng)?/i);
      // Pattern 3: Tìm số đơn thuần sau từ khóa (dưới 30000, trên 50000)
      const pricePattern3 = question.match(/(dưới|trên|khoảng|tầm|nhỏ hơn|lớn hơn)\s*(\d+)/i);
      // Pattern 4: Tìm số đơn thuần lớn (>= 1000) không có đơn vị
      const pricePattern4 = question.match(/\b(\d{4,})\b/);
      
      if (pricePattern1) {
        const value = parseInt(pricePattern1[1]);
        const unit = pricePattern1[2]?.toLowerCase() || '';
        priceValue = value * (unit.includes('k') || unit.includes('nghìn') || unit.includes('ngàn') ? 1000 : 1);
      } else if (pricePattern2) {
        const value = parseInt(pricePattern2[2]);
        const unit = pricePattern2[3]?.toLowerCase() || '';
        priceValue = value * (unit.includes('k') || unit.includes('nghìn') || unit.includes('ngàn') ? 1000 : 1);
      } else if (pricePattern3) {
        const value = parseInt(pricePattern3[2]);
        priceValue = value; // Số đơn thuần, không cần nhân
      } else if (pricePattern4 && (questionLower.includes('giá') || questionLower.includes('price'))) {
        // Chỉ xử lý số lớn nếu có từ khóa về giá
        const value = parseInt(pricePattern4[1]);
        if (value >= 1000) {
          priceValue = value;
        }
      }
      
      if (priceValue !== null && !isNaN(priceValue)) {
        if (questionLower.includes('dưới') || questionLower.includes('nhỏ hơn')) {
          filteredFoods = filteredFoods.filter(food => food.price && food.price < priceValue);
        } else if (questionLower.includes('trên') || questionLower.includes('lớn hơn')) {
          filteredFoods = filteredFoods.filter(food => food.price && food.price > priceValue);
        } else if (questionLower.includes('khoảng') || questionLower.includes('tầm')) {
          filteredFoods = filteredFoods.filter(food => 
            food.price && food.price >= priceValue * 0.8 && food.price <= priceValue * 1.2
          );
        } else {
          // Nếu chỉ có số mà không có từ khóa, tìm sản phẩm có giá gần bằng
          filteredFoods = filteredFoods.filter(food => 
            food.price && Math.abs(food.price - priceValue) <= priceValue * 0.2
          );
        }
      }

      // Nếu không có sản phẩm nào sau khi lọc và có điều kiện lọc, giữ nguyên kết quả rỗng
      // (không fallback về tất cả sản phẩm vì người dùng đã yêu cầu lọc cụ thể)

      // Giới hạn số lượng sản phẩm trong prompt để tránh vượt quá giới hạn token
      // Nhưng vẫn đảm bảo đủ thông tin cho câu trả lời đầy đủ
      const maxProductsInPrompt = 100;
      const foodsToShow = filteredFoods.slice(0, maxProductsInPrompt);
      const totalProducts = filteredFoods.length;
      const hasMoreProducts = totalProducts > maxProductsInPrompt;

      //Tạo prompt mô tả danh sách sản phẩm
      let productInfo = `Bạn là chatbot tư vấn món ăn chuyên nghiệp. Nhiệm vụ của bạn:
1. Trả lời lịch sự, thân thiện và đầy đủ
2. Chỉ liệt kê sản phẩm khi câu hỏi thực sự yêu cầu về món ăn, giá cả, hoặc sản phẩm
3. Nếu câu hỏi KHÔNG liên quan đến món ăn, đồ ăn, giá cả, hoặc sản phẩm của nhà hàng, hãy trả lời: "Xin lỗi, tôi không có thông tin về điều đó! Tôi chỉ có thể tư vấn về món ăn và sản phẩm của nhà hàng."
4. Nếu được yêu cầu lọc theo giá hoặc chuyên mục, chỉ liệt kê sản phẩm phù hợp
5. Trả lời đầy đủ, không bỏ sót thông tin. Nếu có nhiều sản phẩm, liệt kê tất cả
6. QUAN TRỌNG: Không liệt kê sản phẩm nếu câu hỏi không liên quan đến món ăn/sản phẩm

Danh sách chuyên mục có sẵn: ${categoryNames}

Danh sách sản phẩm (${totalProducts} sản phẩm${hasMoreProducts ? `, hiển thị ${foodsToShow.length} sản phẩm đầu tiên` : ''}):`;

      // Format món ăn
      foodsToShow.forEach((food, index) => {
          const categoryName = food.category?.name || 'Không rõ chuyên mục';
          const price = food.price ? food.price.toLocaleString('vi-VN') : 'Chưa có giá';
          productInfo += `\n${index + 1}. ${food.name || 'Không có tên'}: ${price} đồng (${categoryName})`;
      });

      if (hasMoreProducts) {
        productInfo += `\n\nLưu ý: Còn ${totalProducts - maxProductsInPrompt} sản phẩm khác. Hãy thông báo cho khách hàng biết tổng số sản phẩm là ${totalProducts}.`;
      }

      const prompt = `${productInfo}\n\nCâu hỏi của khách hàng: ${question}`;

      // Kiểm tra nếu không có sản phẩm nào
      if (!filteredFoods || filteredFoods.length === 0) {
        return res.json({ answer: "Xin lỗi, hiện tại không có sản phẩm nào phù hợp với yêu cầu của bạn." });
      }

      //Gửi yêu cầu đến OpenRouter
      let response;
      try {
        // Xác định max_tokens dựa trên số lượng sản phẩm
        // Nếu có nhiều sản phẩm, cần nhiều token hơn để trả lời đầy đủ
        let maxTokens = 500;
        if (filteredFoods.length > 20) {
          maxTokens = 1500; // Câu trả lời dài cho danh sách lớn
        } else if (filteredFoods.length > 10) {
          maxTokens = 1000; // Câu trả lời vừa phải
        } else if (filteredFoods.length > 5) {
          maxTokens = 800; // Câu trả lời đầy đủ
        }

        response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: maxTokens
        }, {
            headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://yourdomain.com/',
            'X-Title': 'My AI Chatbot'
            },
            timeout: 30000
        });
      } catch (apiError) {
        console.error('OpenRouter API error:', apiError.response?.data || apiError.message);
        // Nếu API lỗi, trả về danh sách sản phẩm đã lọc trực tiếp (đầy đủ)
        if (filteredFoods.length > 0) {
          let directAnswer = `Dưới đây là danh sách sản phẩm phù hợp (${filteredFoods.length} sản phẩm):\n\n`;
          filteredFoods.forEach((food, index) => {
            const categoryName = food.category?.name || 'Không rõ chuyên mục';
            const price = food.price ? food.price.toLocaleString('vi-VN') : 'Chưa có giá';
            directAnswer += `${index + 1}. ${food.name || 'Không có tên'}: ${price} VND (${categoryName})\n`;
          });
          return res.json({ answer: directAnswer });
        }
        throw apiError; // Ném lỗi để catch block bên ngoài xử lý
      }

      const answer = response?.data?.choices?.[0]?.message?.content || 'Xin lỗi, tôi không hiểu câu hỏi của bạn.';
      return res.json({ answer });
      
    } catch (err) {
      console.error('Chatbot error:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      
      // Trả về thông báo lỗi chi tiết hơn trong môi trường development
      if (process.env.NODE_ENV === 'development') {
        return res.status(500).json({ 
          answer: "Hệ thống đang gặp lỗi, vui lòng thử lại sau.",
          error: err.message,
          stack: err.stack
        });
      }
      
      return res.json({ answer: "Hệ thống đang gặp lỗi, vui lòng thử lại sau." });
    }
  }
}


module.exports = new ChatController();
