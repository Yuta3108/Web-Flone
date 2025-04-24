package com.example.DoanWeb.repository;

import com.example.DoanWeb.model.ChiTietSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChitietsanphamRepository extends JpaRepository<ChiTietSanPham, Integer> {
}
