package com.example.ecommerce.Backend.Controller;

import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Service.OrderServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/")
public class OrderController {
    private final OrderServices orderServices;
    @GetMapping("")
    public ResponseEntity<ApiResponse> getAllOrder(){
        ApiResponse apiResponse = ApiResponse.builder()
                .data(orderServices.getAllOrder())
                .status(HttpStatus.OK.value())
                .message("okela")
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }
}
