import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import { SPRING } from '../../api';


export default function KhachHangPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${SPRING}/api/khachhang`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Lỗi tải khách hàng:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xoá khách hàng?")) return;
    try {
      await fetch(`${`${SPRING}/api/khachhang`}/${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch (err) {
      alert("Xoá thất bại.");
    }
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${`${SPRING}/api/khachhang`}/${editUser.maKhachHang}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser),
      });
      if (res.ok) {
        fetchUsers();
        setModalOpen(false);
      } else {
        alert("Cập nhật thất bại.");
      }
    } catch (err) {
      alert("Lỗi cập nhật.");
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý khách hàng</h1>

            <div className="overflow-x-auto rounded shadow border dark:border-gray-700 bg-white dark:bg-gray-800">
              <table className="w-full border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Họ tên</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">SĐT</th>
                    <th className="p-3 text-left">Địa chỉ</th>
                    <th className="p-3 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.maKhachHang} className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <td className="p-3">{user.maKhachHang}</td>
                      <td className="p-3">{user.tenKhachHang}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.sdt}</td>
                      <td className="p-3">{user.diaChi}</td>
                      <td className="p-3 space-x-2">
                        <button onClick={() => handleEdit(user)} className="text-yellow-500">Sửa</button>
                        <button onClick={() => handleDelete(user.maKhachHang)} className="text-red-500">Xóa</button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center p-4 text-gray-600 dark:text-gray-300">Không có khách hàng nào.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal chỉnh sửa */}
            {modalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Chỉnh sửa khách hàng</h2>
                  <input
                    type="text"
                    placeholder="Tên khách hàng"
                    value={editUser.tenKhachHang}
                    onChange={(e) => setEditUser({ ...editUser, tenKhachHang: e.target.value })}
                    className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="SĐT"
                    value={editUser.sdt}
                    onChange={(e) => setEditUser({ ...editUser, sdt: e.target.value })}
                    className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    value={editUser.diaChi}
                    onChange={(e) => setEditUser({ ...editUser, diaChi: e.target.value })}
                    className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Hủy</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Lưu</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
