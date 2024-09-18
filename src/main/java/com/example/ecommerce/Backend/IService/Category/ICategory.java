package com.example.ecommerce.Backend.IService.Category;

import com.example.ecommerce.Backend.Dtos.Category.CategoryDTO;
import com.example.ecommerce.Backend.Modals.Category;

import java.util.List;

public interface ICategory {

    List<Category> getAllCategory();
    void deleteCategory(long categoryId);
    Category saveCategory(CategoryDTO categorydto);
    Category addCategory(CategoryDTO categoryDTO);




}
