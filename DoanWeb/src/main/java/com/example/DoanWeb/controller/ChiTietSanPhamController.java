package com.example.DoanWeb.controller;

import com.example.DoanWeb.model.ChiTietSanPham;
import com.example.DoanWeb.service.ChiTietSanPhamService;
import com.example.DoanWeb.service.UploadImagefile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/chitietsanpham")
public class ChiTietSanPhamController {
    @Autowired
    private ChiTietSanPhamService chiTietSanPhamService;
    @Autowired
    private UploadImagefile uploadImagefile;

    @GetMapping
    public ResponseEntity<List<ChiTietSanPham>> getAll() {
        List<ChiTietSanPham> chiTietSanPhams = chiTietSanPhamService.findAll();
        return ResponseEntity.ok(chiTietSanPhams);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChiTietSanPham> getChiTietSanPhamById(@PathVariable int id) {
        ChiTietSanPham chiTietSanPham = chiTietSanPhamService.findById(id);
        return ResponseEntity.ok(chiTietSanPham);
    }

    @PostMapping
    public ResponseEntity<ChiTietSanPham> create(@RequestPart("sanPham") ChiTietSanPham chiTietSanPham,
                                                 @RequestPart(value = "img1", required = false) MultipartFile img1,
                                                 @RequestPart(value = "img2", required = false)MultipartFile img2,
                                                    @RequestPart(value = "img3", required = false)MultipartFile img3)  {
        try {
            if (img1 != null && !img1.isEmpty()) {
                String imageUrl1 = uploadImagefile.uploadImagefile(img1);
                chiTietSanPham.setImg1(imageUrl1);
            }
            if (img2 != null && !img2.isEmpty()) {
                String imageUrl2 = uploadImagefile.uploadImagefile(img2);
                chiTietSanPham.setImg2(imageUrl2);
            }
            if (img3 != null && !img3.isEmpty()) {
                String imageUrl3 = uploadImagefile.uploadImagefile(img3);
                chiTietSanPham.setImg3(imageUrl3);
            }
            ChiTietSanPham savedChiTietSanPham = chiTietSanPhamService.save(chiTietSanPham);
            return ResponseEntity.ok(savedChiTietSanPham);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<ChiTietSanPham> updateChiTietSanPham(@PathVariable int id,
                                                               @RequestPart("chiTietSanPham") ChiTietSanPham chiTietSanPham,
                                                               @RequestPart(value = "img1", required = false) MultipartFile img1,
                                                               @RequestPart(value = "img2", required = false) MultipartFile img2,
                                                               @RequestPart(value = "img3", required = false) MultipartFile img3) {
        try {
            if (img1 != null && !img1.isEmpty()) {
                String imageUrl1 = uploadImagefile.uploadImagefile(img1);
                chiTietSanPham.setImg1(imageUrl1);
            }
            if (img2 != null && !img2.isEmpty()) {
                String imageUrl2 = uploadImagefile.uploadImagefile(img2);
                chiTietSanPham.setImg2(imageUrl2);
            }
            if (img3 != null && !img3.isEmpty()) {
                String imageUrl3 = uploadImagefile.uploadImagefile(img3);
                chiTietSanPham.setImg3(imageUrl3);
            }
            ChiTietSanPham updatedChiTietSanPham = chiTietSanPhamService.update(id, chiTietSanPham);
            if (updatedChiTietSanPham != null) {
                return ResponseEntity.ok(updatedChiTietSanPham);
            }
            return ResponseEntity.notFound().build();
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        chiTietSanPhamService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
