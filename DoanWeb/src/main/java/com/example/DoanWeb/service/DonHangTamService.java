package com.example.DoanWeb.service;

import com.example.DoanWeb.model.DonHangTam;
import com.example.DoanWeb.repository.DonHangTamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonHangTamService {
    @Autowired
    private DonHangTamRepository donHangTamRepository;

    @Autowired
    private DonHangTamRepository repository;

    public List<DonHangTam> getDonHangTam() {
        return donHangTamRepository.findAll();
    }

    public void updateTrangThai(Integer dhtId, String trangThai) {
        DonHangTam donHangTam = repository.findById(dhtId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng tạm"));
        donHangTam.setTrangThai(trangThai);
        repository.save(donHangTam);
    }
}
