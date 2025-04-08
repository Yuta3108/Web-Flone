// Sidebar.jsx
import React from "react";
import { Home, Smartphone, ShoppingCart, Users, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Quản Lý Shop</h2>
      <ul className="space-y-4">
        <li className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer">
          <Home size={20} /> Dashboard
        </li>
        <li className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer">
          <Smartphone size={20} /> Sản phẩm
        </li>
        <li className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer">
          <ShoppingCart size={20} /> Đơn hàng
        </li>
        <li className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer">
          <Users size={20} /> Khách hàng
        </li>
        <li className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer">
          <Settings size={20} /> Cài đặt
        </li>
      </ul>
    </div>
  );
}
