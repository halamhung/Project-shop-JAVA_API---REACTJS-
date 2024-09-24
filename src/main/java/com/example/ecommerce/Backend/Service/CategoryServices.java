package com.example.ecommerce.Backend.Service;

import com.example.ecommerce.Backend.Dtos.CategoryDTO;
import com.example.ecommerce.Backend.IService.ICategory;
import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Repositories.CategoryRepository;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;


import java.util.List;


@Service
@AllArgsConstructor
public class CategoryServices implements ICategory {


    private final CategoryRepository categoryRepo;


    @Override
    public List<Category> getAllCategory() {
        return categoryRepo.findAll();
    }

    @Override
    public Page<CategoryResponse> getAllCategoryByPage(Pageable pageable) {
        return categoryRepo.findAll(pageable).map(category -> {
            return CategoryResponse.fromCategory(category);
        });
    }



    @Override
    public Category getCategorybyId(Long id) {
        return categoryRepo.findById(id).get();
    }

    @Override
    public void deleteCategory(Long categoryID) {
        categoryRepo.deleteById(categoryID);
    }

    @Override
    public Category saveCategory(CategoryDTO categorydto) {
        Category category = Category
                .builder()
                .name(categorydto.getName())
                .build();
        return categoryRepo.save(category);
    }

    @Override
    public Category updateCategory(Long id, CategoryDTO categoryDTO) {
        Category category = getCategorybyId(id);
        category.setName(categoryDTO.getName());
        return categoryRepo.save(category);
    }

    @Override
    public Category addCategory(CategoryDTO categoryDTO) {

        if (categoryRepo.findByName(categoryDTO.getName()) != null) {
            throw new IllegalArgumentException("Category already exists");
        }
        Category category = Category
                .builder()
                .name(categoryDTO.getName())
                .build();
        return categoryRepo.save(category);
    }


}
