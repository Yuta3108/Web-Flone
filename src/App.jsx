import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DangNhap from './Components/Auth/DangNhap'
import DangKy from './Components/Auth/DangKy'
import GioHang from './Components/CacChucNang/giohang'
import ThanhToan from './Components/CacChucNang/ThanhToan'
import Trangchu from './Components/layout/TrangChu'
import ChitietSanPham from './Components/CacChucNang/ChiTietSanPham'
import AdminDashboard from './Components/layout/Dashboard'
import SanPhamPage from './Components/layout/SanPhamPage'
import DonHangPage from './Components/layout/DonHangPage'
import KhachHangPage from './Components/layout/KhachHangPage'
import DonHang from './Components/layout/Donhang'
import HienThiThongTinKhachHang from './Components/CacChucNang/thongtinkhachhang'
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/home' element={<Trangchu />} />
          <Route path='/dangnhap' element={<DangNhap />} />
          <Route path='/dangky' element={<DangKy />} />
          <Route path='/giohang' element={<GioHang />} />
          <Route path='/thanhtoan' element={<ThanhToan />} />
          <Route path="/product/:id" element={<ChitietSanPham />} />
          <Route path="/donhang" element={<DonHang />} />
          <Route path="/thongtinkhachhang" element={<HienThiThongTinKhachHang />} />

          //dashboard
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard-sanpham" element={<SanPhamPage />} />
          <Route path="/dashboard-donhang" element={<DonHangPage />} />
          <Route path="/dashboard-khachhang" element={<KhachHangPage />} />
          
        </Routes>
      </div>
    </>
  )
}

export default App
