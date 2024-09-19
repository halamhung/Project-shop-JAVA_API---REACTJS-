package com.example.ecommerce.Backend.IService;

import com.example.ecommerce.Backend.Dtos.CategoryDTO;
import com.example.ecommerce.Backend.Modals.Category;

import java.util.List;

public interface ICategory {

    List<Category> getAllCategory();
    void deleteCategory(Long categoryId);
    Category saveCategory(CategoryDTO categorydto);
    Category addCategory(CategoryDTO categoryDTO);
    Category updateCategory(Long id, CategoryDTO categoryDTO);
    Category getCategorybyId(Long id);


}
