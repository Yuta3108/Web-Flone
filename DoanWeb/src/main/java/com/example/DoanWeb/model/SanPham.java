package com.example.DoanWeb.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "sanpham")
@Getter
@Setter
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSanPham")
    private int maSanPham;

    @Column(name = "Gia")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private double gia;

    @Column(name = "Giacu")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private double giaCu;

    @Column(name = "TenSp")
    private String tenSp;

    @Column(name = "SoLuong")
    private int soLuong;

    @ManyToOne
    @JoinColumn(name = "MaLoaiSanPham", nullable = false)
    private LoaiSanPham loaiSanPham;

    @Column(name = "IMG")
    private String img;
}