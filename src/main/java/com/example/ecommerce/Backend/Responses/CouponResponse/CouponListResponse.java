package com.example.ecommerce.Backend.Responses.CouponResponse;

import lombok.*;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CouponListResponse {
    private List<CouponResponse> couponListResponse;
    private int totalPages;
}
