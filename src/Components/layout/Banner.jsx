import React, { useState, useEffect } from "react";

// Dữ liệu ảnh
const imageList = [
  { src: "./img/BannerTest.png", alt: "Banner Test" },
  { src: "./img/banner.jpg", alt: "Banner Example" },
  { src: "./img/banner1.jpg", alt: "Banner Sample" },
  { src: "./img/banner2.jpg", alt: "Banner Sample" }, 
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false); // Hiệu ứng chuyển ảnh

  // Hàm chuyển sang ảnh tiếp theo
  const nextImage = () => {
    setIsFading(true); // Bật hiệu ứng fade
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
      setIsFading(false); // Tắt hiệu ứng sau khi đổi ảnh
    }, 500);
  };

  // Hàm quay lại ảnh trước
  const prevImage = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
      );
      setIsFading(false);
    }, 500);
  };

  // Auto chuyển ảnh mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // 5 Giay

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="max-w-7xl w-8/12 h-[600px] md:flex flex-col justify-center items-center rounded-lg py-4 bg-center mx-auto mt-8 mb-8 relative hidden ">
      {/* Hiển thị ảnh hiện tại với hiệu ứng fade */}
      <img 
        src={imageList[currentIndex].src}
        alt={imageList[currentIndex].alt}
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ease-in-out 
          ${isFading ? "opacity-0 blur-sm" : "opacity-100 blur-0"}`}
      />

      {/* Nút điều hướng */}
      <div className="absolute top-1/2 w-full flex justify-between px-4 transform -translate-y-1/2">
        {/* Nút Quay lại */}
        <button
          onClick={prevImage}
          className=" text-black rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray transition text-3xl"
        >
          {"<"}
        </button>
        {/* Nút Tiếp theo */}
        <button
          onClick={nextImage}
          className=" text-black rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray transition text-3xl"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Banner;
