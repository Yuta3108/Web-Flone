package com.example.DoanWeb.repository;

import com.example.DoanWeb.model.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {}
