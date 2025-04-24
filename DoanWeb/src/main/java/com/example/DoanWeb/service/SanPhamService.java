package com.example.DoanWeb.service;

import com.example.DoanWeb.model.SanPham;
import com.example.DoanWeb.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SanPhamService {
    @Autowired
    private SanPhamRepository sanPhamRepository;

    public List<SanPham> getAllSanPham() {
        return sanPhamRepository.findAll();
    }

    // Lấy sản phẩm theo ID
    public Optional<SanPham> getSanPhamById(int id) {
        return sanPhamRepository.findById(id);
    }

    // Thêm sản phẩm mới
    public SanPham addSanPham(SanPham sanPham) {
        return sanPhamRepository.save(sanPham);
    }

    // Cập nhật sản phẩm
    public SanPham updateSanPham(int id, SanPham sanPhamDetails) {
        Optional<SanPham> sanPham = sanPhamRepository.findById(id);
        if (sanPham.isPresent()) {
            SanPham existingSanPham = sanPham.get();
            existingSanPham.setTenSp(sanPhamDetails.getTenSp());
            existingSanPham.setGia(sanPhamDetails.getGia());
            existingSanPham.setGiaCu(sanPhamDetails.getGiaCu());
            existingSanPham.setSoLuong(sanPhamDetails.getSoLuong());
            existingSanPham.setLoaiSanPham(sanPhamDetails.getLoaiSanPham());

            existingSanPham.setImg(sanPhamDetails.getImg());
            return sanPhamRepository.save(existingSanPham);
        }
        return null;
    }

    // Xóa sản phẩm
    public void deleteSanPham(int id) {
        sanPhamRepository.deleteById(id);
    }
}