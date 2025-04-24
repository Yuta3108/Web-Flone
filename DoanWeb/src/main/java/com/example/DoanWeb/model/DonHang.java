package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "donhang")
@Getter
@Setter
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "madonhang")
    private Integer maDonHang;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = false)
    private KhachHang khachHang;

    @Column(name = "diachigh", length = 255)
    private String diaChi;

    @Column(name = "ngaydathang", nullable = false)
    private LocalDate ngayDatHang;

    @Column(name = "soluong", nullable = false)
    private Integer soLuong;

    @Column(name = "tongtien", nullable = false)
    private Double tongTien;

    @Column(name = "phuongthucthanhtoan", length = 50)
    private String phuongThucThanhToan;

    @Column(name = "trangthai", nullable = false, length = 50)
    private String trangThai;
}
