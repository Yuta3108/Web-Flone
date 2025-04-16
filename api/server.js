import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import axios from 'axios'; // npm install axios
import CryptoJS from 'crypto-js'; // npm install crypto-js
import moment from 'moment'; // npm install moment
import { redirect } from 'react-router-dom';

// Load environment variables if not in production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APP INFO
const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

// Tạo pool kết nối MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
  }
});

// Kiểm tra kết nối MySQL
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Kết nối MySQL thành công!");
    connection.release();
  } catch (err) {
    console.error("❌ Lỗi kết nối MySQL:", err);
  }
})();

// Route test

app.get("/api/message", (req, res) => {

  res.json({ message: "Server đang hoạt động!" });
});

// API lấy danh sách sản phẩm
app.get("/api/phones", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM sanpham");
    res.json(results);
  } catch (err) {
    console.error("Lỗi lấy dữ liệu:", err);
    res.status(500).json({ error: "Lỗi lấy dữ liệu từ MySQL" });
  }
});

// API tìm kiếm sản phẩm theo điều kiện
app.get("/api/phones1", async (req, res) => {
  const { search, category, minPrice, maxPrice } = req.query;

  try {
    let query = "SELECT * FROM sanpham WHERE 1=1";
    const queryParams = [];

    if (search) {
      query += " AND ten_sp LIKE ?";
      queryParams.push(`%${search}%`);
    }
    if (category) {
      query += " AND ma_loai_san_pham = ?";
      queryParams.push(category);
    }
    if (minPrice) {
      query += " AND gia >= ?";
      queryParams.push(Number(minPrice));
    }
    if (maxPrice) {
      query += " AND gia <= ?";
      queryParams.push(Number(maxPrice));
    }

    const [rows] = await db.query(query, queryParams);
    res.json({ phones1: rows });
  } catch (error) {
    console.error("Lỗi truy vấn sản phẩm:", error);
    res.status(500).json({ error: "Lỗi lấy dữ liệu từ MySQL" });
  }
});

// API chi tiết sản phẩm

app.get("/api/chitietsanpham/:ma_san_pham", async (req, res) => {

  const productId = Number(req.params.ma_san_pham);
  if (isNaN(productId)) {
    return res.status(400).json({ message: "Giá trị ma_san_pham không hợp lệ!" });
  }

  const sql = `
    SELECT * FROM chitietsanpham 
    JOIN sanpham ON chitietsanpham.ma_san_pham = sanpham.ma_san_pham 
    WHERE chitietsanpham.ma_san_pham = ?
  `;

  try {
    const [result] = await db.query(sql, [productId]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
    }
    return res.json(result[0]);
  } catch (err) {
    console.error("Lỗi truy vấn MySQL:", err);
    return res.status(500).json({ message: "Lỗi server!", error: err });
  }
});

// API hiển thị thông tin khách hàng (nếu có) trên trang thanh toán
app.get("/api/khachhang/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT ma_khach_hang, ten_khach_hang, email, dia_chi, sdt FROM khachhang WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Lỗi lấy khách hàng:", err);
    res.status(500).json({ message: "Lỗi server!" });
  }
});
//api luu don hang tam va chi tiet don hang tam 
app.post('/api/donhangtam', async (req, res) => {
  const { total, diachightam, tenkhtam, emailtam, sdttam, phuongthucthanhtoan, soluong, products } = req.body; // Nhận dữ liệu từ client

  try {
    // Bước 1: Lưu đơn hàng vào bảng donhangtam
    const insertOrderQuery = 'INSERT INTO donhangtam (total, ngaydathang, trangthai, diachightam, tenkhtam, emailtam, sdttam, phuongthucthanhtoan, soluong) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?)';
    const trangthai = "choxuly"; // Trạng thái mặc định
    const orderResult = await db.query(insertOrderQuery, [total, trangthai, diachightam, tenkhtam, emailtam, sdttam, phuongthucthanhtoan, soluong]);
    console.log("day la kq id: " + orderResult[0].insertId)
    const dht_id = orderResult[0].insertId; // Lấy dht_id (id của đơn hàng vừa tạo)

    console.log("day la dht id: " + dht_id)
    // Bước 2: Duyệt qua từng sản phẩm và thêm vào bảng chitietdonhangtam
    const queries = products.map(async product => {
      const { ma_san_pham, so_luong, gia } = product;
      const tonggia = so_luong * gia; // Tính tổng giá cho sản phẩm

      const query = 'INSERT INTO chitietdonhangtam (ma_don_hang, ma_san_pham, so_luong, tong_gia) VALUES (?, ?, ?, ?)';
      return await db.query(query, [dht_id, ma_san_pham, so_luong, tonggia]); // Thêm chi tiết sản phẩm
    });

    // Chờ tất cả các query hoàn thành
    await Promise.all(queries);

    res.status(201).json({ message: 'Đơn hàng và chi tiết sản phẩm đã được lưu.', orderId: dht_id }); // Trả về order ID
  } catch (error) {
    console.error('Lỗi khi xử lý yêu cầu:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lưu đơn hàng hoặc chi tiết sản phẩm.' });
  }
});
//api don hang
app.post('/api/donhang', async (req, res) => {
  const { tongtien, ma_khach_hang, diachigh, phuongthucthanhtoan, soluong, products } = req.body; // Nhận dữ liệu từ client

  try {
    // Bước 1: Lưu đơn hàng vào bảng donhangtam
    const insertOrderQuery = 'INSERT INTO donhang (tongtien, ngaydathang , ma_khach_hang, trangthai, diachigh, phuongthucthanhtoan, soluong) VALUES (?, NOW(), ?, ?, ?, ?, ?)';
    const trangthai = "choxuly"; // Trạng thái mặc định
    const orderResult = await db.query(insertOrderQuery, [tongtien, ma_khach_hang, trangthai, diachigh, phuongthucthanhtoan, soluong]);
    console.log("day la kq id: " + orderResult[0].insertId)
    const madh = orderResult[0].insertId; // Lấy dht_id (id của đơn hàng vừa tạo)

    console.log("day la dht id: " + madh)
    // Bước 2: Duyệt qua từng sản phẩm và thêm vào bảng chitietdonhangtam
    const queries = products.map(async product => {
      const { ma_san_pham, so_luong, gia } = product;
      const tonggia = so_luong * gia; // Tính tổng giá cho sản phẩm

      const query = 'INSERT INTO chitietdonhang (ma_don_hang, ma_san_pham, so_luong, tong_gia) VALUES (?, ?, ?, ?)';
      return await db.query(query, [madh, ma_san_pham, so_luong, tonggia]); // Thêm chi tiết sản phẩm
    });

    // Chờ tất cả các query hoàn thành
    await Promise.all(queries);

    res.status(201).json({ message: 'Đơn hàng và chi tiết sản phẩm đã được lưu.', orderId: madh }); // Trả về order ID
  } catch (error) {
    console.error('Lỗi khi xử lý yêu cầu:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lưu đơn hàng hoặc chi tiết sản phẩm.' });
  }
});


app.post('/payment', async (req, res) => {
  const embed_data = {
    redirecturl: "http://localhost:5173/home"
  };


  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: 10000,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error.message);
  }
})

export default app;

// ✅ LISTEN: dùng khi chạy local (Node)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  });
}
