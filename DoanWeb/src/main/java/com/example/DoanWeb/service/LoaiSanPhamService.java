package com.example.DoanWeb.service;

import com.example.DoanWeb.model.LoaiSanPham;

import com.example.DoanWeb.model.SanPham;
import com.example.DoanWeb.repository.LoaiSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoaiSanPhamService {
    @Autowired
    private LoaiSanPhamRepository loaiSanPhamRepository;

    public List<LoaiSanPham> findAll() {
        return loaiSanPhamRepository.findAll();
    }

    public Optional<LoaiSanPham> findById(int id) {
        return loaiSanPhamRepository.findById(id)       ;

    }

    public LoaiSanPham save(LoaiSanPham loaiSanPham) {
        return loaiSanPhamRepository.save(loaiSanPham);
    }
    
    public void delete(int id) {
        loaiSanPhamRepository.deleteById(id);
        
    }

    public LoaiSanPham updateLoaiSanPham(int id, LoaiSanPham loaiSanPhamDetails) {
        LoaiSanPham existingLoaiSanPham = loaiSanPhamRepository.findById(id).orElse(null);
        if (existingLoaiSanPham != null) {
            existingLoaiSanPham.setTenLoaiSanPham(loaiSanPhamDetails.getTenLoaiSanPham());
            return loaiSanPhamRepository.save(existingLoaiSanPham);
        }
        return null;
    }
}
