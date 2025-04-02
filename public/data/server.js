import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";


const app = express();
app.use(cors());
app.use(express.json());
// Tạo pool kết nối MySQL
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "qlbanhangdt",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
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
    const [results] = await db.query("SELECT * FROM SanPham");
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
        query += " AND TenSp LIKE ?";
        queryParams.push(`%${search}%`);
    }

      if (category) {
          query += " AND MaLoaiSanPham = ?";
          queryParams.push(category);
      }

      if (minPrice) {
          query += " AND Gia >= ?";
          queryParams.push(Number(minPrice));
      }

      if (maxPrice) {
          query += " AND Gia <= ?";
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
app.get("/chitietsanpham/:MaSanPham", async (req, res) => {
  // Ép giá trị nhận từ URL sang kiểu số
  const productId = Number(req.params.MaSanPham);
  console.log("API nhận request với MaSanPham:", productId);

  if (isNaN(productId)) {
    console.error("Lỗi: Giá trị MaSanPham không hợp lệ");
    return res.status(400).json({ message: "Giá trị MaSanPham không hợp lệ!" });
  }

  const sql = "SELECT * FROM chitietsanpham WHERE MaSanPham = ?";
  
  try {
    const [result] = await db.query(sql, [productId]);
    if (result.length === 0) {
      console.warn("⚠️ Không tìm thấy sản phẩm với MaSanPham:", productId);
      return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
    }
    console.log("Dữ liệu sản phẩm tìm thấy:", result);
    return res.json(result[0]);
  } catch (err) {
    console.error("Lỗi truy vấn MySQL:", err);
    return res.status(500).json({ message: "Lỗi server!", error: err });
  }
});
app.post('/khachhang', async (req, res) => {
  const { TenKhachHang, DiaChi, Sdt, Email } = req.body;

  if (!TenKhachHang || !DiaChi || !Sdt || !Email) {
    return res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
  }
  try {
    const sql = 'INSERT INTO khachhang (TenKhachHang, DiaChi, Sdt, Email) VALUES (?, ?, ?, ?)';
    // Sử dụng async/await để tránh callback hell
    const [result] = await db.query(sql, [TenKhachHang, DiaChi, Sdt, Email]);
    res.status(201).json({ 
      message: 'Khách hàng đã được thêm thành công', 
      id: result.insertId 
    });

  } catch (err) {
    console.error(' Lỗi khi thêm khách hàng:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.sqlMessage });
  }
});
// Khởi động server
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(` Server chạy tại http://localhost:${PORT}`);
});
