package com.example.ecommerce.Backend.Responses.CategoryResponse;

import com.example.ecommerce.Backend.Responses.BaseResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import com.example.ecommerce.Backend.Modals.Category;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse extends BaseResponse {
    private long id;
    private String name;
    public static CategoryResponse fromCategory(Category category) {
        CategoryResponse categoryResponse = CategoryResponse.builder()
                .id(category.getCategoryId())
                .name(category.getName())
                .build();
        categoryResponse.setCreatedAt(category.getCreateAt());
        categoryResponse.setUpdatedAt(category.getUpdateAt());
        return categoryResponse;
    }
}
