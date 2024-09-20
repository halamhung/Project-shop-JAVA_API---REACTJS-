package com.example.ecommerce.Backend.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDtos {
    @NotBlank(message = "Tên người nhận không được để trống")
    private String consignee;

    @Size(min = 10, max = 10, message = "Số điện thoại bắt buộc 10 chữ số")
//    @Pattern(regexp = "^(0[35789]|84[35789])[0-9]{8}$", message = "Số điện thoại không hợp lệ.")
    private String phoneConsignee;

    @NotBlank(message = "Địa chỉ không được để trống")
    private String addressConsignee;

    private String note;


    private Date orderDate; // Thay đổi kiểu dữ liệu

    private int paymentMethod;

    private int status;

    @JsonProperty("userId")
    private Long userId;
}
