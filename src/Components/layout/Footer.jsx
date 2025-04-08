import React from "react";

const Footer = () => {
  return (
    <footer className="bg-Purple-dark text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo và thông tin liên hệ */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="./img/LogoHinh.png"
            alt="Flone Logo"
            className="w-13 h-12 mb-4"
          />
          <p className="text-center md:text-left">
            Công Ty TNHH Flone.
          </p>
          <p className="text-center md:text-left">
            180 Cao Lỗ, Phường 4, Quận 8, Thành Phố Hồ Chí Minh.
          </p>
          <p className="text-center md:text-left">Email: Flone@gmail.com</p>
          {/* Hỗ trợ và liên hệ */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <div>
              <p>Việt Nam</p>
            </div>
            <div>
              <p>Hỗ Trợ</p>
            </div>
            <div>
              <p>Liên Hệ</p>
            </div>
            <div>
              <p> Khiếu Nại</p>
            </div>
          </div>
        </div>

        {/* Thông tin công ty */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Công Ty</h3>
          <ul className="space-y-2">
            <li>Giới Thiệu</li>
            <li>Tuyển Dụng</li>
            <li>Khuyến Mãi</li>
            <li>Điều Khoản Sử Dụng</li>
            <li>Chính Sách Bảo Mật</li>
          </ul>
        </div>

        {/* Hợp tác và Follow us */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">
            Hợp Tác Với Chúng Tôi
          </h3>
          <ul className="space-y-2">
            <li>Quảng Cáo</li>
            <li>Trung Tâm Đối Tác</li>
          </ul>
          {/* Follow us */}
          <div className="mt-4">
            <p className="font-semibold">FOLLOW US:</p>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a href="#" aria-label="Facebook">
                <img
                  src="./img/fb_icon.png"
                  alt="Facebook"
                  className="w-7 h-7"
                />
              </a>
              <a href="#" aria-label="Instagram">
                <img
                  src="./img/instagram.png"
                  alt="Instagram"
                  className="w-7 h-7"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
