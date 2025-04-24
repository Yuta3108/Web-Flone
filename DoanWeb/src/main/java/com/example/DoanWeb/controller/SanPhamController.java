package com.example.DoanWeb.controller;

import com.example.DoanWeb.model.LoaiSanPham;
import com.example.DoanWeb.model.SanPham;
import com.example.DoanWeb.repository.LoaiSanPhamRepository;
import com.example.DoanWeb.service.SanPhamService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.DoanWeb.service.UploadImagefile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
    @RequestMapping("/api/sanpham")
public class SanPhamController {

    @Autowired
    private LoaiSanPhamRepository loaiSanPhamRepository;
    @Autowired
    private SanPhamService sanPhamService;
    @Autowired
    private UploadImagefile uploadImagefile;

    // Lấy tất cả sản phẩm
    @GetMapping
    public List<SanPham> getAllSanPham() {
        return sanPhamService.getAllSanPham();
    }

    // Lấy sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<SanPham> getSanPhamById(@PathVariable int id) {
        Optional<SanPham> sanPham = sanPhamService.getSanPhamById(id);
        return sanPham.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Thêm sản phẩm mới
    @PostMapping
    public ResponseEntity<?> addSanPham(
            @RequestPart("sanPham") String sanPhamJson,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(sanPhamJson);

            SanPham sanPham = new SanPham();
            sanPham.setTenSp(node.get("tenSp").asText());
            sanPham.setGia(node.get("gia").asDouble());
            sanPham.setGiaCu(node.get("giaCu").asDouble());
            sanPham.setSoLuong(node.get("soLuong").asInt());

            int maLoai = node.get("loaiSanPham").get("maLoaiSanPham").asInt();
            LoaiSanPham loai = loaiSanPhamRepository.findById(maLoai)
                    .orElseThrow(() -> new RuntimeException("Loại sản phẩm không tồn tại!"));

            sanPham.setLoaiSanPham(loai);

            if (file != null && !file.isEmpty()) {
                String imageUrl = uploadImagefile.uploadImagefile(file);
                sanPham.setImg(imageUrl);
            }

            SanPham saved = sanPhamService.addSanPham(sanPham);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace(); // debug khi lỗi
            return ResponseEntity.status(500).body("Lỗi khi thêm sản phẩm!");
        }
    }

    // Cập nhật sản phẩm với hình ảnh
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSanPham(
            @PathVariable int id,
            @RequestPart("sanPham") String sanPhamJson,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(sanPhamJson);

            Optional<SanPham> optional = sanPhamService.getSanPhamById(id);
            if (optional.isEmpty()) return ResponseEntity.notFound().build();

            SanPham sanPham = optional.get();
            sanPham.setTenSp(node.get("tenSp").asText());
            sanPham.setGia(node.get("gia").asDouble());
            sanPham.setGiaCu(node.get("giaCu").asDouble());
            sanPham.setSoLuong(node.get("soLuong").asInt());

            int maLoai = node.get("loaiSanPham").get("maLoaiSanPham").asInt();
            LoaiSanPham loai = loaiSanPhamRepository.findById(maLoai)
                    .orElseThrow(() -> new RuntimeException("Loại sản phẩm không tồn tại!"));
            sanPham.setLoaiSanPham(loai);

            if (file != null && !file.isEmpty()) {
                String imageUrl = uploadImagefile.uploadImagefile(file);
                sanPham.setImg(imageUrl);
            }

            SanPham updated = sanPhamService.updateSanPham(id, sanPham);
            return ResponseEntity.ok(updated);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi cập nhật sản phẩm!");
        }
    }


    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSanPham(@PathVariable int id) {
        sanPhamService.deleteSanPham(id);
        return ResponseEntity.noContent().build();
    }
}