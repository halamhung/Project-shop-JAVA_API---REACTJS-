package com.example.ecommerce.Backend.Responses.OrderResponse;

import com.example.ecommerce.Backend.Responses.productResponse.ProductResponse;
import lombok.*;

import java.util.List;
@Builder
@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderListResponse {
    private List<OrderResponse> orderResponses;
    private int totalPages;
}
