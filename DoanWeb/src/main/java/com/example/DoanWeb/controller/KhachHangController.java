package com.example.DoanWeb.controller;

import com.example.DoanWeb.model.KhachHang;
import com.example.DoanWeb.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/khachhang")
public class KhachHangController {
    @Autowired
    private KhachHangService khachHangService;

    @GetMapping
    public ResponseEntity<List<KhachHang>> getAll() {
        return ResponseEntity.ok(khachHangService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<KhachHang> getKhachHangbyid(@PathVariable int id) {
        Optional<KhachHang> khachHang = khachHangService.findById(id);
        return khachHang.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<KhachHang> save(@RequestBody KhachHang khachHang) {
        KhachHang savedKhachHang = khachHangService.save(khachHang);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHang);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        khachHangService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<KhachHang> update(@PathVariable int id, @RequestBody KhachHang khachHang) {
        KhachHang updatedKhachHang = khachHangService.updateKhachHang(id, khachHang);
        if (updatedKhachHang != null) {
            return ResponseEntity.ok(updatedKhachHang);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/dangky")
    public KhachHang dangKy(@RequestBody KhachHang khachHang) {
        return khachHangService.dangKy(khachHang);
    }

    @PostMapping("/dangnhap")
    public ResponseEntity<?> dangNhap(@RequestBody KhachHang request) {
        System.out.println("Dữ liệu nhận được: email = " + request.getEmail() + ", matKhau = " + request.getMatKhau());

        KhachHang kh = khachHangService.dangNhap(request.getEmail(), request.getMatKhau());
        return ResponseEntity.ok(kh);
    }
}
