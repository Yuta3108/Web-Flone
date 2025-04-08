import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';

const dummyOrders = [
  { id: 'DH001', customer: 'Nguyễn Văn A', total: 60000 },
  { id: 'DH002', customer: 'Trần Thị B', total: 35000 },
];

export default function DonHangPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [orders, setOrders] = useState(dummyOrders);
  const [editOrder, setEditOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleEdit = (order) => {
    setEditOrder({ ...order });
    setModalOpen(true);
  };

  const handleSave = () => {
    setOrders(orders.map(o => o.id === editOrder.id ? editOrder : o));
    setModalOpen(false);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>

            <div className="overflow-x-auto rounded shadow border dark:border-gray-700 bg-white dark:bg-gray-800">
              <table className="w-full border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Mã ĐH</th>
                    <th className="p-3 text-left">Khách hàng</th>
                    <th className="p-3 text-left">Tổng tiền</th>
                    <th className="p-3 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <td className="p-3">{order.id}</td>
                      <td className="p-3">{order.customer}</td>
                      <td className="p-3">{order.total.toLocaleString()} đ</td>
                      <td className="p-3 space-x-2">
                        <button onClick={() => handleEdit(order)} className="text-yellow-500">Sửa</button>
                        <button onClick={() => handleDelete(order.id)} className="text-red-500">Xóa</button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center p-4 text-gray-600 dark:text-gray-300">Không có đơn hàng nào.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal chỉnh sửa */}
            {modalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Chỉnh sửa đơn hàng</h2>
                  <input
                    type="text"
                    placeholder="Tên khách hàng"
                    value={editOrder.customer}
                    onChange={(e) => setEditOrder({ ...editOrder, customer: e.target.value })}
                    className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Tổng tiền"
                    value={editOrder.total}
                    onChange={(e) => setEditOrder({ ...editOrder, total: Number(e.target.value) })}
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
