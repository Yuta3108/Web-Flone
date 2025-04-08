import React from 'react'
import {Routes,Route} from 'react-router-dom'
import DangNhap from './Components/Auth/DangNhap'
import DangKy from './Components/Auth/DangKy'
import GioHang from './Components/CacChucNang/giohang'
import ThanhToan from './Components/CacChucNang/ThanhToan'
import Trangchu from './Components/layout/TrangChu'
import ChitietSanPham from './Components/CacChucNang/ChiTietSanPham'
import AdminDashboard from './Components/layout/Dashboard'
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Trangchu/>}/>
          <Route path='/dangnhap' element={<DangNhap/>}/>
          <Route path='/dangky' element={<DangKy/>}/>
          <Route path='/giohang' element={<GioHang/>}/>
          <Route path='/thanhtoan' element={<ThanhToan/>}/>
          <Route path="/product/:id" element={<ChitietSanPham />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  )
}

export default App
