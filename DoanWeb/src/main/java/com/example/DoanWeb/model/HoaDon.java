package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "hoadon")
@Getter
@Setter
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaHoaDon")
    private int maHoaDon;

    @ManyToOne
    @JoinColumn(name = "madonhang", nullable = false)
    private DonHang donHang;

    @ManyToOne
    @JoinColumn(name = "MaNV", nullable = false)
    private NhanVien nhanVien;

    @Column(name = "NgayGiaoHang")
    private String ngayGiaoHang; // Có thể dùng LocalDate nếu cần định dạng ngày
}