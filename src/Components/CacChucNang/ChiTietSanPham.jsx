import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

function ProductDetail() {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/chitietsanpham/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.img1 || "default.jpg");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy dữ liệu:", err);
        setLoading(false);
      });
  }, [id]);
  

  if (loading) {
    return <div className="text-center text-lg py-6">Đang tải sản phẩm...</div>;
  }

  if (!product) {
    return <div className="text-center text-red-500 text-lg py-6">Không tìm thấy sản phẩm.</div>;
  }

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newItem = {
      ma_san_pham: product.ma_san_pham,
      ten_sp: product.ten_sp,
      gia: product.gia,
      quantity,
    };
    const existingProduct = cart.find((item) => item.ma_san_pham === product.ma_san_pham);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push(newItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.ten_sp || "Sản phẩm"} đã được thêm vào giỏ hàng!`);
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500 flex items-center">
        Quay lại
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hình ảnh sản phẩm */}
        <div className="flex flex-col items-center">
          <img
            src={`/ImgDT/${selectedImage}`}
            alt={product.ten_sp}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />

          {/* Hình ảnh nhỏ để chọn */}
          <div className="flex justify-center mt-4 space-x-4">
            {product.img1 && (
              <img
                src={`/ImgDT/${product.img1}`}
                alt="Ảnh khác"
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${selectedImage === product.img1 ? "border-blue" : ""}`}
                onClick={() => setSelectedImage(product.img1)}
              />
            )}
            {product.img2 && (
              <img
                src={`/ImgDT/${product.img2}`}
                alt="Ảnh khác"
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${selectedImage === product.img2 ? "border-blue" : ""}`}
                onClick={() => setSelectedImage(product.img2)}
              />
            )}
            {product.img3 && (
              <img
                src={`/ImgDT/${product.img3}`}
                alt="Ảnh khác"
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${selectedImage === product.img3 ? "border-blue-500" : ""}`}
                onClick={() => setSelectedImage(product.img3)}
              />
            )}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-black">{product.ten_sp}</h1>
          <p className="text-2xl text-red-600 font-semibold">
            Giá: {new Intl.NumberFormat("vi-VN").format(product.gia)} VND
          </p>
          <p className="line-through text-gray-500 text-lg">
            Giá cũ: {new Intl.NumberFormat("vi-VN").format(product.giacu)} VND
          </p>

          {/* Thông số kỹ thuật */}
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 text-gray-700">
            <div><span className="font-semibold">Màn hình: </span>{product.ktcn}</div>
            <div><span className="font-semibold">Camera: </span>{product.camera}</div>
            <div><span className="font-semibold">Chip: </span>{product.chip}</div>
            <div><span className="font-semibold">RAM/ROM: </span>{product.ram}</div>
            <div><span className="font-semibold">Pin: </span>{product.pin}</div>
            <div><span className="font-semibold">Tần số quét: </span>{product.tansoquet}</div>
            <div><span className="font-semibold">Loại CPU: </span>{product.loaicpu}</div>
          </div>

          {/* Chọn số lượng */}
          <div className="mt-4 flex items-center space-x-3">
            <label htmlFor="quantity" className="font-semibold">Số lượng:</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="border p-2 rounded w-16 text-center"
            />
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <button
            onClick={addToCart}
            className="mt-6 w-full px-6 py-3 bg-gradient-to-t from-Purple-dark from-5% via-Purple-C via-30% to-Purple-L text-white text-lg font-semibold rounded-lg  hover:bg-Purple-dark transition duration-200"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}

// 🏠 Trang chi tiết sản phẩm
function ChitietSanPham() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <ProductDetail />
      <Footer />
    </div>
  );
}

export default ChitietSanPham;