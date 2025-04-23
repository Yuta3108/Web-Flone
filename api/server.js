import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import axios from 'axios'; // npm install axios
import CryptoJS from 'crypto-js'; // npm install crypto-js
import moment from 'moment'; // npm install moment
import { data, redirect } from 'react-router-dom';

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
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'false'
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
    redirecturl: "https://nhom5chude2.vercel.app/api/zalopay/callback"
  };
  const { tongtien, ma_khach_hang, diachigh, phuongthucthanhtoan, soluong, products } = req.body;

  const items = [{
    "tongtien": tongtien,
    "ma_khach_hang": ma_khach_hang,
    "diachigh": diachigh,
    "phuongthucthanhtoan": phuongthucthanhtoan,
    "soluong": soluong,
    "products": products
  }];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: tongtien,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url: "https://nhom5chude2.vercel.app/api/zalopay/callback"
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    // console.log(result);
    return res.status(200).json(result.data);
  } catch (error) {
    res.status(200).json({
      message: "some thing went wrong",
    });
    console.log(error.message);
  }
})

app.post('/callback', async (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    //console.log("mac =", dataStr);


    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
      console.log("đã hủy");
    }
    else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2);


      const itemData = JSON.parse(dataJson.item)[0];
      console.log(itemData);

      //console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

      const insertQuery = `INSERT INTO donhang 
        (ngaydathang, ma_khach_hang, phuongthucthanhtoan, soluong, tongtien, trangthai, diachigh, app_trans_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      // Chèn dữ liệu vào cơ sở dữ liệu
      try {
        await db.execute(insertQuery, [
          new Date(),                                 // Ngày đặt hàng hiện tại
          itemData["ma_khach_hang"],                   // Mã khách hàng từ item
          itemData["phuongthucthanhtoan"],           // Phương thức thanh toán từ item
          itemData["soluong"],                         // Số lượng từ item
          itemData["tongtien"],                        // Tổng tiền từ item
          'success',                                   // Trạng thái
          itemData["diachigh"],                      // Địa chỉ giao hàng từ item
          dataJson["app_trans_id"]                     // app_trans_id từ callback
        ]);

        // Lấy ID của đơn hàng vừa được chèn
        const [rows] = await db.execute("SELECT LAST_INSERT_ID() as ma_don_hang");
        const maDonHang = rows[0].ma_don_hang;


        // Lặp qua các sản phẩm trong đơn hàng và chèn vào bảng chitietdonhang
        const products = itemData.products;
        for (const product of products) {
          const insertChiTietQuery = `
            INSERT INTO chitietdonhang (ma_don_hang, ma_san_pham, so_luong, tong_gia)
            VALUES (?, ?, ?, ?)
          `;
          await db.execute(insertChiTietQuery, [
            maDonHang,
            product.ma_san_pham,
            product.so_luong,
            product.gia
          ]);
        }

        result.return_code = 1;
        result.return_message = "success";
      } catch (dbError) {
        console.error("Lỗi khi chèn dữ liệu vào database:", dbError);
        result.return_code = 0;
        result.return_message = "Lỗi database: " + dbError.message;
      }

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
})

app.get('/api/zalopay/callback', async (req, res) => {
  const { apptransid, status } = req.query;

  if (status == 1) {
    return res.redirect(`https://nhom5chude2.vercel.app/donhang?zalopay=true&apptransid=${apptransid}`);
  } else {
    return res.redirect('https://nhom5chude2.vercel.app/home');
  }
});

app.get('/api/zalopay/detail', async (req, res) => {
  const { apptransid } = req.query;

  try {
    const [results] = await db.execute(
      `SELECT 
          qlbh.*, 
          cttdh.ma_chi_tiet_don_hang, cttdh.so_luong, cttdh.tong_gia, cttdh.ma_san_pham,
          kh.ten_khach_hang, kh.email, kh.sdt
       FROM donhang qlbh 
       JOIN chitietdonhang cttdh ON qlbh.madonhang = cttdh.ma_don_hang 
       JOIN khachhang kh ON qlbh.ma_khach_hang = kh.ma_khach_hang
       WHERE qlbh.app_trans_id = ?`,
      [apptransid]
    );

    if (results.length > 0) {
      const donHang = {
        madonhang: results[0].madonhang,
        ngaydathang: results[0].ngaydathang,
        phuongthucthanhtoan: results[0].phuongthucthanhtoan,
        tongtien: results[0].tongtien,
        diachi: results[0].diachigh,
        app_trans_id: results[0].app_trans_id,
        ten_khach_hang: results[0].ten_khach_hang,
        email: results[0].email,
        sdt: results[0].sdt,
      };

      const chiTietDonHang = results.map(result => ({
        ma_chi_tiet_don_hang: result.ma_chi_tiet_don_hang,
        so_luong: result.so_luong,
        tong_gia: result.tong_gia,
        ma_san_pham: result.ma_san_pham
      }));

      res.json({ donHang, chiTietDonHang });
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
  } catch (error) {
    console.error("Lỗi khi truy vấn đơn hàng chi tiết:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});
export default app;

// ✅ LISTEN: dùng khi chạy local (Node)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  });
}
