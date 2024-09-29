package com.example.ecommerce.Backend.Controller;


import com.example.ecommerce.Backend.Dtos.CategoryDTO;
import com.example.ecommerce.Backend.Dtos.ProductDtos;
import com.example.ecommerce.Backend.Exceptions.ResoureNotFoundException;
import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryListResponse;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryResponse;
import com.example.ecommerce.Backend.Responses.productResponse.ProductResponse;
import com.example.ecommerce.Backend.Service.CategoryServices;
import com.example.ecommerce.Backend.Service.ProductServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/category")
@RequiredArgsConstructor
@CrossOrigin
public class categoryController {


    private final CategoryServices categoryServices;
    private final ProductServices productServices;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse> index(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {

        Pageable pageable = PageRequest.of(
                page, size,
                Sort.by("createAt").ascending()
        );

        Page<CategoryResponse> categoryResponses = categoryServices.getAllCategoryByPage(pageable);
        int totalPages = categoryResponses.getTotalPages();

        List<CategoryResponse> categoryResponseList = categoryResponses.getContent();
        CategoryListResponse categoryListResponse = CategoryListResponse
                .builder()
                .categoryResponseList(categoryResponseList)
                .totalPages(totalPages)
                .build();

        ApiResponse apiResponse = ApiResponse.builder()
                .data(categoryListResponse)
                .message("Get Success")
                .status(HttpStatus.OK.value())
                .build();
//
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/categories") // Endpoint mới để lấy danh sách category
    public ResponseEntity<ApiResponse> getAllCategories() {
        List<Category> categories = categoryServices.getAllCategory(); // Lấy danh sách category từ service
        ApiResponse apiResponse = ApiResponse.builder()
                .data(categories)
                .message("Get all categories successfully")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/add-category")
    public ResponseEntity<ApiResponse> add(@Valid @RequestBody CategoryDTO categorydto, BindingResult result) {

        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).toList();

            ApiResponse apiResponse = ApiResponse.builder()
                    .data(errors)
                        .message("Validation Failed")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
            return ResponseEntity.badRequest().body(apiResponse);
        }

        Category category = categoryServices.addCategory(categorydto);
        ApiResponse apiResponse = ApiResponse.builder()
                .data(category)
                .status(HttpStatus.OK.value())
                .message("OK")
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/delete-category/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {

        Category category = categoryServices.getCategorybyId(id);
        if (category == null) {
            throw new ResoureNotFoundException("Category  not found" + id);
        }

        categoryServices.deleteCategory(id);
        ApiResponse apiResponse = ApiResponse.builder()
                .data(id)
                .status(HttpStatus.OK.value())
                .message("Deleted Successfull")
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable Long id, @RequestBody @Valid ProductDtos productDtos, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).toList();
            ApiResponse apiResponse = ApiResponse.builder()
                    .data(errors)
                    .message("Validation Error")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
            return ResponseEntity.ok(apiResponse);
        }

        // Log dữ liệu trước khi xử lý
        System.out.println("Category ID from DTO: " + productDtos.getCategoryId());
        ProductResponse product = productServices.updateProduct(id, productDtos);

        if (product == null) {
            throw new ResoureNotFoundException("Product not found by id " + id);
        }
        ApiResponse apiResponse = ApiResponse.builder()
                .data(product)
                .message("Update product Successfully")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

}
