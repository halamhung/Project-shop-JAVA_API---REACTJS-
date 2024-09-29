package com.example.ecommerce.Backend.Dtos;

import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Modals.Rate;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDtos {

    @NotBlank(message = "Tên sản phẩm không được để trống.")
    private String nameProduct;

    @Min(0) // Thêm ràng buộc cho price
    private double price;

    @NotBlank(message = "Mô tả sản phẩm không được để trống.")
    private String description; // Đổi tên từ 'describe' thành 'description'

    @NotNull(message = "Trạng thái không được để trống.")
    private int status;

    @Min(0) // Thêm ràng buộc cho quantity
    private int quantity; // Sửa tên thuộc tính

    private Long categoryId; // Đảm bảo kiểu dữ liệu là Long

}
