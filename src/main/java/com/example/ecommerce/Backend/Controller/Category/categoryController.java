package com.example.ecommerce.Backend.Controller.Category;


import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryResponse;
import com.example.ecommerce.Backend.Service.Category.CategoryServices;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@CrossOrigin
public class categoryController {


    private final CategoryServices categoryServices;

    @GetMapping("/líst")
    public ResponseEntity<ApiResponse> index (@RequestMapping(defaultValue = "0")int page, @RequestParam(defaultValue = "2") int size) {

        Pageable pageable  = PageRequest.of (
                page, size,
                Sort.by("created_at")
        );

        Page<CategoryResponse> categoryResponses = categoryServices.getAllCategoryByPage(pageable);
        int totalPage  = categoryResponses.getTotalPages();

        ApiResponse apiResponse = ApiResponse.builder()
                .data()

                .build();



    }
   

}
