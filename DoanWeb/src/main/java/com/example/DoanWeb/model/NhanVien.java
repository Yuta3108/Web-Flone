package com.example.DoanWeb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "nhanvien")
@Getter
@Setter
public class NhanVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNV")
    private int maNV;

    @Column(name = "HoVaTen")
    private String hoVaTen;

    @Column(name = "NgaySinh")
    private String ngaySinh; // Có thể dùng LocalDate nếu cần định dạng ngày

    @Column(name = "GioiTinh")
    private String gioiTinh;

    @Column(name = "CMND")
    private String cmnd;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "DiaChi")
    private String diaChi;
}