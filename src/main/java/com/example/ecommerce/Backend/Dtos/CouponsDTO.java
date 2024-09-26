package com.example.ecommerce.Backend.Dtos;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CouponsDTO {

    @NotBlank
    @Size(min = 3, max = 50, message = "Tên mã giãm giá từ 3 kí tự đến 15 kí tự")
    private String name;

    private Boolean status;

    @Size(max = 255, message = "Giới hạn 255 kí tự")
    private String description;

    @DecimalMin(value = "0.0", inclusive = false)
    @DecimalMax(value = "100.0", inclusive = true)
    private Double discountPercentage;

    @Future(message = "Expiration date must be in the future")
    @DateTimeFormat(pattern = "YYYY-MM-dd" )
    private LocalDate expirationDate;

}
