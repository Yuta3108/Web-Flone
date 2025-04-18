import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NODE } from "../../api";
function SearchResultModal({ results = [], onClose }) {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = (phone) => {
        const existingProduct = cart.find((item) => item.ma_san_pham === phone.ma_san_pham);

        let updatedCart;
        if (existingProduct) {
            updatedCart = cart.map((item) =>
                item.ma_san_pham === phone.ma_san_pham
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...phone, quantity: 1 }];
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        alert(`${phone.ten_sp || "Sản phẩm"} đã được thêm vào giỏ hàng!`);
    };

    useEffect(() => {
        if (cart) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);
    const navigate = useNavigate();
    
    const handleClickProduct = (productId) => {
        navigate(`/product/${productId}`);
        if (onClose) onClose();
      };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full h-full">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                <h3 className="text-lg font-semibold mb-4 text-center">Kết quả tìm kiếm</h3>
                <button
                    onClick={() => onClose && onClose()}
                    className="absolute top-4 right-4 z-50 bg-gray text-black hover:bg-gray rounded-full p-2"
                >
                    X
                </button>
                {results && Array.isArray(results) && results.length === 0 ? (
                    <div className="text-center text-black">Không tìm thấy sản phẩm nào.</div>
                ) : (
                    results && Array.isArray(results) && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {results.map((product, index) => (
                                <div 
                                    key={index}
                                    className="border rounded-lg p-4 flex flex-col items-center transition-transform duration-200 hover:scale-105"
                                    onClick={() => handleClickProduct(product.ma_san_pham)}
                                >
                                    <img
                                        src={`${NODE}/${product.img}`}
                                        alt={product.ten_sp || "Sản phẩm"}
                                        className="w-24 h-24 object-cover mb-2"
                                    />
                                    <div className="text-sm font-medium text-center">
                                        {product.ten_sp || "Tên sản phẩm"}
                                    </div>
                                    <div className="text-red-500 font-semibold mt-2 text-center">
                                        Giá: {product.gia ? `${new Intl.NumberFormat('vi-VN').format(product.gia)} VND` : "Liên hệ"}
                                    </div>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className=" mt-auto px-4 py-2 bg-gradient-to-t from-Purple-dark from-5% via-Purple-C via-30%  to-Purple-L text-white rounded-md hover:bg-Purple-dark w-full"
                                    >
                                        Thêm vào giỏ
                                    </button>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default SearchResultModal;
