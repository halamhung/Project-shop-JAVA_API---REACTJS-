package com.example.ecommerce.Backend.Service;

import com.example.ecommerce.Backend.Dtos.CouponsDTO;
import com.example.ecommerce.Backend.IService.ICoupoun;
import com.example.ecommerce.Backend.Modals.Coupon;
import com.example.ecommerce.Backend.Repositories.CouponRepository;
import com.example.ecommerce.Backend.Responses.CouponResponse.CouponResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<CouponResponse> getAllCouponsByPage(Pageable pageable) {
        return couponRepo.findAll(pageable).map(coupon -> {
            return CouponResponse.fromCouponResponse(coupon);
        });
    }


    @Override
    public Coupon getCouponById(Long id) {
        return couponRepo.findById(id).get();
    }

    @Override
    public Coupon updateCoupon(Long id, CouponsDTO couponsDTO) {
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
    public Coupon addCoupon(CouponsDTO couponsDTO) {
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
    public void deleteCoupon(Long id) {
        couponRepo.deleteById(id);
    }


}
