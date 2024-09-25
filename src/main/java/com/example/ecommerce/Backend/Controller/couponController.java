package com.example.ecommerce.Backend.Controller;


import com.example.ecommerce.Backend.Dtos.CouponsDTO;
import com.example.ecommerce.Backend.Exceptions.ResoureNotFoundException;
import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Modals.Coupon;
import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryListResponse;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryResponse;
import com.example.ecommerce.Backend.Responses.CouponResponse.CouponListResponse;
import com.example.ecommerce.Backend.Responses.CouponResponse.CouponResponse;
import com.example.ecommerce.Backend.Service.CouponServices;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coupoun")
@RequiredArgsConstructor
@CrossOrigin
public class couponController {


    private final CouponServices couponServices;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse> getAllCoupons() {
        ApiResponse apiResponse = ApiResponse.builder()
                .data(couponServices.getAllCoupons())
                .status(HttpStatus.OK.value())
                .message("Success")
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/list-page")
    public ResponseEntity<ApiResponse> getCouponsPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "2") int size) {

        Pageable pageable = PageRequest.of(
                page, size,
                Sort.by("created_at")
        );

        Page<CouponResponse> couponResponses = couponServices.getAllCouponsByPage(pageable);
        int totalPages = couponResponses.getTotalPages();

        List<CouponResponse> couponResponsesList =  couponResponses.getContent();

        CouponListResponse couponListResponse = CouponListResponse
                .builder()
                .couponListResponse(couponResponsesList)
                .totalPages(totalPages)
                .build();

        ApiResponse apiResponse = ApiResponse.builder()
                .data(couponListResponse)
                .message("Get Success")
                .status(HttpStatus.OK.value())
                .build();
//
        return ResponseEntity.ok(apiResponse);

    }

    @PostMapping("/add-coupon")
    public ResponseEntity<ApiResponse> postCoupons(@Valid @RequestBody CouponsDTO coupondto, BindingResult result) {

        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).toList();

            ApiResponse apiResponse = ApiResponse.builder()
                    .data(errors)
                    .message("Validation Failed")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
            return ResponseEntity.badRequest().body(apiResponse);
        }

            Coupon coupon = couponServices.addCoupon(coupondto);
            ApiResponse apiResponse = ApiResponse.builder()
                    .message("Success")
                    .status(HttpStatus.OK.value())
                    .data(coupon)
                    .build();
            return ResponseEntity.ok(apiResponse);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteCoupon(@PathVariable Long  id) {

        Coupon coupon = couponServices.getCouponById(id);
        if (coupon == null) {
            throw new ResoureNotFoundException("Coupon not found" + id);
        }

        couponServices.deleteCoupon(coupon.getId());

        ApiResponse apiResponse = ApiResponse.builder()
                .data(id)
                .message("Success")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> updateCoupon(@PathVariable Long id, @Valid @RequestBody CouponsDTO coupondto, BindingResult result) {

        Coupon coupon = couponServices.getCouponById(id);
        if (coupon == null) {
            throw new ResoureNotFoundException("Coupon not found" + id);
        }

        coupon =  couponServices.updateCoupon(id,coupondto);

        ApiResponse apiResponse = ApiResponse.builder()
                .data(coupon)
                .message("Success")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

}
