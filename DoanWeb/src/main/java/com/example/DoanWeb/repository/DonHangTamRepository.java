package com.example.DoanWeb.repository;

import com.example.DoanWeb.model.DonHangTam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHangTamRepository extends JpaRepository<DonHangTam, Integer> {

}
