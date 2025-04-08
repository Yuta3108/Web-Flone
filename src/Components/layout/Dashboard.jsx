import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader";
import StartCard from "../layout/StartCard";
import ProductTable from "../layout/ProductTable";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

// Dữ liệu mẫu cho dashboard
const dummyData = {
  stats: [
    { title: "Tổng Sản Phẩm", value: 120 },
    { title: "Doanh Thu Tháng", value: "$45,000" },
    { title: "Đơn Hàng Mới", value: 35 },
  ],
  users: [
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "Khách hàng" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", role: "Khách hàng" },
    // Thêm dữ liệu khác nếu cần
  ],
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Sử dụng dữ liệu mẫu để xem giao diện trước
    setTimeout(() => {
      setData(dummyData);
      setLoading(false);
    }, 1000); // Giả lập delay 1 giây
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
        <Sidebar />
        <div className="flex-1">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.stats?.map((stat, index) => (
                <StartCard key={index} stat={stat} index={index} />
              ))}
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Danh sách người dùng</h2>
              <ProductTable users={data?.users || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
