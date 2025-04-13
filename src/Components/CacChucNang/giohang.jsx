import React, { useState, useEffect } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Menu from "../layout/Menu";
import { Link } from "react-router-dom";

function GioHang() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  // Cập nhật giỏ hàng từ localStorage
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  // Tính tổng tiền, kiểm tra nếu giá trị gia hợp lệ
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.gia || 0; // Đảm bảo gia có giá trị hợp lệ
      return total + price * item.quantity;
    }, 0);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.ma_san_pham !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.ma_san_pham === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.ma_san_pham === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const isTotalZero = calculateTotalPrice() === 0;

  return (
    <div className="bg-white">
      <Header />
      <Menu />
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 lg:col-span-2 border-2">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Giỏ Hàng</h2>
            {cartItems.length === 0 ? (
              <div className="text-center text-black">
                Giỏ Hàng của bạn hiện tại đang trống.{" "}
                <Link to="/home" className="text-red-600 underline">
                  Tại Đây !
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.ma_san_pham} className="mb-4 flex justify-between items-center">
                  <div className="flex-1">
                    <span>{item.ten_sp}</span>
                    <div className="text-red-600">
                      {item.quantity} x {item.gia ? `${new Intl.NumberFormat('vi-VN').format(item.gia)} VND` : "Liên hệ"}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleDecreaseQuantity(item.ma_san_pham)} className="text-red-600">Giảm</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item.ma_san_pham)} className="text-red-600">Tăng</button>
                    <button onClick={() => handleRemoveItem(item.ma_san_pham)} className="text-red-600">Xóa</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 border-2">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Thông Tin Đơn Hàng</h2>
            <div className="flex justify-between text-gray-500">
              <span>Tổng số Tiền</span>
              <span className="text-red-600 font-bold">
                {calculateTotalPrice() > 0
                  ? calculateTotalPrice().toLocaleString()
                  : "0"}{" "}
                đ
              </span>
            </div>
            <div className="mt-4 text-center">
              {/* <Link
                to={isTotalZero ? "/giohang" : "/thanhtoan"}
                className={`w-full py-2 rounded-lg transition block text-center ${isTotalZero ? "bg-white cursor-not-allowed" : "bg-Purple-dark text-white hover:bg-Purple-light"
                  }`}
              >
                Thanh Toán
              </Link> */}
              <Link
                to="/thanhtoan"
                state={{ totalPrice: calculateTotalPrice() }}
                className={`w-full py-2 rounded-lg transition block text-center ${isTotalZero ? "bg-white cursor-not-allowed" : "bg-Purple-dark text-white hover:bg-Purple-light"}`}
              >
                Thanh Toán
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GioHang;
