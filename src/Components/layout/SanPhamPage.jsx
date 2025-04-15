import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Loader from "../layout/Loader";
import { SPRING } from "../../api";

export default function SanPhamPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [visibleDetails, setVisibleDetails] = useState({});
  const [newProduct, setNewProduct] = useState({
    tenSp: "",
    gia: "",
    giaCu: "",
    soLuong: "",
    maLoaiSanPham: "",
  });
  const [newDetail, setNewDetail] = useState({
    ktcn: "",
    camera: "",
    chip: "",
    ram: "",
    pin: "",
    tanSoQuet: "",
    loaiCpu: "",
  });
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchChiTiet();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${SPRING}/api/sanpham`);
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
      const res = await fetch(`${SPRING}/api/chitietsanpham`);
      const data = await res.json();
      const map = {};
      data.forEach((d) => {
        map[d.sanPham.maSanPham] = d;
      });
      setDetails(map);
    } catch (err) {
      console.error("Lỗi tải chi tiết:", err);
    }
  };

  const toggleDetail = (maSP) => {
    setVisibleDetails((prev) => ({ ...prev, [maSP]: !prev[maSP] }));
  };

  const handleDetailChange = (maSP, field, value) => {
    setDetails((prev) => ({
      ...prev,
      [maSP]: { ...prev[maSP], [field]: value },
    }));
  };

  const handleSaveDetail = async (maSP) => {
    const detail = details[maSP];
    if (!detail) return;

    const formData = new FormData();
    formData.append("chiTietSanPham", new Blob([JSON.stringify({
      ...detail,
      sanPham: { maSanPham: maSP },
    })], { type: "application/json" }));

    if (img1) formData.append("img1", img1);
    if (img2) formData.append("img2", img2);
    if (img3) formData.append("img3", img3);

    try {
      const res = await fetch(`${SPRING}/api/chitietsanpham/${detail.maMt}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        alert("Cập nhật chi tiết thành công!");
        fetchChiTiet();
      } else {
        alert("Lỗi cập nhật chi tiết!");
      }
    } catch (err) {
      alert("Lỗi kết nối khi cập nhật chi tiết!");
    }
  };

  const handleDeleteDetail = async (maMt) => {
    if (!window.confirm("Bạn có chắc muốn xoá chi tiết sản phẩm này?")) return;
    try {
      const res = await fetch(`${SPRING}/api/chitietsanpham/${maMt}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Đã xoá chi tiết sản phẩm.");
        fetchChiTiet();
      } else {
        alert("Xoá thất bại!");
      }
    } catch (err) {
      alert("Lỗi xoá chi tiết sản phẩm.");
    }
  };

  const handleAddProduct = async () => {
    if (!img || !newProduct.tenSp || !newProduct.maLoaiSanPham) {
      alert("Vui lòng chọn ảnh và nhập đầy đủ thông tin sản phẩm.");
      return;
    }

    try {
      const gia = parseFloat(newProduct.gia);
      const giaCu = parseFloat(newProduct.giaCu);
      const soLuong = parseInt(newProduct.soLuong);
      const maLoaiSanPham = parseInt(newProduct.maLoaiSanPham);

      const sanPhamForm = new FormData();
      sanPhamForm.append("sanPham", new Blob([
        JSON.stringify({
          tenSp: newProduct.tenSp,
          gia,
          giaCu,
          soLuong,
          loaiSanPham: { maLoaiSanPham },
        }),
      ], { type: "application/json" }));
      sanPhamForm.append("file", img);

      const res = await fetch(`${SPRING}/api/sanpham`, {
        method: "POST",
        body: sanPhamForm,
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Lỗi khi gửi sản phẩm:", err);
        alert("❌ Không thêm được sản phẩm!");
        return;
      }

      const created = await res.json();
      const maSanPham = created.maSanPham;

      const chiTietForm = new FormData();
      chiTietForm.append("sanPham", new Blob([
        JSON.stringify({
          sanPham: { maSanPham },
          ktcn: newDetail.ktcn,
          camera: newDetail.camera,
          chip: newDetail.chip,
          ram: newDetail.ram,
          pin: newDetail.pin,
          tanSoQuet: newDetail.tanSoQuet,
          loaiCpu: newDetail.loaiCpu,
        }),
      ], { type: "application/json" }));

      if (img1) chiTietForm.append("img1", img1);
      if (img2) chiTietForm.append("img2", img2);
      if (img3) chiTietForm.append("img3", img3);

      const detailRes = await fetch(`${SPRING}/api/chitietsanpham`, {
        method: "POST",
        body: chiTietForm,
      });

      if (detailRes.ok) {
        alert("✅ Thêm sản phẩm thành công!");
        fetchProducts();
        fetchChiTiet();
        setNewProduct({ tenSp: "", gia: "", giaCu: "", soLuong: "", maLoaiSanPham: "" });
        setNewDetail({ ktcn: "", camera: "", chip: "", ram: "", pin: "", tanSoQuet: "", loaiCpu: "" });
        setImg(null);
        setImg1(null);
        setImg2(null);
        setImg3(null);
      } else {
        const err = await detailRes.text();
        console.error("Lỗi khi gửi chi tiết sản phẩm:", err);
        alert("❌ Gửi chi tiết sản phẩm thất bại!");
      }
    } catch (err) {
      console.error("Lỗi kết nối:", err);
      alert("❌ Lỗi khi thêm sản phẩm.");
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Tên SP" value={newProduct.tenSp} onChange={(e) => setNewProduct({ ...newProduct, tenSp: e.target.value })} />
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Giá" value={newProduct.gia} onChange={(e) => setNewProduct({ ...newProduct, gia: e.target.value })} />
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Giá cũ" value={newProduct.giaCu} onChange={(e) => setNewProduct({ ...newProduct, giaCu: e.target.value })} />
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Số lượng" value={newProduct.soLuong} onChange={(e) => setNewProduct({ ...newProduct, soLuong: e.target.value })} />
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Mã loại sản phẩm" value={newProduct.maLoaiSanPham} onChange={(e) => setNewProduct({ ...newProduct, maLoaiSanPham: e.target.value })} />
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Loại CPU" value={newDetail.loaiCpu} onChange={(e) => setNewDetail({ ...newDetail, loaiCpu: e.target.value })} />
              <input type="file" onChange={(e) => setImg(e.target.files[0])} className="p-2 border rounded dark:bg-gray-700" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Kích thước màn hình" value={newDetail.ktcn} onChange={(e) => setNewDetail({ ...newDetail, ktcn: e.target.value })} />
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Camera" value={newDetail.camera} onChange={(e) => setNewDetail({ ...newDetail, camera: e.target.value })} />
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Chip" value={newDetail.chip} onChange={(e) => setNewDetail({ ...newDetail, chip: e.target.value })} />
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="RAM" value={newDetail.ram} onChange={(e) => setNewDetail({ ...newDetail, ram: e.target.value })} />
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Pin" value={newDetail.pin} onChange={(e) => setNewDetail({ ...newDetail, pin: e.target.value })} />
              <input className="p-2 border rounded dark:bg-gray-700" placeholder="Tần số quét" value={newDetail.tanSoQuet} onChange={(e) => setNewDetail({ ...newDetail, tanSoQuet: e.target.value })} />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input type="file" onChange={(e) => setImg1(e.target.files[0])} className="p-2 border rounded dark:bg-gray-700" />
              <input type="file" onChange={(e) => setImg2(e.target.files[0])} className="p-2 border rounded dark:bg-gray-700" />
              <input type="file" onChange={(e) => setImg3(e.target.files[0])} className="p-2 border rounded dark:bg-gray-700" />
            </div>
            <button onClick={handleAddProduct} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Thêm sản phẩm
            </button>

            <div className="mt-8">
              {loading ? <Loader /> : (
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
                            <td className="p-3"><img src={p.img} alt={p.tenSp} className="w-16 h-16 object-cover rounded" /></td>
                            <td className="p-3">{p.tenSp}</td>
                            <td className="p-3 text-green-600 font-semibold">{Number(p.gia).toLocaleString()}đ</td>
                            <td className="p-3 text-red-500 laine-through">{Number(p.giaCu).toLocaleString()}đ</td>
                            <td className="p-3">{p.loaiSanPham?.tenLoaiSanPham}</td>
                            <td className="p-3">{p.soLuong}</td>
                            <td className="p-3">
                              <button onClick={() => toggleDetail(p.maSanPham)} className="text-blue-600 underline hover:text-blue-800">
                                Chi tiết sản phẩm
                              </button>
                            </td>
                          </tr>
                          {visibleDetails[p.maSanPham] && details[p.maSanPham] && (
                            <tr className="bg-gray-50 dark:bg-gray-700">
                              <td colSpan="7" className="p-4">
                                <h3 className="font-bold text-lg mb-2">Chi tiết: {p.tenSp}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                  {["ktcn", "camera", "chip", "ram", "pin", "tanSoQuet"].map((field) => (
                                    <input key={field} className="p-2 border rounded dark:bg-gray-800" placeholder={field} value={details[p.maSanPham][field] || ""} onChange={(e) => handleDetailChange(p.maSanPham, field, e.target.value)} />
                                  ))}
                                </div>
                                <div className="flex justify-end mt-4 space-x-3">
                                  <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => handleSaveDetail(p.maSanPham)}>Lưu</button>
                                  <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => handleDeleteDetail(details[p.maSanPham].maMt)}>Xoá</button>
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
    </div>
  );
}
