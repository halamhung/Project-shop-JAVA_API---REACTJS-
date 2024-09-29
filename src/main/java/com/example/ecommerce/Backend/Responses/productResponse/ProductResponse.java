package com.example.ecommerce.Backend.Responses.productResponse;

import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Responses.BaseResponse;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse extends BaseResponse {
    private Long productId;
    private String nameProduct;
    private double price;
    private String description;
    private String slug;
    private int status;
    private int quantity;
    private Long categoryId; // Assuming you want the category ID
    private CategoryResponse category; // Thêm trường category
    private LocalDate createdAt;
    private LocalDate updatedAt;

    public static ProductResponse fromProduct(Product product) {
        return ProductResponse.builder()
                .productId(product.getProductId())
                .nameProduct(product.getNameProduct())
                .price(product.getPrice())
                .description(product.getDescription())
                .status(product.getStatus())
                .quantity(product.getQuantity())
                .categoryId(product.getCategory().getCategoryId()) // Assuming 'category' is an object
                .createdAt(product.getCreateAt())
                .updatedAt(product.getUpdateAt())
                .build();
    }
}