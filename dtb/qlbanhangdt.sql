-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th3 25, 2025 lúc 07:43 AM
-- Phiên bản máy phục vụ: 8.3.0
-- Phiên bản PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qlbanhangdt`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietgiohang`
--

DROP TABLE IF EXISTS `chitietgiohang`;
CREATE TABLE IF NOT EXISTS `chitietgiohang` (
  `machitietgiohang` int NOT NULL AUTO_INCREMENT,
  `magiohang` int NOT NULL,
  `MaSanPham` int NOT NULL,
  `Tensp` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `soluong` int NOT NULL,
  `Gia` int NOT NULL,
  PRIMARY KEY (`machitietgiohang`),
  KEY `magiohang` (`magiohang`,`MaSanPham`),
  KEY `FK_msanpham` (`MaSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietgiohang`
--

INSERT INTO `chitietgiohang` (`machitietgiohang`, `magiohang`, `MaSanPham`, `Tensp`, `soluong`, `Gia`) VALUES
(41, 22, 7, 'Realme C65 8GB/128GB', 1, 4500000),
(44, 22, 6, 'HONOR X5 Plus 4GB/64/GB', 1, 6500000),
(53, 21, 7, 'Realme C65 8GB/128GB', 1, 4500000),
(54, 21, 3, 'OPPO Find X8 5G 16G/512GB', 1, 2300000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietsanpham`
--

DROP TABLE IF EXISTS `chitietsanpham`;
CREATE TABLE IF NOT EXISTS `chitietsanpham` (
  `Mamt` int NOT NULL AUTO_INCREMENT,
  `Tensp` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ktcn` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `camera` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Chip` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Ram` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Pin` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Tansoquet` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Loaicpu` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `IMG1` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `IMG2` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `IMG3` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Gia` double(10,0) NOT NULL,
  `Giacu` double(10,0) NOT NULL,
  `MaSanPham` int NOT NULL,
  PRIMARY KEY (`Mamt`),
  KEY `Masp` (`MaSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietsanpham`
--

INSERT INTO `chitietsanpham` (`Mamt`, `Tensp`, `ktcn`, `camera`, `Chip`, `Ram`, `Pin`, `Tansoquet`, `Loaicpu`, `IMG1`, `IMG2`, `IMG3`, `Gia`, `Giacu`, `MaSanPham`) VALUES
(1, 'Samsung Galaxy Z Fold 6', '6.7 inches AMOLED', '50 MP + OIS góc rộng: 8MP xóa phông: 2MP + 32MP', 'MediaTek Dimensity 9400 8 nhân', '12GB/ 256Gb', '5000 mAh', 'Tần số quét 120Hz', '1 nhân 3.6 GHz, 3 nhân 3.3 GHz & 4 nhân 2.4 GHz', 'samsung-galaxy-z-flip6-xanh-thumbn-600x600.jpg', 'samsung-galaxy-z-fold6-xam-thumbn-600x600.jpg', 'samsung-galaxy-z-fold5-kem-thumbnew-600x600.jpg', 36000000, 44000000, 8),
(2, 'Samsung Galaxy S24 Ultra 5G 12GB/256GB', '6.7 inches AMOLED', '50MP + OIS góc rộng: 8MP xóa phông: 2MP + 32MP', 'MediaTek Dimensity 9400 8 nhân', '12GB/256GB', '5000mAh', 'Tần số quét 120Hz', '1 nhân 3.6 GHz, 3 nhân 3.3GHz &  4 nhân 2.4 GHz', 'ssultra2.jpg', 'ssultra2.jpg', 'ssultra3.png', 23000000, 34000000, 1),
(3, 'Iphone 16 Pro Max 256GB', '6.7 inches AMOLED', '50MP + OIS góc rộng : 8MP xóa phông : 2MP + 32MP', 'MediaTek Dimensity 9400 8 nhân', '12GB/256GB', '5000mAh', 'Tần số quét 120Hz', '1 nhân 3.6 GHz, 3 nhân 3.3 GHz & 4 nhân 2.4 GHz', 'iphone-15-pro-max-black-thumbnew-600x600.jpg', 'iphone-16-pro-titan-sa-mac (1).png', 'iphone-16-pro-titan-sa-mac.png', 34000000, 40000000, 2),
(4, 'OPPO Find X8 5G 16GB/512GB', '6.7 inches AMOLED', '50MP + OIS góc rộng: 8MP xóa phông: 2MP + 32MP', 'Dimensity 7300 (4nm)', '16GB/256GB', '5000 mAh', 'Tần số quét 120Hz', '4 nhân 2.5 GHz & 4 nhân 2 GHz Mali-G615', 'oppo-find-x8-black-thumb-600x600.jpg', 'oppo-find-x8-pro-white-thumb-600x600.jpg', 'Oppox8.jpg', 2300000, 0, 3),
(5, 'Xiaomi 14T 5GB 12GB/256GB', '6.67 inches AMOLED', '23nm, f/1 7 cảm biến hình ảnh IMX906 của sony 2 0 m super Pixel tele: 50MP, 50mm, f/1 9 góc siêu rộng: 12MP, 15mm', 'MediaTek Dimensity 8300-Ultra', '12GB /256GB', '5000 mAh', '144Hz, 1,5K CrytalRes AMOLED, 446 ppi, 4000 nits, sáu màu 12bit, Làm mờ PWM lên đến 3840 HDR10+', '1x Cortex-A715, lên đến 3,35Ghz; 3x Cortex-A715, lên đến 3,32Ghz', 'xiaomi-14-ultra-white-thumbnew-600x600.jpg', 'xiaomi-14t-grey-thumb-600x600.jpg', 'xiaomi-redmi-note-13-green-thumb-600x600.jpg', 12000000, 0, 4),
(6, 'ViVo V40 Lite 8GB/ 256GB', '6.67 inches AMOLED', '50MP, f/1.8 +2 MP, f/2.4 +32 MP, f/2.45', 'Qualcomm Snapdragon 685 4G', '8GB/ 256GB', '5000 mAh', 'Tần số quét hỗ trợ 60Hz/ 120Hz. Độ bão hòa 107% mật độ điểm ảnh 394 ppi, 1800 nit', '8 nhân 4 x 2.8GHz + 4 x 1.9GHz', 'tinvevivo.jpg', 'tinveipp17.jpg', 'vivo-v40-lite-bac-thumb-600x600.jpg', 8500000, 0, 5),
(7, 'HONOR X5 Plus 4GB/64GB', '6.6 inches TFT LCD', '50 MP, f/1.89 2.0 MP, f/2.4 + 5.0 MP', 'MediaTek Helio G85', '4GB/ 64GB', '5200 mAh', '16.7 triệu 90 Hz 269 ppi, 780 nits', '2 x Cortex A752.0 GHz + 6 x Cortex A55 1.8 GHz', 'honor-200-white-thumb-600x600.jpg', 'Honor.jpeg', 'Honor2.jpg', 6500000, 7800000, 6),
(8, 'Realme C65 8GB/128GB', '6.74 inches IPS LCD', '50 MP + 8 MP', 'Unisoc Tiger T612', '8GB/ 128GB', '5000 mAh', '90Hz, độ sáng tối đa 560 nits,16.7 triệu màu', '12nm, lên tới 1.82GHz', 'realme-c67-xanh-thumb-600x600.jpg', 'rmc65.jpg', 'rmc652.jpg', 4500000, 0, 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donhang`
--

DROP TABLE IF EXISTS `donhang`;
CREATE TABLE IF NOT EXISTS `donhang` (
  `madonhang` int NOT NULL AUTO_INCREMENT,
  `MaKhachHang` int NOT NULL,
  `phivanchuyen` int NOT NULL,
  `ngaydathang` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `thanhtien` double NOT NULL,
  `phuongthuc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `TenKhachHang` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`madonhang`),
  KEY `MaKhachHang` (`MaKhachHang`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `donhang`
--

INSERT INTO `donhang` (`madonhang`, `MaKhachHang`, `phivanchuyen`, `ngaydathang`, `thanhtien`, `phuongthuc`, `TenKhachHang`) VALUES
(9, 16, 0, '2025-01-07 19:11:23', 4500000, 'cod', ''),
(10, 16, 0, '2025-01-07 19:22:26', 4500000, 'cod', ''),
(15, 16, 0, '2025-01-15 14:32:22', 6800000, 'cod', 'vien1'),
(16, 16, 0, '2025-01-15 14:35:48', 6800000, 'cod', 'vien1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giohang`
--

DROP TABLE IF EXISTS `giohang`;
CREATE TABLE IF NOT EXISTS `giohang` (
  `magiohang` int NOT NULL AUTO_INCREMENT,
  `Thongtin` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Thanhtien` double NOT NULL,
  `MaKhachHang` int NOT NULL,
  PRIMARY KEY (`magiohang`),
  KEY `makh` (`MaKhachHang`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `giohang`
--

INSERT INTO `giohang` (`magiohang`, `Thongtin`, `Thanhtien`, `MaKhachHang`) VALUES
(21, 'Dang Cho Xu Ly', 6800000, 16),
(22, 'Dang Cho Xu Ly', 11000000, 14);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

DROP TABLE IF EXISTS `hoadon`;
CREATE TABLE IF NOT EXISTS `hoadon` (
  `MaHoaDon` int NOT NULL AUTO_INCREMENT,
  `Gia` int NOT NULL,
  `NgayGiaoHang` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MaNV` int NOT NULL,
  `madonhang` int NOT NULL,
  PRIMARY KEY (`MaHoaDon`),
  KEY `MaNV` (`MaNV`),
  KEY `madonhang` (`madonhang`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`MaHoaDon`, `Gia`, `NgayGiaoHang`, `MaNV`, `madonhang`) VALUES
(1, 4500000, '2025-01-16 12:02:59', 1, 9);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
CREATE TABLE IF NOT EXISTS `khachhang` (
  `MaKhachHang` int NOT NULL AUTO_INCREMENT,
  `TenKhachHang` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DiaChi` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Sdt` int NOT NULL,
  `Email` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Matkhau` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`MaKhachHang`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`MaKhachHang`, `TenKhachHang`, `DiaChi`, `Sdt`, `Email`, `Matkhau`) VALUES
(11, 'san123456', '123456', 382099684, 'san1234567', '1234567'),
(12, 'haudau', 'AAAAAA', 3546789, 'haudau@gmail.com', '123'),
(13, 'haudau', 'AAAAAAAAA', 12345678, 'haudau@gmail.com', '123'),
(14, 'haudau1', '123 Cao Lỗ', 703123123, 'haudau3@gmail.com', '123'),
(15, 'vien', '123 Bông Sao', 123456789, 'vien@gmail.com', '123'),
(16, 'vien1', '123 Bông Sao', 312456, 'vien@gmail.com', '123');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khohang`
--

DROP TABLE IF EXISTS `khohang`;
CREATE TABLE IF NOT EXISTS `khohang` (
  `MaKhoHang` int NOT NULL,
  `TenKhoHang` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DiaChi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Sdt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `MaSanPham` int NOT NULL,
  PRIMARY KEY (`MaKhoHang`),
  KEY `MaSanPham` (`MaSanPham`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaisanpham`
--

DROP TABLE IF EXISTS `loaisanpham`;
CREATE TABLE IF NOT EXISTS `loaisanpham` (
  `MaLoaiSanPham` int NOT NULL AUTO_INCREMENT,
  `TenLoaiSanPham` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`MaLoaiSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `loaisanpham`
--

INSERT INTO `loaisanpham` (`MaLoaiSanPham`, `TenLoaiSanPham`) VALUES
(1, 'Xiaomi'),
(2, 'Oppo'),
(3, 'Iphone'),
(4, 'Vivo'),
(5, 'SamSung'),
(6, 'Honor'),
(7, 'Realme');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhacungcap`
--

DROP TABLE IF EXISTS `nhacungcap`;
CREATE TABLE IF NOT EXISTS `nhacungcap` (
  `MaNCC` int NOT NULL,
  `TenNCC` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DiaChi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Sdt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`MaNCC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
CREATE TABLE IF NOT EXISTS `nhanvien` (
  `MaNV` int NOT NULL AUTO_INCREMENT,
  `HoVaTen` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `NgaySinh` date NOT NULL,
  `GioiTinh` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CMND` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sdt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DiaChi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`MaNV`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`MaNV`, `HoVaTen`, `NgaySinh`, `GioiTinh`, `CMND`, `sdt`, `DiaChi`) VALUES
(1, 'Thanh San', '0000-00-00', 'Nam', '0993921004', '0382099673', '123 Bong Sao');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieunhap`
--

DROP TABLE IF EXISTS `phieunhap`;
CREATE TABLE IF NOT EXISTS `phieunhap` (
  `MaPhieuNhap` int NOT NULL,
  `NgayNhap` date NOT NULL,
  `MaNCC` int NOT NULL,
  `MaSanPham` int NOT NULL,
  PRIMARY KEY (`MaPhieuNhap`),
  KEY `MaNCC` (`MaNCC`),
  KEY `MaSanPham` (`MaSanPham`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quyen`
--

DROP TABLE IF EXISTS `quyen`;
CREATE TABLE IF NOT EXISTS `quyen` (
  `MaQuyen` int NOT NULL,
  `TenQuyen` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`MaQuyen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
CREATE TABLE IF NOT EXISTS `sanpham` (
  `MaSanPham` int NOT NULL AUTO_INCREMENT,
  `Gia` double(10,0) NOT NULL DEFAULT '0',
  `Giacu` double(10,0) NOT NULL DEFAULT '0',
  `TenSp` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `SoLuong` int NOT NULL,
  `MaLoaiSanPham` int NOT NULL,
  `Chitiet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `IMG` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`MaSanPham`),
  KEY `MaLoaiSanPham` (`MaLoaiSanPham`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`MaSanPham`, `Gia`, `Giacu`, `TenSp`, `SoLuong`, `MaLoaiSanPham`, `Chitiet`, `IMG`) VALUES
(1, 23490000, 34000000, 'Samsung galaxy S24 Ultra 5G 12GB/256GB', 10, 5, 'Samsung galaxy S24 Ultra 5G 12GB/256GB', 'samsung-galaxy-a05s-sliver-thumbnew-600x600.jpg'),
(2, 34000000, 40000000, 'Iphone 16 Pro Max 256GB', 10, 3, 'Iphone 16 Pro Max 256GB', 'iphone-16-pro-titan-sa-mac.png'),
(3, 2300000, 0, 'OPPO Find X8 5G 16G/512GB', 5, 2, 'OPPO Find X8 5G 16G/512GB', 'oppo-reno12-5g-sliver-thumb-1-600x600.jpg'),
(4, 12000000, 0, 'Xiaomi 14T 5G 12GB/256GB', 5, 1, 'Xiaomi 14T 5G 12GB/256GB', 'xiaomi-14t-grey-thumb-600x600.jpg'),
(5, 8500000, 0, 'ViVo V40 Lite 8GB/256GB', 5, 4, 'ViVo V40 Lite 8GB/256GB', 'vivo-v40-lite-bac-thumb-600x600.jpg'),
(6, 6500000, 7800000, 'HONOR X5 Plus 4GB/64/GB', 5, 6, 'HONOR X5 Plus 4GB/64/GB', 'honor-200-white-thumb-600x600.jpg'),
(7, 4500000, 0, 'Realme C65 8GB/128GB', 5, 7, 'Realme C65 8GB/128GB', 'realme-c67-xanh-thumb-600x600.jpg'),
(8, 36000000, 44000000, ' SamSung Galaxy Z Fold 6', 5, 5, ' SamSung Galaxy Z Fold 6', 'samsung-galaxy-z-fold6-xam-thumbn-600x600.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `name`, `address`, `email`, `user`, `pass`, `role`) VALUES
(1, NULL, NULL, NULL, '', '', 0),
(2, NULL, NULL, NULL, 'admin', '123', 1),
(3, NULL, NULL, NULL, '', '', 0),
(4, NULL, NULL, NULL, 'user', '456', 0);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chitietgiohang`
--
ALTER TABLE `chitietgiohang`
  ADD CONSTRAINT `FK_mgh1` FOREIGN KEY (`magiohang`) REFERENCES `giohang` (`magiohang`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_msanpham` FOREIGN KEY (`MaSanPham`) REFERENCES `sanpham` (`MaSanPham`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `chitietsanpham`
--
ALTER TABLE `chitietsanpham`
  ADD CONSTRAINT `FK_Msp` FOREIGN KEY (`MaSanPham`) REFERENCES `sanpham` (`MaSanPham`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `FK_MaKhachHang` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhang` (`MaKhachHang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `FK_Mkh` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhang` (`MaKhachHang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `FK_MANV` FOREIGN KEY (`MaNV`) REFERENCES `nhanvien` (`MaNV`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_MDH` FOREIGN KEY (`madonhang`) REFERENCES `donhang` (`madonhang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `khohang`
--
ALTER TABLE `khohang`
  ADD CONSTRAINT `khohang_ibfk_1` FOREIGN KEY (`MaSanPham`) REFERENCES `sanpham` (`MaSanPham`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
