package com.example.ecommerce.Backend.Controller.Category;


import com.example.ecommerce.Backend.Dtos.CategoryDTO;
import com.example.ecommerce.Backend.Exceptions.ResoureNotFoundException;
import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryListResponse;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryResponse;
import com.example.ecommerce.Backend.Service.CategoryServices;
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
@RequestMapping("/category")
@RequiredArgsConstructor
@CrossOrigin
public class categoryController {


    private final CategoryServices categoryServices;

    @GetMapping("/líst")
    public ResponseEntity<ApiResponse> index (@RequestParam(defaultValue = "0")int page, @RequestParam(defaultValue = "2") int size) {

        Pageable pageable  = PageRequest.of (
                page, size,
                Sort.by("created_at")
        );

        Page<CategoryResponse> categoryResponses = categoryServices.getAllCategoryByPage(pageable);
        int totalPages  = categoryResponses.getTotalPages();

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
        return  ResponseEntity.ok(apiResponse);
    }


    @PostMapping("/add-category")
    public ResponseEntity<ApiResponse> add (@Valid @RequestBody CategoryDTO categorydto, BindingResult result) {

        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).toList();

            ApiResponse apiResponse = ApiResponse.builder()
                    .data(errors)
                    .message("Validation Failed")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
            return  ResponseEntity.badRequest().body(apiResponse);
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
    public ResponseEntity<ApiResponse> delete (@PathVariable Long id) {

        Category category = categoryServices.getCategorybyId(id);
        if (category == null) {
            throw new ResoureNotFoundException("Student not found" + id);
        }

        categoryServices.deleteCategory(id);
        ApiResponse apiResponse = ApiResponse.builder()
                .data(id)
                .status(HttpStatus.OK.value())
                .message("Deleted Successfull")
                .build();
        return ResponseEntity.ok(apiResponse);

    }



}
