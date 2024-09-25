package com.example.ecommerce.Backend.Repositories;

import com.example.ecommerce.Backend.Modals.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon, Long>{}

