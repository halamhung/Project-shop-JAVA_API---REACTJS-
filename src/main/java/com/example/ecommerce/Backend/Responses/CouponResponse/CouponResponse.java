package com.example.ecommerce.Backend.Responses.CouponResponse;


import com.example.ecommerce.Backend.Modals.Coupon;
import com.example.ecommerce.Backend.Responses.BaseResponse;
import lombok.*;

import java.time.LocalDate;

@Builder
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CouponResponse extends BaseResponse {

    private long id;
    private String name;
    private String description;
    private Boolean status;
    private Double discountPercentage;
    private LocalDate expirationDate;

    public static CouponResponse fromCouponResponse (Coupon coupon) {
        CouponResponse couponResponse = CouponResponse.builder()
                .id(coupon.getId())
                .name(coupon.getName())
                .description(coupon.getDescription())
                .status(coupon.getStatus())
                .discountPercentage(coupon.getDiscountPercentage())
                .expirationDate(coupon.getExpirationDate())
                .build();
        couponResponse.setCreatedAt(coupon.getCreateAt());
        couponResponse.setUpdatedAt(coupon.getUpdateAt());
        return couponResponse;
    }



}
