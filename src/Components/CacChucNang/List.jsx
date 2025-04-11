import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function List() {
  const categories = ["Iphone", "Oppo", "Huawei", "SamSung", "Realmi", "Xiaomi", "Vivo"];
  const [phones, setPhones] = useState([]); // Dữ liệu sản phẩm
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []); // Giỏ hàng lấy từ localStorage
  const navigate = useNavigate(); // Hook để điều hướng

  // Lấy danh sách điện thoại từ server
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_NODE_URL}}/phones`)
      .then((res) => res.json())
      .then((data) => setPhones(data))
      .catch((err) => console.error("Lỗi lấy dữ liệu:", err));
  }, []);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (phone) => {
    const existingProduct = cart.find((item) => item.ma_san_pham === phone.ma_san_pham);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.ma_san_pham === phone.ma_san_pham ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...phone, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${phone.ten_sp || "Sản phẩm"} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div className="max-w-8/12 w-8/12 mx-auto px-4">
      <div className="text-2xl font-semibold text-center mt-8 mb-4">
        | Điện Thoại |
      </div>

      {/* Danh mục sản phẩm */}
      <div className="flex-wrap justify-center gap-2 sm:gap-3 mb-6 lg:flex hidden md:flex">
        {categories.map((category, index) => (
          <button
            key={index}
            className="px-4 py-2 border rounded-lg bg-gray hover:bg-gray text-sm sm:text-base"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
        {phones.map((phone, index) => (
          <div
            key={index}
            onClick={() => navigate(`/product/${phone.ma_san_pham}`)} // Điều hướng đến trang chi tiết sản phẩm
            className="cursor-pointer border rounded-lg p-4 flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl transition-transform duration-200 hover:scale-105"
          >
            {/* Ảnh sản phẩm */}
            <img
              src={`/ImgDT/${phone.img}`}
              alt={phone.ten_sp || "Tên sản phẩm"}
              className="w-24 h-24 object-cover mb-2"
            />

            {/* Nội dung sản phẩm */}
            <div className="flex flex-col flex-grow justify-between items-center w-full">
              <div className="text-sm font-medium">
                {phone.ten_sp || "Tên sản phẩm"}
              </div>
              <div className="text-red-600 font-semibold mt-2">
                Giá:{" "}
                {phone.gia
                  ? `${new Intl.NumberFormat("vi-VN").format(phone.gia)} VND`
                  : "Liên hệ"}
              </div>
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Ngừng sự kiện onClick từ đi tới chi tiết khi nhấn nút giỏ hàng
                addToCart(phone);
              }}
              className="mt-auto px-4 py-2 bg-gradient-to-t from-Purple-dark from-5% via-Purple-C via-30% to-Purple-L text-white rounded-md hover:bg-Purple-dark w-full"
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
