package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "donhangtam")
@Getter
@Setter
public class DonHangTam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dht_id")
    private Integer dhtId;

    @Column(name = "tenkhtam", length = 100)
    private String tenKH;

    @Column(name = "emailtam", length = 100)
    private String email;

    @Column(name = "sdttam", length = 15)
    private String sdt;

    @Column(name = "phuongthucthanhtoan", length = 50)
    private String phuongThucThanhToan;
    @Column(name = "soluong", nullable = false)
    private Integer soLuong;
    @Column(name = "diachightam", length = 255)
    private String diaChi;

    @Column(name = "ngaydathang", nullable = false)
    private LocalDate ngayDatHang;

    @Column(name = "total", nullable = false)
    private Double tongTien;

    @Column(name = "trangthai", nullable = false, length = 50)
    private String trangThai;
}