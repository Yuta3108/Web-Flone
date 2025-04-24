package com.example.DoanWeb.service;

import com.example.DoanWeb.model.ChiTietSanPham;
import com.example.DoanWeb.model.KhachHang;
import com.example.DoanWeb.repository.ChitietsanphamRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChiTietSanPhamService {
    @Autowired
    private ChitietsanphamRepository chitietsanphamRepository;

    public List<ChiTietSanPham> findAll() {
        return chitietsanphamRepository.findAll();
    }
    public ChiTietSanPham findById(int id) {
        return chitietsanphamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy chi tiết sản phẩm với id: " + id));
    }
    public ChiTietSanPham save(ChiTietSanPham chiTietSanPham) {
        return chitietsanphamRepository.save(chiTietSanPham);
    }
    public void delete(int id) {
        chitietsanphamRepository.deleteById(id);
    }
    public ChiTietSanPham update(int id, ChiTietSanPham chiTietSanPham) {
        ChiTietSanPham existing = findById(id);
        existing.setKtcn(chiTietSanPham.getKtcn());
        existing.setCamera(chiTietSanPham.getCamera());
        existing.setChip(chiTietSanPham.getChip());
        existing.setRam(chiTietSanPham.getRam());
        existing.setPin(chiTietSanPham.getPin());
        existing.setTanSoQuet(chiTietSanPham.getTanSoQuet());
        existing.setLoaiCpu(chiTietSanPham.getLoaiCpu());
        existing.setImg1(chiTietSanPham.getImg1());
        existing.setImg2(chiTietSanPham.getImg2());
        existing.setImg3(chiTietSanPham.getImg3());
        return chitietsanphamRepository.save(existing);
    }

}
