import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';

const dummyUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'Khách hàng' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'Khách hàng' },
];

export default function KhachHangPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [users, setUsers] = useState(dummyUsers);
  const [editUser, setEditUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
    setModalOpen(true);
  };

  const handleSave = () => {
    setUsers(users.map(u => u.id === editUser.id ? editUser : u));
    setModalOpen(false);
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
                    <th className="p-3 text-left">Vai trò</th>
                    <th className="p-3 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.role}</td>
                      <td className="p-3 space-x-2">
                        <button onClick={() => handleEdit(user)} className="text-yellow-500">Sửa</button>
                        <button onClick={() => handleDelete(user.id)} className="text-red-500">Xóa</button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center p-4 text-gray-600 dark:text-gray-300">Không có khách hàng nào.</td>
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
                    value={editUser.name}
                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                    className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
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
