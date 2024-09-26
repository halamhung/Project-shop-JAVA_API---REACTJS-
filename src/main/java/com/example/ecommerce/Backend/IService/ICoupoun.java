package com.example.ecommerce.Backend.IService;

import com.example.ecommerce.Backend.Dtos.CouponsDTO;
import com.example.ecommerce.Backend.Modals.Coupon;
import com.example.ecommerce.Backend.Responses.CouponResponse.CouponResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICoupoun {

    List<Coupon> getAllCoupons();
    Coupon getCouponById(Long id);
    Coupon updateCoupon(Long id , CouponsDTO couponsdto);
    Coupon saveCoupon(CouponsDTO couponsdto);
    void deleteCoupon(Long id);
    Coupon addCoupon(CouponsDTO couponsdto);
    Page<CouponResponse> getAllCouponsByPage(Pageable pageable);


}
