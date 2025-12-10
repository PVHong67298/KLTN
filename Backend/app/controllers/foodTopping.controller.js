const FoodTopping = require("../models/foodTopping.model.js");
const Food = require("../models/food.model.js");
const Topping = require("../models/topping.model.js");

class FoodToppingController {

  // [GET] /foods/topping/:id
  async show(req, res) {
    try {
      const foodToppings = await FoodTopping.find({ food: req.params.id })
        .populate('food')
        .populate('topping');
  
      if (!foodToppings || foodToppings.length === 0) {
        //return res.status(404).json({ message: 'Không tìm thấy Food-Topping cho theo mã món ăn!' });
      }
  
      return res.json(foodToppings);
    } catch (error) {
      return res.status(500).json({ message: 'Lỗi khi truy xuất Food-Topping', error });
    }
  }

  // [POST] /foods/topping
  async create(req, res) {
    try {
      const { food, topping } = req.body;

      // Validate thủ công các trường
      if (!food || !topping) {
        return res.status(400).json({ message: 'Food và Topping là bắt buộc.' });
      }

      // Kiểm tra sự tồn tại của Food và Topping
      const foodExists = await Food.findById(food);
      const toppingExists = await Topping.findById(topping);
      if (!foodExists || !toppingExists) {
        return res.status(400).json({ message: 'Food hoặc Topping không tồn tại.' });
      }

      const foodTopping = new FoodTopping({ food, topping });
      await foodTopping.save();

      return res.status(201).json({ message: 'Tạo Food-Topping thành công', foodTopping });
    } catch (error) {
      return res.status(500).json({ message: 'Lỗi khi tạo Food-Topping', error });
    }
  }

  // [DELETE] /foods/topping/:id
  async delete(req, res) {
    try {
      const foodTopping = await FoodTopping.findByIdAndDelete(req.params.id);
      if (!foodTopping) {
        return res.status(404).json({ message: 'Không tìm thấy Food-Topping' });
      }
      return res.json({ message: 'Xóa Food-Topping thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Lỗi khi xóa Food-Topping', error });
    }
  }
}

module.exports = new FoodToppingController();
