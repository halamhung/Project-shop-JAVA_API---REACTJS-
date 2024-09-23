package com.example.ecommerce.Backend.Controller;

import com.example.ecommerce.Backend.Dtos.OrderDtos;
import com.example.ecommerce.Backend.Exceptions.ResoureNotFoundException;
import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Responses.OrderResponse.OrderListResponse;
import com.example.ecommerce.Backend.Responses.OrderResponse.OrderResponse;
import com.example.ecommerce.Backend.Service.OrderServices;
import jakarta.validation.Valid;
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
@RequestMapping("/order")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/")
public class OrderController {
    private final OrderServices orderServices;
    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAllOrder(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ){
        Pageable pageable = PageRequest.of(
                page, size, Sort.by("createAt").descending()
        );
        Page<OrderResponse> orderResponses = orderServices.getAllOrder(pageable);
        int totalPages =  orderResponses.getTotalPages();
        List<OrderResponse> responseList = orderResponses.getContent();
        OrderListResponse orderListResponse = OrderListResponse.builder()
                .orderResponses(responseList)
                .totalPages(totalPages)
                .build();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Show students Successfully")
                .data(orderListResponse)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @PostMapping("/")
    public ResponseEntity<ApiResponse> createOrder(@Valid @RequestBody OrderDtos orderDtos, BindingResult result){
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
                .data(orderDtos)
                .message("Add order success")
                .status(HttpStatus.OK.value())
                .build();
        orderServices.postOrder(orderDtos);
        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateOrder(@Valid @PathVariable Long id, @RequestBody OrderDtos orderDtos,BindingResult result){
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
        Orders orders = orderServices.updateOrder(id,orderDtos);
        if(orders == null){
            throw new ResoureNotFoundException("Student khong tim thay vs id: "+id);
        }
        Orders o2 = orderServices.getOrder(id);
        ApiResponse apiResponse = ApiResponse.builder()
                .data(o2)
                .message("Update order success")
                .status(HttpStatus.OK.value())
                .build();

        return ResponseEntity.ok(apiResponse);
    }

}
