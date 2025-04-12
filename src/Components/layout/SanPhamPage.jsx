import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Loader from "../layout/Loader";

const API_BASE = "https://nhom5ca1thu4.onrender.com/api";

export default function SanPhamPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [visibleDetails, setVisibleDetails] = useState({});

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/sanpham`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Lỗi tải sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchChiTiet = async () => {
    try {
      const res = await fetch(`${API_BASE}/chitietsanpham`);
      const data = await res.json();
      const detailMap = {};
      data.forEach((d) => {
        detailMap[d.sanPham.maSanPham] = d;
      });
      setDetails(detailMap);
    } catch (err) {
      console.error("Lỗi tải chi tiết:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchChiTiet();
  }, []);

  const toggleDetail = (maSP) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [maSP]: !prev[maSP],
    }));
  };

  const handleDetailChange = (maSP, field, value) => {
    setDetails((prev) => ({
      ...prev,
      [maSP]: {
        ...prev[maSP],
        [field]: value,
      },
    }));
  };

  const handleSaveDetail = async (maSP) => {
    const detail = details[maSP];
    if (!detail) return;
    const payload = {
      ...detail,
      sanPham: { maSanPham: maSP },
    };

    try {
      const res = await fetch(`${API_BASE}/chitietsanpham/${detail.maMt}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Cập nhật thành công!");
        fetchChiTiet();
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (err) {
      alert("Lỗi kết nối khi cập nhật.");
    }
  };

  const handleDeleteDetail = async (maMt) => {
    if (!window.confirm("Xoá chi tiết sản phẩm này?")) return;
    try {
      const res = await fetch(`${API_BASE}/chitietsanpham/${maMt}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Đã xoá.");
        fetchChiTiet();
      } else {
        alert("Xoá thất bại.");
      }
    } catch (err) {
      alert("Lỗi kết nối khi xoá.");
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
            {loading ? (
              <Loader />
            ) : (
              <div className="overflow-x-auto rounded shadow border dark:border-gray-700 bg-white dark:bg-gray-800">
                <table className="w-full border-collapse">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="p-3 text-left">Ảnh</th>
                      <th className="p-3 text-left">Tên</th>
                      <th className="p-3 text-left">Giá</th>
                      <th className="p-3 text-left">Giá cũ</th>
                      <th className="p-3 text-left">Loại</th>
                      <th className="p-3 text-left">SL</th>
                      <th className="p-3 text-left">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <React.Fragment key={p.maSanPham}>
                        <tr className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <td className="p-3">
                            <img
                              src={`/ImgDT/${p.img}`}
                              alt={p.tenSp}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="p-3">{p.tenSp}</td>
                          <td className="p-3 text-green-600 font-semibold">
                            {Number(p.gia).toLocaleString()}đ
                          </td>
                          <td className="p-3 text-red-500 line-through">
                            {Number(p.giaCu).toLocaleString()}đ
                          </td>
                          <td className="p-3">{p.loaiSanPham?.tenLoaiSanPham}</td>
                          <td className="p-3">{p.soLuong}</td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleDetail(p.maSanPham)}
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              Chi tiết sản phẩm
                            </button>
                          </td>
                        </tr>

                        {visibleDetails[p.maSanPham] && details[p.maSanPham] && (
                          <tr className="bg-gray-50 dark:bg-gray-700">
                            <td colSpan="7" className="p-4">
                              <h3 className="font-bold text-lg mb-2">
                                Chi tiết: {p.tenSp}
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  value={details[p.maSanPham].ktcn}
                                  onChange={(e) =>
                                    handleDetailChange(p.maSanPham, "ktcn", e.target.value)
                                  }
                                  placeholder="Kích thước màn hình"
                                  className="p-2 rounded border dark:bg-gray-800"
                                />
                                <input
                                  type="text"
                                  value={details[p.maSanPham].camera}
                                  onChange={(e) =>
                                    handleDetailChange(p.maSanPham, "camera", e.target.value)
                                  }
                                  placeholder="Camera"
                                  className="p-2 rounded border dark:bg-gray-800"
                                />
                                <input
                                  type="text"
                                  value={details[p.maSanPham].chip}
                                  onChange={(e) =>
                                    handleDetailChange(p.maSanPham, "chip", e.target.value)
                                  }
                                  placeholder="Chip"
                                  className="p-2 rounded border dark:bg-gray-800"
                                />
                                <input
                                  type="text"
                                  value={details[p.maSanPham].ram}
                                  onChange={(e) =>
                                    handleDetailChange(p.maSanPham, "ram", e.target.value)
                                  }
                                  placeholder="RAM"
                                  className="p-2 rounded border dark:bg-gray-800"
                                />
                                <input
                                  type="text"
                                  value={details[p.maSanPham].pin}
                                  onChange={(e) =>
                                    handleDetailChange(p.maSanPham, "pin", e.target.value)
                                  }
                                  placeholder="Pin"
                                  className="p-2 rounded border dark:bg-gray-800"
                                />
                                <input
                                  type="text"
                                  value={details[p.maSanPham].tanSoQuet}
                                  onChange={(e) =>
                                    handleDetailChange(p.maSanPham, "tanSoQuet", e.target.value)
                                  }
                                  placeholder="Tần số quét"
                                  className="p-2 rounded border dark:bg-gray-800"
                                />
                              </div>
                              <div className="flex justify-end mt-4 space-x-3">
                                <button
                                  className="px-4 py-2 bg-green-600 text-white rounded"
                                  onClick={() => handleSaveDetail(p.maSanPham)}
                                >
                                  Lưu
                                </button>
                                <button
                                  className="px-4 py-2 bg-red-600 text-white rounded"
                                  onClick={() =>
                                    handleDeleteDetail(details[p.maSanPham].maMt)
                                  }
                                >
                                  Xoá
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
