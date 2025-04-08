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
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <Sidebar />
        <div className="flex-1">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý khách hàng</h1>
            <table className="w-full border">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Họ tên</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Vai trò</th>
                  <th className="p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="text-center border-b">
                    <td className="p-2">{user.id}</td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2 space-x-2">
                      <button onClick={() => handleEdit(user)} className="bg-yellow-500 px-3 py-1 text-white rounded">Sửa</button>
                      <button onClick={() => handleDelete(user.id)} className="bg-red-500 px-3 py-1 text-white rounded">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal chỉnh sửa khách hàng */}
            {modalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Chỉnh sửa khách hàng</h2>
                  <input
                    type="text"
                    placeholder="Tên khách hàng"
                    value={editUser.name}
                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                    className="w-full p-2 mb-3 border rounded"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
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
