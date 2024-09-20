package com.example.ecommerce.Backend.Responses.CategoryResponse;


import com.example.ecommerce.Backend.Modals.Category;
import lombok.*;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter

public class CategoryListResponse {

    private List<CategoryResponse> categoryResponseList;
    private int totalPages;

}
