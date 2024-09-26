package com.example.ecommerce.Backend.Repositories;

import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Modals.Coupon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon, Long>{

    Coupon findByName(String name);

    Page<Coupon> findAll(Pageable pageable);

}

