package com.example.DoanWeb.service;

import com.example.DoanWeb.model.KhachHang;
import com.example.DoanWeb.repository.KhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KhachHangService {
    @Autowired
    private KhachHangRepository khachHangRepository;

    public List<KhachHang> findAll() {
        return khachHangRepository.findAll();
    }
    public Optional<KhachHang> findById(int id) {
        return khachHangRepository.findById(id);
    }

    public KhachHang save(KhachHang khachHang) {
        return khachHangRepository.save(khachHang);
    }

    public void delete(int id) {
        khachHangRepository.deleteById(id);
    }

    public KhachHang updateKhachHang(int id, KhachHang khachHangDetails) {
        KhachHang existingKhachHang = khachHangRepository.findById(id).orElse(null);
        if (existingKhachHang != null) {
            existingKhachHang.setTenKhachHang(khachHangDetails.getTenKhachHang());
            existingKhachHang.setDiaChi(khachHangDetails.getDiaChi());
            existingKhachHang.setSdt(khachHangDetails.getSdt());
            existingKhachHang.setEmail(khachHangDetails.getEmail());
            existingKhachHang.setMatKhau(khachHangDetails.getMatKhau());
            return khachHangRepository.save(existingKhachHang);
        }
        return null;
    }

    public KhachHang dangKy(KhachHang khachHang) {
        Optional<KhachHang> existing = khachHangRepository.findByEmail(khachHang.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Email đã được sử dụng");
        }
        return khachHangRepository.save(khachHang);
    }

    public KhachHang dangNhap(String email, String matKhau) {
        KhachHang khachHang = khachHangRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

        System.out.println("Email nhập: " + email);
        System.out.println("Mật khẩu nhập: " + matKhau);
        System.out.println("Mật khẩu trong DB: " + khachHang.getMatKhau());

        if (!khachHang.getMatKhau().equals(matKhau)) {
            throw new RuntimeException("Sai mật khẩu");
        }

        return khachHang;
    }



}
