package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "chitietsanpham")
@Getter
@Setter
public class ChiTietSanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Mamt")
    private int maMt;

    @ManyToOne
    @JoinColumn(name = "MaSanPham", nullable = false)
    private SanPham sanPham;

    @Column(name = "ktcn")
    private String ktcn;

    @Column(name = "camera")
    private String camera;

    @Column(name = "Chip")
    private String chip;

    @Column(name = "Ram")
    private String ram;

    @Column(name = "Pin")
    private String pin;

    @Column(name = "Tansoquet")
    private String tanSoQuet;

    @Column(name = "Loaicpu")
    private String loaiCpu;

    @Column(name = "IMG1")
    private String img1;

    @Column(name = "IMG2")
    private String img2;

    @Column(name = "IMG3")
    private String img3;
}