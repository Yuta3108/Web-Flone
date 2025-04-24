package com.example.DoanWeb.controller;

import com.example.DoanWeb.model.LoaiSanPham;
import com.example.DoanWeb.service.LoaiSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/loaisanpham")
public class LoaiSanPhamController {
    @Autowired
    private LoaiSanPhamService loaiSanPhamService;

    @GetMapping
    public ResponseEntity<List<LoaiSanPham>> getLoaiSanPham() {
        return ResponseEntity.ok(loaiSanPhamService.findAll());
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<LoaiSanPham> getLoaiSanPhambyid(@PathVariable int id) {
        Optional<LoaiSanPham> loaiSanPham = loaiSanPhamService.findById(id);
        return loaiSanPham.map(ResponseEntity::ok)
                .orElseGet(()-> ResponseEntity.notFound().build());
    }

    @PostMapping
    public LoaiSanPham save(@RequestBody LoaiSanPham loaiSanPham) {return loaiSanPhamService.save(loaiSanPham);}

    @PutMapping({"/{id}"})
    public ResponseEntity<LoaiSanPham> update(@PathVariable int id, @RequestBody LoaiSanPham loaiSanPhamDetails) {
        LoaiSanPham updatedLoaiSanPham = loaiSanPhamService.updateLoaiSanPham(id, loaiSanPhamDetails);
        if (updatedLoaiSanPham != null) {
            return ResponseEntity.ok(updatedLoaiSanPham);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        loaiSanPhamService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
