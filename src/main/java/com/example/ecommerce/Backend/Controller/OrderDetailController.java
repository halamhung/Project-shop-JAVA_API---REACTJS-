package com.example.ecommerce.Backend.Controller;

import com.example.ecommerce.Backend.Dtos.OrderDetailDTO;
import com.example.ecommerce.Backend.Dtos.OrderDtos;
import com.example.ecommerce.Backend.Exceptions.ResoureNotFoundException;
import com.example.ecommerce.Backend.Modals.Orderdetails;
import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Service.OrderDetailServices;
import com.example.ecommerce.Backend.Service.OrderServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-detail")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/")
public class OrderDetailController {

    private final OrderDetailServices orderDetailServices;
    @PostMapping("/")
    public ResponseEntity<ApiResponse> createOrder(@Valid @RequestBody OrderDetailDTO orderDetailDTO, BindingResult result){
        if(result.hasErrors()){
            List<String> errors = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).toList();
            ApiResponse apiResponse = ApiResponse.builder()
                    .data(errors)
                    .message("Validation failed")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
            return ResponseEntity.badRequest().body(apiResponse);
        }
        ApiResponse apiResponse = ApiResponse.builder()
                .data(orderDetailDTO)
                .message("Add order success")
                .status(HttpStatus.OK.value())
                .build();
        orderDetailServices.createOrderDetail(orderDetailDTO);
        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateOrder(@Valid @PathVariable Long id, @RequestBody OrderDetailDTO orderDetailDTO,BindingResult result){
        if(result.hasErrors()){
            List<String> errors = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).toList();
            ApiResponse apiResponse = ApiResponse.builder()
                    .data(errors)
                    .message("Validation failed")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
            return ResponseEntity.badRequest().body(apiResponse);
        }
        Orderdetails orderdetails = orderDetailServices.updateOrderDetail(id,orderDetailDTO);
        if(orderdetails == null){
            throw new ResoureNotFoundException("Student khong tim thay vs id: "+id);
        }

        ApiResponse apiResponse = ApiResponse.builder()
                .data(orderdetails)
                .message("Update order success")
                .status(HttpStatus.OK.value())
                .build();

        return ResponseEntity.ok(apiResponse);
    }
}
