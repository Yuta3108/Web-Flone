import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DonHang() {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const isZaloPay = query.get("zalopay") === "true";
    const appTransId = query.get("apptransid");

    const [zalopayData, setZalopayData] = useState(null);
    const { formData, cartItems, total } = location.state || {};

    useEffect(() => {
        if (isZaloPay && appTransId) {
            fetch(`http://localhost:5000/api/zalopay/detail?apptransid=${appTransId}`)
                .then((res) => res.json())
                .then((data) => setZalopayData(data))
                .catch((err) => console.error("Lỗi khi lấy dữ liệu ZaloPay:", err));
        }
    }, [isZaloPay, appTransId]);

    const info = isZaloPay ? {
        name: zalopayData?.donHang?.ten_khach_hang || "",
        phone: zalopayData?.donHang?.sdt || "",
        email: zalopayData?.donHang?.email || "",
        address: zalopayData?.donHang?.diachi || "",
        paymentMethod: zalopayData?.donHang?.phuongthucthanhtoan || "ZaloPay",
        cartItems: zalopayData?.chiTietDonHang?.map(ct => ({
            ten_sp: `Sản phẩm #${ct.ma_san_pham}`,
            quantity: ct.so_luong,
        })) || [],
        total: zalopayData?.donHang?.tongtien || 0,
    } : {
        name: formData?.name,
        phone: formData?.phone,
        email: formData?.email,
        address: formData?.address,
        paymentMethod: formData?.paymentMethod,
        cartItems,
        total,
    };

    // ✅ Huỷ giỏ hàng rồi về home
    const handleBackToHome = () => {
        localStorage.removeItem("cart");
        navigate("/home");
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <div style={{
                width: "600px",
                padding: "30px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                backgroundColor: "#fff",
            }}>
                <h2 style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
                    Thanh Toán Hoàn Thành
                </h2>
                <p style={{ textAlign: "center", fontSize: "16px", marginBottom: "20px" }}>
                    Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đang được xử lý.!!!
                </p>

                <hr />
                <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>Thông Tin Đơn Hàng</h3>
                <p><strong>Họ tên:</strong> {info.name}</p>
                <p><strong>Số điện thoại:</strong> {info.phone}</p>
                <p><strong>Email:</strong> {info.email}</p>
                <p><strong>Địa chỉ:</strong> {info.address}</p>
                <p><strong>Phương thức thanh toán:</strong> {info.paymentMethod}</p>

                <hr />
                <h4>Sản phẩm:</h4>
                <ul>
                    {info.cartItems?.map((item, index) => (
                        <li key={index}>{item.ten_sp} - SL: {item.quantity}</li>
                    ))}
                </ul>

                <p><strong>Phí vận chuyển:</strong> 0.00 VND</p>
                <p style={{ fontWeight: "bold", fontSize: "18px", marginTop: "15px" }}>
                    Tổng Giá Trị: {info.total?.toLocaleString()} VND
                </p>

                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <button
                        onClick={handleBackToHome}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#a0d2eb",
                            border: "none",
                            borderRadius: "5px",
                            color: "#000",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Quay Lại Trang Chủ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DonHang;
