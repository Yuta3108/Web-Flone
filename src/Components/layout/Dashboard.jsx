import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader";
import StartCard from "../layout/StartCard";
import ProductTable from "../layout/ProductTable";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

const dummyData = {
  stats: [
    { title: "Tổng Sản Phẩm", value: 120 },
    { title: "Doanh Thu Tháng", value: "$45,000" },
    { title: "Đơn Hàng Mới", value: 35 },
  ],
  products: [
    { id: "SP001", name: "Cà phê sữa", price: 30000 },
    { id: "SP002", name: "Trà đào", price: 35000 },
  ],
  orders: [
    { id: "DH001", customer: "Nguyễn Văn A", total: 60000 },
    { id: "DH002", customer: "Trần Thị B", total: 35000 },
  ],
  users: [
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "Khách hàng" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", role: "Khách hàng" },
  ],
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // 👈 Thêm state điều hướng

  useEffect(() => {
    setTimeout(() => {
      setData(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  const renderContent = () => {
    switch (activePage) {
      case "products":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Danh sách sản phẩm</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2">Mã</th>
                  <th className="p-2">Tên</th>
                  <th className="p-2">Giá</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((p) => (
                  <tr key={p.id} className="text-center border-b">
                    <td className="p-2">{p.id}</td>
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.price.toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Danh sách đơn hàng</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2">Mã ĐH</th>
                  <th className="p-2">Khách hàng</th>
                  <th className="p-2">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {data.orders.map((o) => (
                  <tr key={o.id} className="text-center border-b">
                    <td className="p-2">{o.id}</td>
                    <td className="p-2">{o.customer}</td>
                    <td className="p-2">{o.total.toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "customers":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Danh sách người dùng</h2>
            <ProductTable users={data.users} />
          </div>
        );
      default:
        return (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.stats.map((stat, index) => (
                <StartCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
        <Sidebar setActivePage={setActivePage} /> {/* Gửi props điều hướng */}
        <div className="flex-1">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
