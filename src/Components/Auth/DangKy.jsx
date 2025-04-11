import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Menu from "../layout/Menu";
import { SPRING } from "../../api";
function DangKy() {
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const tenKhachHang = `${ho} ${ten}`.trim();
    const data = { tenKhachHang, email, matKhau, sdt, diaChi };

    try {
      const response = await fetch(
        `${SPRING}/api/khachhang/dangky`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Đăng ký thành công!");
        navigate("/dangnhap");
      } else {
        const err = await response.json();
        setError(err.message || "Đăng ký thất bại.");
      }
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      setError("Lỗi kết nối đến máy chủ.");
    }
  };

  return (
    <div className="bg-bg-test bg-fixed bg-cover">
      <Header />
      <Menu />

      <div className="w-8/12 min-h-screen flex justify-around items-center rounded-lg py-4 mx-auto mt-8 mb-8">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-8/12">
          <h2 className="text-2xl font-semibold text-center mb-6">Đăng Ký</h2>
          {error && (
            <p className="text-red-600 mb-4 text-center text-sm">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Họ"
              className="w-full px-4 py-2 border rounded-md mb-4"
              value={ho}
              onChange={(e) => setHo(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Tên"
              className="w-full px-4 py-2 border rounded-md mb-4"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              className="w-full px-4 py-2 border rounded-md mb-4"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              required
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                className="w-full px-4 py-2 border rounded-md"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <img
                  src={showPassword ? "/img/hide.png" : "/img/view.png"}
                  alt={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="w-5 h-5"
                />
              </button>
            </div>

            <input
              type="text"
              placeholder="Địa chỉ"
              className="w-full px-4 py-2 border rounded-md mb-6"
              value={diaChi}
              onChange={(e) => setDiaChi(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-t from-Purple-dark via-Purple-C to-Purple-L text-white rounded-md hover:opacity-90"
            >
              Đăng Ký
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-black">
              Bạn đã có tài khoản?{" "}
              <Link to="/dangnhap" className="text-Purple-dark hover:underline">
                Đăng Nhập
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DangKy;
