package com.example.ecommerce.Backend.IService;

import com.example.ecommerce.Backend.Dtos.CouponsDTO;
import com.example.ecommerce.Backend.Modals.Coupon;

import java.util.List;

public interface ICoupoun {

    List<Coupon> getAllCoupons();
    Coupon getCouponById(long id);
    Coupon updateCoupon(long id , CouponsDTO couponsdto);
    Coupon saveCoupon(CouponsDTO couponsdto);
    void deleteCoupon(long id);



}
