package com.example.DoanWeb.controller;

import com.example.DoanWeb.model.DonHangTam;
import com.example.DoanWeb.service.DonHangTamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donhangtam")
public class DonHangTamController {
    @Autowired
    private DonHangTamService service;

    @GetMapping
    public ResponseEntity<List<DonHangTam>> getAllDonHangTam() {
        List<DonHangTam> donHangTamList = service.getDonHangTam();
        return ResponseEntity.ok(donHangTamList);
    }

    @PutMapping("/{id}/trangthai")
    public ResponseEntity<Void> updateTrangThai(@PathVariable Integer id, @RequestBody DonHangTamUpdateDTO dto) {
        service.updateTrangThai(id, dto.getTrangThai());
        return ResponseEntity.ok().build();
    }
}
