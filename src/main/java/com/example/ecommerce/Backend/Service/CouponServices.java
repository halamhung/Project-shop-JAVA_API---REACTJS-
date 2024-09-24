package com.example.ecommerce.Backend.Service;

import com.example.ecommerce.Backend.Dtos.CouponsDTO;
import com.example.ecommerce.Backend.IService.ICoupoun;
import com.example.ecommerce.Backend.Modals.Coupon;
import com.example.ecommerce.Backend.Repositories.CouponRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CouponServices implements ICoupoun {

    private final CouponRepository couponRepo;

    @Override
    public List<Coupon> getAllCoupons() {
        return couponRepo.findAll();
    }

    @Override
    public Coupon getCouponById(long id) {
        return couponRepo.findById(id).get();
    }

    @Override
    public Coupon updateCoupon(long id, CouponsDTO couponsDTO) {
        Coupon coupon = getCouponById(id);
        coupon.setDescription(couponsDTO.getDescription());
        coupon.setExpirationDate(couponsDTO.getExpirationDate());
        coupon.setName(couponsDTO.getName());
        coupon.setStatus(couponsDTO.getStatus());
        coupon.setDiscountPercentage(couponsDTO.getDiscountPercentage());
        return couponRepo.save(coupon);
    }

    @Override
    public Coupon saveCoupon(CouponsDTO couponsDTO) {
        Coupon coupon = Coupon.builder()
                .name(couponsDTO.getName())
                .description(couponsDTO.getDescription())
                .expirationDate(couponsDTO.getExpirationDate())
                .status(couponsDTO.getStatus())
                .discountPercentage(couponsDTO.getDiscountPercentage())
                .build();
        return couponRepo.save(coupon);
    }

    @Override
    public void deleteCoupon(long id) {
        couponRepo.deleteById(id);
    }


}
