package com.example.ecommerce.Backend.Dtos;

import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Modals.Product;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
    @JsonProperty("productId")
    private Long product;

    @JsonProperty("orderId")
    private Long orders;

    private int quantityBuy;
    private double price;
    private double totalPrice;
}
