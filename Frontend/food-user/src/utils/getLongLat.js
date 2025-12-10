import axios from "axios";

// Hàm lấy tọa độ từ địa chỉ sử dụng Nominatim API
export const getCoordinates = async (address) => {
  // Xử lý địa chỉ để tránh lỗi khi tìm kiếm
  const addressWithoutStreet = formatAddress(address);

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    addressWithoutStreet
  )}&format=json&limit=1`;
  try {
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      console.log(response.data);
      console.error("No results found for address:", address);
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

// Hàm xử lý tất cả các đơn hàng và lấy tọa độ
export const fetchOrderCoordinates = async (orders) => {
  const ordersWithCoordinates = await Promise.all(
    orders.map(async (order) => {
      const coordinates = await getCoordinates(order.address);
      return {
        ...order,
        coordinates: coordinates ? coordinates : { lat: 0, lon: 0 }, // Trả về tọa độ mặc định nếu không tìm thấy
      };
    })
  );
  return ordersWithCoordinates;
};
function formatAddress(address) {
  const parts = address.split(',').map(part => part.trim());
  
  // Xác định vị trí xã, huyện, và tỉnh
  let xa = parts.find(part => part.startsWith('Xã') || part.startsWith('Phường') || part.startsWith('Thị trấn'));
  let huyen = parts.find(part => part.startsWith('Huyện') || part.startsWith('Quận') || part.startsWith('Thị xã') || part.startsWith('Thành phố'));
  let tinh = parts.find(part => part.startsWith('Tỉnh') || part.startsWith('Thành phố'));

  // Loại bỏ tiền tố và khoảng trắng dư thừa
  xa = xa ? xa.replace(/^(Xã|Phường|Thị trấn)\s*/, '') : '';
  huyen = huyen ? huyen.replace(/^(Huyện|Quận|Thị xã|Thành phố)\s*/, '') : '';
  tinh = tinh ? tinh.replace(/^(Tỉnh|Thành phố)\s*/, '') : '';

  return `${xa}, ${huyen}, ${tinh}`;
}