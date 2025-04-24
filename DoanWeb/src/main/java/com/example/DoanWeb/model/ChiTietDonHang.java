package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "chitietdonhang")
@Getter
@Setter
public class ChiTietDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maChiTietDonHang")
    private int maChiTietDonHang;

    @ManyToOne
    @JoinColumn(name = "maDonHang", nullable = false)
    private DonHang donHang;

    @ManyToOne
    @JoinColumn(name = "maSanPham", nullable = false)
    private SanPham sanPham;

    @Column(name = "soLuong")
    private int soLuong;

    @Column(name = "tongGia")
    private double tongGia;
}