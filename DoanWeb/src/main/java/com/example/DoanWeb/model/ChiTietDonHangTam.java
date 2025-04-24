package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "chitietdonhangtam")
@Data
public class ChiTietDonHangTam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ctdht_id")
    private Integer ctdhtId;

    @Column(name = "ma_don_hang")
    private Integer maDonHang;

    @Column(name = "ma_san_pham")
    private Integer maSanPham;

    @Column(name = "so_luong", nullable = false)
    private Integer soLuong;

    @Column(name = "tong_gia", nullable = false)
    private Double tongGia;

    @ManyToOne
    @JoinColumn(name = "ma_don_hang", referencedColumnName = "dht_id", insertable = false, updatable = false)
    private DonHangTam donHangTam;

    @ManyToOne
    @JoinColumn(name = "ma_san_pham", referencedColumnName = "MaSanPham", insertable = false, updatable = false)
    private SanPham sanPham;
}