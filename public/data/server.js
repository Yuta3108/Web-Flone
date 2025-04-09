import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";


const app = express();
app.use(cors());
app.use(express.json());
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

// Kiểm tra kết nối
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Kết nối MySQL thành công!");
    connection.release();
  } catch (err) {
    console.error("Lỗi kết nối MySQL:", err);
  }
})();

// API kiểm tra kết nối server
app.get("/message", (req, res) => {
  res.json({ message: "Server đang hoạt động!" });
});

// API lấy danh sách sản phẩm
app.get("/phones", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM sanpham");
    res.json(results);
  } catch (err) {
    console.error("Lỗi lấy dữ liệu:", err);
    res.status(500).json({ error: "Lỗi lấy dữ liệu từ MySQL" });
  }
});

// API tìm kiếm sản phẩm theo điều kiện
app.get("/phones1", async (req, res) => {
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

    console.log(" SQL Query:", query);
    console.log("Query Params:", queryParams);

    const [rows] = await db.query(query, queryParams);
    res.json({ phones1: rows });
  } catch (error) {
    console.error("Lỗi truy vấn sản phẩm:", error);
    res.status(500).json({ error: "Lỗi lấy dữ liệu từ MySQL" });
  }
});
app.get("/chitietsanpham/:ma_san_pham", async (req, res) => {
  // Ép giá trị nhận từ URL sang kiểu số
  const productId = Number(req.params.ma_san_pham);
  console.log("API nhận request với ma_san_pham:", productId);

  if (isNaN(productId)) {
    console.error("Lỗi: Giá trị ma_san_pham không hợp lệ");
    return res.status(400).json({ message: "Giá trị ma_san_pham không hợp lệ!" });
  }

  const sql = "SELECT * FROM chitietsanpham WHERE ma_san_pham = ?";

  try {
    const [result] = await db.query(sql, [productId]);
    if (result.length === 0) {
      console.warn("⚠️ Không tìm thấy sản phẩm với ma_san_pham:", productId);
      return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
    }
    console.log("Dữ liệu sản phẩm tìm thấy:", result);
    return res.json(result[0]);
  } catch (err) {
    console.error("Lỗi truy vấn MySQL:", err);
    return res.status(500).json({ message: "Lỗi server!", error: err });
  }
});
// app.post('/khachhang', async (req, res) => {
//   const { TenKhachHang, DiaChi, Sdt, Email } = req.body;

//   if (!TenKhachHang || !DiaChi || !Sdt || !Email) {
//     return res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
//   }
//   try {
//     const sql = 'INSERT INTO khachhang (ten_khach_hang, dia_chi, sdt, email) VALUES (?, ?, ?, ?)';
//     // Sử dụng async/await để tránh callback hell
//     const [result] = await db.query(sql, [TenKhachHang, DiaChi, Sdt, Email]);
//     res.status(201).json({
//       message: 'Khách hàng đã được thêm thành công',
//       id: result.insertId
//     });

//   } catch (err) {
//     console.error(' Lỗi khi thêm khách hàng:', err);
//     res.status(500).json({ message: 'Lỗi server', error: err.sqlMessage });
//   }
// });
// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server chạy tại http://localhost:${PORT}`);
});
