package com.example.ecommerce.Backend.Responses.productResponse;

import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Responses.BaseResponse;
import lombok.*;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse extends BaseResponse {

    private Long productId;
    private String nameProduct;
    private double price;
    private String description; // Đổi tên từ 'describe' thành 'description'
    private String slug;
    private int status;
    private int quantity; // Sửa tên thuộc tính
    private Long category;
    private LocalDate createdAt;
    private LocalDate updatedAt;
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
                .createdAt(product.getCreateAt()) // Lấy giá trị từ product
                .updatedAt(product.getUpdateAt()) // Lấy giá trị từ product
                .build();
        return productResponse;
    }
}
