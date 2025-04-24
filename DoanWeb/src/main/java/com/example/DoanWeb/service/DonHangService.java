package com.example.DoanWeb.service;

import com.example.DoanWeb.model.DonHang;
import com.example.DoanWeb.repository.DonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Service
public class DonHangService {
    @Autowired
    private DonHangRepository donHangRepository;


    public List<DonHang> findAll() {
        return donHangRepository.findAll();
    }


    public Optional<DonHang> findById(int id) {
        return donHangRepository.findById(id);
    }


    public DonHang save(DonHang donHang) {
        return donHangRepository.save(donHang);
    }


    public DonHang update(int id, DonHang donHang) {
        Optional<DonHang> existingDonHang = donHangRepository.findById(id);
        if (existingDonHang.isPresent()) {
            DonHang updatedDonHang = existingDonHang.get();
            updatedDonHang.setKhachHang(donHang.getKhachHang());
            updatedDonHang.setNgayDatHang(donHang.getNgayDatHang());
            updatedDonHang.setSoLuong(donHang.getSoLuong());
            updatedDonHang.setTongTien(donHang.getTongTien());
            updatedDonHang.setPhuongThucThanhToan(donHang.getPhuongThucThanhToan());
            updatedDonHang.setTrangThai(donHang.getTrangThai());
            return donHangRepository.save(updatedDonHang);
        }
        return null;
    }


    public void delete(int id) {
        donHangRepository.deleteById(id);
    }
}
