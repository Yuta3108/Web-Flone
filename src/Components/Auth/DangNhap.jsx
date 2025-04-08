import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Menu from "../layout/Menu";
import { Link } from "react-router-dom";

function DangNhap() {
  return (
    <div className="bg-bg-test bg-fixed bg-cover">
      <Header />
      <Menu />
      <div style={{ margin: "20px" }} />

      {/* Main Login Form */}
      <div className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 min-h-screen flex justify-center items-center rounded-lg py-4 bg-center center mx-auto mt-8 mb-8">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Đăng Nhập</h2>
          <form>
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
            {/* Password Input */}
            <div className="mb-6">
              <input
                type="password"
                placeholder="Mật Khẩu"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Link
                to="/"
                className=" items-centermt-auto px-4 py-2 bg-gradient-to-t from-Purple-dark from-5% via-Purple-C via-30%  to-Purple-L text-white rounded-md hover:bg-Purple-dark w-full"
              >
                Đăng Nhập
              </Link>
            </div>
          </form>
          <div className="space-y-4 mt-8">
            <a
              href="#"
              className="flex items-center gap-3 justify-center shadow-md p-3 rounded-md bg-white text-black"
            >
              <img
                src="./img/gg_icon.png"
                height={24}
                width={24}
                alt="Google Logo"
              />
              <span>Sign in with Google</span>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 justify-center shadow-md p-3 rounded-md bg-white text-black"
            >
              <img
                src="./img/twitter_icon.png"
                height={24}
                width={24}
                alt="Twitter Logo"
              />
              <span>Sign in with Twitter</span>
            </a>
          </div>
          {/* Register Link */}
          <div className="text-center mt-4">
            <p className="text-black">
              Chưa Có Tài Khoản?{" "}
              <Link to="/dangky" className="text-Purple-dark hover:underline">
                Đăng Ký
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DangNhap;
