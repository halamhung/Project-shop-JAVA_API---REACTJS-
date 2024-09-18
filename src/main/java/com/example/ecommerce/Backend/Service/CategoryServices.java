package com.example.ecommerce.Backend.Service;

import com.example.ecommerce.Backend.Dtos.Category.CategoryDTO;
import com.example.ecommerce.Backend.IService.Category.ICategory;
import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Repositories.Category.CategoryRepository;
import lombok.AllArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class CategoryServices implements ICategory {


    private final CategoryRepository categoryRepo;

    //Function to check whethere new Name is exits
    public Category fromten(String ten) {
        List<String> x = getAllCategory().stream().map(Category::getName).collect(To);

        for (Category category : x) {

        }
    }



    @Override
    public List<Category> getAllCategory() {
        return categoryRepo.findAll();
    };

    @Override
    public void deleteCategory(long categoryID) {
         categoryRepo.deleteById(categoryID);
    };

    @Override
    public Category saveCategory(CategoryDTO categorydto) {
        Category category = new Category()
                .builder
                .name(categorydto.getName())
                .build();
        return categoryRepo.save(category);
    };

    @Override
    public Category addCategory(CategoryDTO categoryDTO) {};

}
