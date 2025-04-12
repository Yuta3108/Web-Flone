import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Menu from "../layout/Menu";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { NODE } from "../../api";
import { useLocation } from "react-router-dom";

function ThanhToan() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState({});
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const totalFromState = location.state?.totalPrice || 0;


  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user && user.email) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       email: user.email, // Cập nhật email từ local storage vào formData
  //     }));
  //   } else {
  //     console.error("Không tìm thấy thông tin người dùng trong local storage.");
  //   }
  //   console.log(" tìm thấy thông tin người dùng trong local storage.", user);

  //   const fetchCustomerData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5173/api/khachhang/${formData.email}`);
  //       if (response.ok) {
  //         const customerData = await response.json();
  //         console.log("Kết nối thành công:", customerData);

  //         // Cập nhật formData với dữ liệu từ API
  //         setFormData((prevData) => ({
  //           ...prevData,
  //           name: customerData.ten_khach_hang || "",
  //           address: customerData.dia_chi || "",
  //           phone: customerData.sdt || "",
  //         }));
  //       } else {
  //         console.error("Lỗi khi lấy thông tin khách hàng");
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi gửi yêu cầu:", error);
  //     }
  //   };
  //   if (formData.email) {
  //     fetchCustomerData();
  //   }


  // }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email && !formData.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
      }));
    }
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!formData.email) return;
      try {
        const response = await fetch(`http://localhost:5173/api/khachhang/${formData.email}`);
        if (response.ok) {
          const customerData = await response.json();
          setFormData((prevData) => ({
            ...prevData,
            name: customerData.ten_khach_hang || "",
            address: customerData.dia_chi || "",
            phone: customerData.sdt || "",
          }));
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    };

    fetchCustomerData();
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

  }, [formData.email]);


  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.Gia || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Họ và Tên không được để trống.";
    if (!formData.email.trim()) newErrors.email = "Email không được để trống.";
    if (!formData.address.trim()) newErrors.address = "Địa Chỉ không được để trống.";
    if (!formData.phone.trim()) newErrors.phone = "Số Điện Thoại không được để trống.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const orderData = {
      TenKhachHang: formData.name,
      Email: formData.email,
      DiaChi: formData.address,
      Sdt: formData.phone,
      cart: cartItems,
      total: calculateTotalPrice(),
    };

    try {
      console.log("Đang gửi đơn hàng...");
      const response = await fetch(`${NODE}/api/khachhang`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      console.log("Dữ liệu phản hồi:", data);

      if (response.ok) {
        console.log("Đặt hàng thành công:", data);
        setPopupVisible(true);
        localStorage.removeItem("cart");
        setCartItems([]);
      } else {
        console.error("Lỗi đặt hàng:", data);
        alert("Đặt hàng thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau!");
    }
  };

  return (
    <div>
      <Header />
      <Menu />
      <div style={{ margin: "20px" }} />
      <div className="container mx-auto p-4 ">
        <h2 className="text-2xl font-bold mb-4">Thông Tin Thanh Toán</h2>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg mt-4">
          <div className="mb-4">
            <label className="block font-semibold mb-2">Họ và Tên</label>
            <input
              type="text"
              name="name"
              value={formData.name} // Liên kết với dữ liệu người dùng
              className="border w-full px-4 py-2 rounded-md"
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email} // Liên kết với dữ liệu người dùng
              className="border w-full px-4 py-2 rounded-md"
              readOnly
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Địa Chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address} // Liên kết với dữ liệu người dùng
              className="border w-full px-4 py-2 rounded-md"
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-600">{errors.address}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Số Điện Thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone} // Liên kết với dữ liệu người dùng
              className="border w-full px-4 py-2 rounded-md"
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h3 className="text-xl font-bold mb-2">Giỏ hàng của bạn</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray">Giỏ hàng trống</p>
            ) : (
              <>
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index} className="border-b py-2 flex justify-between text-black">
                      <span>{item.ten_sp}</span>
                      <span>Số Lượng : {item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-xl font-semibold text-red-600 flex justify-between">
                  <span>Tổng tiền:</span>
                  {/* <span>{calculateTotalPrice().toLocaleString()} VND</span> */}
                  <span>{totalFromState.toLocaleString()} VND</span>
                </div>
              </>
            )}
          </div>
          <button
            type="submit"
            className="mt-auto px-4 py-2 bg-gradient-to-t from-Purple-dark from-5% via-Purple-C via-30% to-Purple-L text-white rounded-md hover:bg-Purple-dark w-full"
          >
            Thanh Toán
          </button>
        </form>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-black mb-4">Đặt Hàng Thành Công!</h1>
            <p className="text-black mb-6">Cảm ơn bạn đã mua hàng.</p>
            <Link
              to="/home"
              className="inline-block bg-gradient-to-t from-Purple-dark from-5% via-Purple-C via-30% to-Purple-L text-white hover:bg-Purple-dark py-2 px-4 rounded-lg ml-2"
            >
              Quay lại Trang Chủ
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ThanhToan;
