package com.example.ecommerce.Backend.Controller.UserController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.Backend.Modals.Rate;
import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Service.userService.RateService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/rates")
@RequiredArgsConstructor
public class RateController {
    private final RateService rateService;

    @PostMapping("/comment")
    public ResponseEntity<ApiResponse> leaveComment(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam String content) {
        try {
            Rate newRate = rateService.leaveComment(userId, productId, content);
            ApiResponse response = ApiResponse.builder()
                    .message("Comment added successfully")
                    .status(200)
                    .data(newRate)
                    .build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = ApiResponse.builder()
                    .message(e.getMessage())
                    .status(400)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
