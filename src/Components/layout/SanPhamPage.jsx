import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';

const initialProducts = [
  { id: 'SP001', name: 'Cà phê sữa', price: 30000 },
  { id: 'SP002', name: 'Trà đào', price: 35000 },
];

export default function SanPhamPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ id: '', name: '', price: '' });

  const [editProduct, setEditProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddProduct = () => {
    if (!newProduct.id || !newProduct.name || !newProduct.price) {
      return alert("Vui lòng nhập đầy đủ thông tin.");
    }
    setProducts([...products, { ...newProduct, price: Number(newProduct.price) }]);
    setNewProduct({ id: '', name: '', price: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product });
    setModalOpen(true);
  };

  const handleSave = () => {
    setProducts(products.map(p => p.id === editProduct.id ? editProduct : p));
    setModalOpen(false);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

            {/* Form thêm sản phẩm */}
            <div className="mb-6 p-4 border rounded bg-white dark:bg-gray-800 shadow">
              <h2 className="text-lg font-semibold mb-2">➕ Thêm sản phẩm mới</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Mã SP"
                  value={newProduct.id}
                  onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                  className="p-2 border rounded w-full md:w-1/4"
                />
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="p-2 border rounded w-full md:w-1/3"
                />
                <input
                  type="number"
                  placeholder="Giá"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="p-2 border rounded w-full md:w-1/4"
                />
                <button
                  onClick={handleAddProduct}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Thêm
                </button>
              </div>
            </div>

            {/* Bảng sản phẩm */}
            <table className="w-full border">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-2">Mã</th>
                  <th className="p-2">Tên</th>
                  <th className="p-2">Giá</th>
                  <th className="p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="text-center border-b">
                    <td className="p-2">{product.id}</td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.price.toLocaleString()}đ</td>
                    <td className="p-2 space-x-2">
                      <button className="text-yellow-500" onClick={() => handleEdit(product)}>Sửa</button>
                      <button className="text-red-600" onClick={() => handleDelete(product.id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan={4} className="text-center p-4">Không có sản phẩm.</td></tr>
                )}
              </tbody>
            </table>

            {/* Modal chỉnh sửa sản phẩm */}
            {modalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm</h2>
                  <input
                    type="text"
                    placeholder="Tên sản phẩm"
                    value={editProduct.name}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    className="w-full p-2 mb-3 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Giá"
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
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
