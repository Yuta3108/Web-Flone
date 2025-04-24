package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "loaisanpham")
@Getter
@Setter
public class LoaiSanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaLoaiSanPham")
    private int maLoaiSanPham;

    @Column(name = "TenLoaiSanPham")
    private String tenLoaiSanPham;
}