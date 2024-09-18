package com.example.ecommerce.Backend.Controller.Category;


import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Service.Category.CategoryServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class categoryController {

    private final CategoryServices categoryServices;


    @GetMapping("/categories")
    public ResponseEntity<ApiResponse> index(@RequestMapping(defaultValue = "0"), int )


}
