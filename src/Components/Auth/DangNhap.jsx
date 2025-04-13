import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { SPRING } from "../../api";
function DangNhap() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${SPRING}/api/khachhang/dangnhap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, matKhau: password })
      });

      if (!response.ok) {
        setError("Sai tài khoản hoặc mật khẩu");
        return;
      }

      const data = await response.json();

      if (data && data.email) {
        localStorage.setItem("user", JSON.stringify(data));       // ✅ Lưu user
        localStorage.setItem("email", data.email);                // ✅ Lưu riêng email
        navigate("/home");
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Lỗi:", err);
      setError("Lỗi kết nối đến server.");
    }
  };


  return (
    <div className="bg-bg-test bg-fixed bg-cover">
      <Header />
      <Menu />

      <div className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 min-h-screen flex justify-center items-center mx-auto mt-8 mb-8">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Đăng Nhập</h2>
          {error && <p className="text-red-600 mb-3 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mật Khẩu"
              className="w-full px-4 py-2 border rounded-md mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-t from-Purple-dark via-Purple-C to-Purple-L text-white rounded-md hover:opacity-90"
            >
              Đăng Nhập
            </button>
          </form>

          <div className="space-y-4 mt-8">
            <a href="#" className="flex items-center gap-3 justify-center shadow-md p-3 rounded-md bg-white text-black">
              <img src="./img/gg_icon.png" height={24} width={24} alt="Google Logo" />
              <span>Sign in with Google</span>
            </a>
            <a href="#" className="flex items-center gap-3 justify-center shadow-md p-3 rounded-md bg-white text-black">
              <img src="./img/twitter_icon.png" height={24} width={24} alt="Twitter Logo" />
              <span>Sign in with Twitter</span>
            </a>
          </div>

          <div className="text-center mt-4">
            <p className="text-black">
              Chưa Có Tài Khoản?{" "}
              <Link to="/dangky" className="text-Purple-dark hover:underline">Đăng Ký</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DangNhap;
