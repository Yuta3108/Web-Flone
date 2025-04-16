import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import { SPRING } from '../../api';

export default function DonHangPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${SPRING}/api/donhang`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Lỗi tải đơn hàng:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xoá đơn hàng?")) return;
    try {
      await fetch(`${SPRING}/api/donhang/${id}`, { method: 'DELETE' });
      fetchOrders();
    } catch (err) {
      alert("Xoá thất bại.");
    }
  };

  const handleEdit = (order) => {
    setEditOrder({ ...order });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${SPRING}/api/donhang/${editOrder.maDonHang}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editOrder),
      });
      if (res.ok) {
        fetchOrders();
        setModalOpen(false);
      } else {
        alert("Cập nhật thất bại.");
      }
    } catch (err) {
      alert("Lỗi cập nhật.");
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("vi-VN");
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
                    <th className="p-3 text-left">Số lượng</th>

                    <th className="p-3 text-left">Ngày đặt</th>
                    <th className="p-3 text-left">Thanh toán</th>
                    <th className="p-3 text-left">Trạng thái</th>
                    <th className="p-3 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.maDonHang} className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <td className="p-3">{order.maDonHang}</td>
                      <td className="p-3">{order.khachHang?.tenKhachHang || "Ẩn danh"}</td>
                      <td className="p-3">{order.tongTien?.toLocaleString()} đ</td>
                      <td className="p-3">{order.soLuong}</td>
                     
                      <td className="p-3">{formatDate(order.ngayDatHang)}</td>
                      <td className="p-3">{order.phuongThucThanhToan}</td>
                      <td className="p-3">{order.trangThai}</td>
                      <td className="p-3 space-x-2">
                        <button onClick={() => handleEdit(order)} className="text-yellow-500">Sửa</button>
                        <button onClick={() => handleDelete(order.maDonHang)} className="text-red-500">Xóa</button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-center p-4 text-gray-600 dark:text-gray-300">Không có đơn hàng nào.</td>
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
                    value={editOrder.tenKhachHang || ""}
                    onChange={(e) => setEditOrder({ ...editOrder, tenKhachHang: e.target.value })}
                    className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Tổng tiền"
                    value={editOrder.tongTien || ""}
                    onChange={(e) => setEditOrder({ ...editOrder, tongTien: Number(e.target.value) })}
                    className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Số lượng"
                    value={editOrder.soLuong || ""}
                    onChange={(e) => setEditOrder({ ...editOrder, soLuong: Number(e.target.value) })}
                    className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Địa chỉ giao"
                    value={editOrder.diaChiGiaoHang || ""}
                    onChange={(e) => setEditOrder({ ...editOrder, diaChiGiaoHang: e.target.value })}
                    className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <select
                    value={editOrder.trangThai}
                    onChange={(e) => setEditOrder({ ...editOrder, trangThai: e.target.value })}
                    className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  >
                    <option value="CHỜ_XỬ_LÝ">CHỜ_XỬ_LÝ</option>
                    <option value="ĐANG_GIAO">ĐANG_GIAO</option>
                    <option value="ĐÃ_GIAO">ĐÃ_GIAO</option>
                    <option value="ĐÃ_HUỶ">ĐÃ_HUỶ</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Phương thức thanh toán"
                    value={editOrder.phuongThucThanhToan || ""}
                    onChange={(e) => setEditOrder({ ...editOrder, phuongThucThanhToan: e.target.value })}
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
