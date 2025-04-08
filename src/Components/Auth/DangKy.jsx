import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Menu from "../layout/Menu";
import { Link } from "react-router-dom";
function DangKy() {
  return (
    <div className="bg-bg-test bg-fixed bg-cover ">
      <Header />
      <Menu />
      <div style={{ margin: "20px" }} />
      <div className="w-8/12 min-h-screen flex justify-around items-center rounded-lg py-4 bg-center center mx-auto mt-8 mb-8 ">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-8/12 ">
          <h2 className="text-2xl font-semibold text-center mb-6">Đăng Ký</h2>
          <form>
            {/* Họ Input */}
            <div className="mb-4">
              <input
                type="Họ"
                placeholder="Họ"
                className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
            {/* Tên Input */}
            <div className="mb-4">
              <input
                type="Tên"
                placeholder="Tên"
                className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="Email"
                placeholder="Email"
                className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
            {/* Sdt Input */}
            <div className="mb-4">
              <input
                type="Sdt"
                placeholder="Sdt"
                className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-purple "
              />
            </div>
            {/* Password Input */}
            <div className="mb-6">
              <input
                type="password"
                placeholder="Mật Khẩu"
                className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Link
                to="/dangnhap"
                className=" items-centermt-auto px-4 py-2 bg-gradient-to-t from-Purple-dark from-5% via-Purple-C via-30%  to-Purple-L text-white rounded-md hover:bg-Purple-dark w-full"
              >
                Đăng Ký
              </Link>
            </div>
          </form>
          <div className="space-y-4 mt-8">
            <a
              href="#"
              className="flex items-center gap-3 justify-center shadow-md p-3 rounded-md bg-white text-black"
            >
              <img
                src="public/img/gg_icon.png"
                height={24}
                width={24}
                alt="Google Logo"
              />
              <span>Sign Up with Google</span>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 justify-center shadow-md p-3 rounded-md bg-white text-black"
            >
              <img
                src="public/img/twitter_icon.png"
                height={24}
                width={24}
                alt="Twitter Logo"
              />
              <span>Sign Up with Twitter</span>
            </a>
          </div>

          <div className="text-center mt-4">
            <p className="text-black">
              Bạn Đã Có Tài Khoản?{" "}
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
