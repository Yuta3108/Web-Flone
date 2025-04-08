import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Smartphone, ShoppingCart, Users, Settings } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Quản Lý Shop</h2>
      <ul className="space-y-4">
        <li
          className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <Home size={20} /> Dashboard
        </li>
        <li
          className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer"
          onClick={() => navigate("/dashboard/sanpham")}
        >
          <Smartphone size={20} /> Sản phẩm
        </li>
        <li
          className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer"
          onClick={() => navigate("/dashboard/donhang")}
        >
          <ShoppingCart size={20} /> Đơn hàng
        </li>
        <li
          className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer"
          onClick={() => navigate("/dashboard/khachhang")}
        >
          <Users size={20} /> Khách hàng
        </li>
        <li
          className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer"
          onClick={() => navigate("/dashboard/caidat")}
        >
          
        </li>
      </ul>
    </div>
  );
}
