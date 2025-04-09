import dotenv from 'dotenv';

// Chỉ load dotenv nếu đang chạy local
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '../.env' }); // hoặc '.env' nếu ở root
}

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

    const [rows] = await db.query(query, queryParams);
    res.json({ phones1: rows });
  } catch (error) {
    console.error("Lỗi truy vấn sản phẩm:", error);
    res.status(500).json({ error: "Lỗi lấy dữ liệu từ MySQL" });
  }
});

// API chi tiết sản phẩm
app.get("/chitietsanpham/:ma_san_pham", async (req, res) => {
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


// ✅ EXPORT: dùng cho Vercel
export default app;

// ✅ LISTEN: dùng khi chạy local (Node)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  });
}
