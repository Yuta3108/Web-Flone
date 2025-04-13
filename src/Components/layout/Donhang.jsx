import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DonHang() {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, cartItems, total } = location.state || {};

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <div
                style={{
                    width: "600px",
                    padding: "30px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                }}
            >
                <h2 style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
                    Thanh Toán Hoàn Thành
                </h2>
                <p style={{ textAlign: "center", fontSize: "16px", marginBottom: "20px" }}>
                    Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đang được xử lý.!!!
                </p>

                <hr />

                <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>Thông Tin Đơn Hàng</h3>
                <p><strong>Họ tên:</strong> {formData?.name}</p>
                <p><strong>Số điện thoại:</strong> {formData?.phone}</p>
                <p><strong>Email:</strong> {formData?.email}</p>
                <p><strong>Địa chỉ:</strong> {formData?.address}</p>
                <p><strong>Phương thức thanh toán:</strong> {formData?.paymentMethod}</p>

                <hr />

                <h4>Sản phẩm:</h4>
                <ul>
                    {cartItems?.map((item, index) => (
                        <li key={index}>
                            {item.ten_sp} - SL: {item.quantity}
                        </li>
                    ))}
                </ul>

                <p><strong>Phí vận chuyển:</strong> 0.00 VND</p>
                <p style={{ fontWeight: "bold", fontSize: "18px", marginTop: "15px" }}>
                    Tổng Giá Trị: {total?.toLocaleString()} VND
                </p>

                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <button
                        onClick={() => navigate("/home")}
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
