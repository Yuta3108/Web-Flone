import React, { useEffect, useState } from "react";
import { SPRING } from "../../api";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

 function ThongTinCaNhan() {
  const [user, setUser] = useState(null);
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) {
      navigate("/dangnhap");
    } else {
      setUser(localUser);
      setFormData(localUser);
    }
  }, []);

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!/^\d{10,11}$/.test(formData.sdt)) {
      alert("Số điện thoại phải gồm 10 đến 11 chữ số.");
      return;
    }
    try {
      const res = await fetch(`${SPRING}/api/khachhang/${formData.maKhachHang}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Cập nhật thành công!");
        localStorage.setItem("user", JSON.stringify(formData));
        setEditField(null);
      } else {
        alert("Lỗi cập nhật!");
      }
    } catch (err) {
      alert("Lỗi kết nối máy chủ!");
    }
  };

  const renderField = (label, field, value, isPassword = false) => (
    <div className="flex flex-col md:flex-row items-center justify-between py-3 border-b text-center md:text-left">
      <span className="w-full md:w-1/4 font-medium text-gray-700">{label}</span>
  
      {editField === field ? (
        <input
          type={isPassword ? "password" : "text"}
          value={formData[field] || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className="border px-3 py-1 rounded w-full md:w-1/2 text-center md:text-left"
        />
      ) : (
        <span className="w-full md:w-1/2 font-semibold text-black">
          {value || <em className="text-gray-400">Chưa cập nhật</em>}
        </span>
      )}
  
      <button
        onClick={() => handleEdit(field)}
        className="text-Purple-dark hover:underline w-full md:w-auto mt-2 md:mt-0"
      >
        Chỉnh Sửa
      </button>
    </div>
  );
  

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white mt-10 p-6 rounded shadow w-9/12 items-center">
      <div className="flex flex-col items-center mb-6">
        <img src="/img/LogoHinh.png" className="w-20 h-20 rounded-full" alt="avatar" />
        <h2 className="text-xl font-bold mt-2">{formData.tenKhachHang}</h2>
      </div>

      {renderField("Email : ", "email", formData.email)}
      {renderField("Số điện thoại : ", "sdt", formData.sdt)}
      {renderField("Địa chỉ : ", "diaChi", formData.diaChi)}
      {renderField("Đổi mật khẩu : ", "matKhau", "********", true)}

      <button
        onClick={handleUpdate}
        className="w-full py-2 bg-gradient-to-t from-Purple-dark via-Purple-C to-Purple-L text-white rounded-md hover:opacity-90"
      >
        Cập nhật thông tin
      </button>
    </div>
  );
}


function HienThiTHongTinKhachHang() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Header />
      <ThongTinCaNhan />
      <Footer />
    </div>
  );
}

export default HienThiTHongTinKhachHang;
