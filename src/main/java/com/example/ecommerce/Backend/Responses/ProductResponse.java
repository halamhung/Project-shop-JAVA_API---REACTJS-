package com.example.ecommerce.Backend.Responses;

import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Modals.Rate;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse extends BaseResponse{

    private Long productId;
    private String nameProduct;
    private double price;
    private String description; // Đổi tên từ 'describe' thành 'description'
    private String slug;
    private int status;
    private int quantity; // Sửa tên thuộc tính
    private Long category;
    public static ProductResponse fromProduct(Product product) {
        ProductResponse productResponse = ProductResponse.builder()
                .productId(product.getProductId())
                .nameProduct(product.getNameProduct())
                .price(product.getPrice())
                .description(product.getDescription())
                .slug(product.getSlug())
                .status(product.getStatus())
                .quantity(product.getQuantity())
                .category(product.getCategory().getCategoryId())
                .build();
        return productResponse;
    }
}
