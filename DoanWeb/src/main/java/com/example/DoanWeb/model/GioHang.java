package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "giohang")
@Getter
@Setter
public class GioHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "magiohang")
    private int maGioHang;

    @ManyToOne
    @JoinColumn(name = "MaKhachHang", nullable = false)
    private KhachHang khachHang;

    @Column(name = "Thongtin")
    private String thongTin;
}