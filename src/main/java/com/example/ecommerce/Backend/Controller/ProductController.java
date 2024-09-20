package com.example.ecommerce.Backend.Controller;

import com.example.ecommerce.Backend.Dtos.ProductDtos;
import com.example.ecommerce.Backend.Exceptions.ResoureNotFoundException;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Responses.productResponse.ProductListResponse;
import com.example.ecommerce.Backend.Responses.productResponse.ProductResponse;
import com.example.ecommerce.Backend.Service.ProductServices;
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
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServices productServices;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProduct(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ){
        Pageable pageable = PageRequest.of(
                page, size, Sort.by("productId").descending()
        );
        Page<ProductResponse> productResponses = productServices.getAllProduct(pageable);
        int totalPages =  productResponses.getTotalPages();
        List<ProductResponse> responseList = productResponses.getContent();
        ProductListResponse productListResponse = ProductListResponse.builder()
                .productResponses(responseList)
                .totalPages(totalPages)
                .build();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Show products Successfully")
                .data(productListResponse)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createProduct(@Valid @RequestBody ProductDtos pro , BindingResult result){
        if(result.hasErrors()){
            List<String> error = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).toList();
            ApiResponse apiResponse = ApiResponse.builder()
                    .data(error)
                    .message("Validation Error")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
            return ResponseEntity.badRequest().body(apiResponse);
        }
        ApiResponse apiResponse = ApiResponse.builder()
                .data(pro)
                .message("Add product Successfully")
                .status(HttpStatus.OK.value())
                .build();
        productServices.createProduct(pro);
        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProduct(@Valid @PathVariable Long id ,@RequestBody ProductDtos productDtos, BindingResult result ){
        if(result.hasErrors()){
            List<String> errors = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).toList();
            ApiResponse apiResponse = ApiResponse.builder()
                    .data(errors)
                    .message("Validation Error")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
            return ResponseEntity.ok(apiResponse);
        }
        Product product = productServices.updateProduct(id,productDtos);
        if(product == null){
            throw new ResoureNotFoundException("Product not found by id"+id);
        }
        ApiResponse apiResponse = ApiResponse.builder()
                .data(product)
                .message("Update product Successfully")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

}
