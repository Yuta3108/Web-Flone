package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "chitietgiohang")
@Getter
@Setter
public class ChiTietGioHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "machitietgiohang")
    private int maChiTietGioHang;

    @ManyToOne
    @JoinColumn(name = "magiohang", nullable = false)
    private GioHang gioHang;

    @ManyToOne
    @JoinColumn(name = "MaSanPham", nullable = false)
    private SanPham sanPham;

    @Column(name = "soluong")
    private int soLuong;
}