package com.example.ecommerce.Backend.Responses.productResponse;
import lombok.*;

import java.util.List;

@Builder
@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductListResponse {
    private List<ProductResponse> productResponses;
    private int totalPages;
}
