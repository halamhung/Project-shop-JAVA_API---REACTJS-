package com.example.ecommerce.Backend.IService;

import com.example.ecommerce.Backend.Dtos.CategoryDTO;
import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICategory {

    List<Category> getAllCategory();
    void deleteCategory(Long categoryId);
    Category saveCategory(CategoryDTO categorydto);
    Category addCategory(CategoryDTO categoryDTO);
    Category updateCategory(Long id, CategoryDTO categoryDTO);
    Category getCategorybyId(Long id);

    Page<CategoryResponse> getAllCategoryByPage(Pageable pageable);

}
