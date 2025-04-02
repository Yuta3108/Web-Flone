import React from "react";

const newsData = [
  {
    title: "5 smartphone bán tại Việt Nam tháng 12",
    description: "125 smartphone bán tại Việt Nam tháng 12",
    image: "src/img/news1.jpg", // Đường dẫn ảnh

  },
  {
    title: "Nhiều người dùng Samsung tại Việt Nam bị khóa máy từ xa",
    description: "",
    image: "src/img/news2.jpg", // Đường dẫn ảnh
  },
  {
    title: "Apple bắt đầu phát triển iPhone gập",
    description: "Apple bắt đầu phát triển iPhone gập",
    image: "src/img/news3.jpg", // Đường dẫn ảnh
  },
  {
    title: "Huawei Mate X6 phô diễn độ bền và khả năng làm mát",
    description: "",
    image: "src/img/news4.jpg", // Đường dẫn ảnh
  },
];

function Newsdata() {
  return (
    <div className="max-w-7xl mx-auto mt-8 mb-8 w-8/12">
      {/* Tiêu đề lớn */}
      <h2 className="text-2xl font-bold mb-4">Bản tin</h2>
      <h3 className="text-xl font-medium mb-8">24h công nghệ</h3>
      {/* Danh sách bài tin */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
          >
            {/* Hình ảnh */}
            <img
              src={news.image}
              alt={news.title}
              
              className="w-full h-40 object-cover"
            />
            {/* Nội dung */}
            <button className="p-4" href="/">
              <h4 className="text-lg font-semibold mb-2">{news.title}</h4>
              {news.description && (
                <p className="text-sm text-black">{news.description}</p>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Newsdata;
