package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "khachhang")
@Getter
@Setter
public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaKhachHang")
    private int maKhachHang;

    @Column(name = "TenKhachHang")
    private String tenKhachHang;

    @Column(name = "DiaChi")
    private String diaChi;

    @Column(name = "Sdt")
    private String sdt;

    @Column(name = "Email")
    private String email;

    @Column(name = "matkhau")
    private String matKhau;
}
