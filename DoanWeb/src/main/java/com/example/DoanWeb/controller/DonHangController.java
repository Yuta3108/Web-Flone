package com.example.DoanWeb.controller;

import com.example.DoanWeb.model.DonHang;
import com.example.DoanWeb.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donhang")
public class DonHangController {
    @Autowired
    private DonHangService donHangService;

    // Lấy tất cả đơn hàng
    @GetMapping
    public List<DonHang> getAllDonHang() {
        return donHangService.findAll();
    }

    // Lấy đơn hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<DonHang> getDonHangById(@PathVariable int id) {
        Optional<DonHang> donHang = donHangService.findById(id);
        return donHang.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Thêm đơn hàng mới
    @PostMapping
    public ResponseEntity<DonHang> createDonHang(@RequestBody DonHang donHang) {
        DonHang savedDonHang = donHangService.save(donHang);
        return ResponseEntity.ok(savedDonHang);
    }

    // Cập nhật đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<DonHang> updateDonHang(@PathVariable int id, @RequestBody DonHang donHang) {
        DonHang updatedDonHang = donHangService.update(id, donHang);
        if (updatedDonHang != null) {
            return ResponseEntity.ok(updatedDonHang);
        }
        return ResponseEntity.notFound().build();
    }

    // Xóa đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonHang(@PathVariable int id) {
        donHangService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
