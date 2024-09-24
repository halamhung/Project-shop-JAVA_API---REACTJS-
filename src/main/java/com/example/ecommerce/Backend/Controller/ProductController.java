package com.example.ecommerce.Backend.Controller;

import com.example.ecommerce.Backend.Dtos.ImgDtos;
import com.example.ecommerce.Backend.Dtos.ProductDtos;
import com.example.ecommerce.Backend.Exceptions.ResoureNotFoundException;
import com.example.ecommerce.Backend.Modals.Img;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Responses.ApiResponse;
import com.example.ecommerce.Backend.Responses.productResponse.ProductListResponse;
import com.example.ecommerce.Backend.Responses.productResponse.ProductResponse;
import com.example.ecommerce.Backend.Service.ProductServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServices productServices;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProduct(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ){
        Pageable pageable = PageRequest.of(
                page, size, Sort.by("productId").descending()
        );
        Page<ProductResponse> productResponses = productServices.getAllProduct(pageable);
        int totalPages =  productResponses.getTotalPages();
        List<ProductResponse> responseList = productResponses.getContent();
        ProductListResponse productListResponse = ProductListResponse.builder()
                .productResponses(responseList)
                .totalPages(totalPages)
                .build();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Show products Successfully")
                .data(productListResponse)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createProduct(@Valid @RequestBody ProductDtos pro , BindingResult result){
        if(result.hasErrors()){
            List<String> error = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).toList();
            ApiResponse apiResponse = ApiResponse.builder()
                    .data(error)
                    .message("Validation Error")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
            return ResponseEntity.badRequest().body(apiResponse);
        }
        ApiResponse apiResponse = ApiResponse.builder()
                .data(pro)
                .message("Add product Successfully")
                .status(HttpStatus.OK.value())
                .build();
        productServices.createProduct(pro);
        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProduct(@Valid @PathVariable Long id ,@RequestBody ProductDtos productDtos, BindingResult result ){
        if(result.hasErrors()){
            List<String> errors = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).toList();
            ApiResponse apiResponse = ApiResponse.builder()
                    .data(errors)
                    .message("Validation Error")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
            return ResponseEntity.ok(apiResponse);
        }
        Product product = productServices.updateProduct(id,productDtos);
        if(product == null){
            throw new ResoureNotFoundException("Product not found by id"+id);
        }
        ApiResponse apiResponse = ApiResponse.builder()
                .data(product)
                .message("Update product Successfully")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long id){
        Product product = productServices.getProductById(id);
        if(product ==  null){
            throw new ResoureNotFoundException("product not found by id"+id);
        }
        productServices.deleteProduct(id);
        ApiResponse apiResponse = ApiResponse.builder()
                .message("delete successfully")
                .data(id)
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/getAllImage/{id}")
    public ResponseEntity<ApiResponse> getAllImage(@PathVariable Long id){
        ApiResponse apiResponse = ApiResponse.builder()
                .data(productServices.getAllProductImg(id))
                .message("GEt Successfully")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }


    @PostMapping(value = "/PostImgUser/{id}")
    public ResponseEntity<ApiResponse> upLoadImgProduct(@PathVariable Long id, @ModelAttribute("files")List<MultipartFile> files) throws IOException
    {
        List<Img> productImgs = new ArrayList<>();
        int count = 0 ;
        for(MultipartFile file : files){
            if(file != null){
                if(file.getSize() == 0){
                    count ++;
                    continue;
                }
                String fileName = storeFile(file);
                ImgDtos imgDtos = ImgDtos.builder()
                        .imgUrl(fileName)
                        .build();
                Img img = productServices.saveProductImg(id,imgDtos);
                productImgs.add(img);
            }
    }
        if(count==1){
            throw new IllegalArgumentException("Chưa chọn file");
        }

        ApiResponse apiResponse = ApiResponse.builder()
                .data(productImgs)
                .message("Upload Successfully")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    private String storeFile(MultipartFile file) throws IOException
    {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uniqueFileName = UUID.randomUUID().toString()+"_"+fileName;
        java.nio.file.Path uploadDir = Paths.get("upload");
        if(!Files.exists(uploadDir)){
            Files.createDirectories(uploadDir);
        }
        java.nio.file.Path destination = Paths.get(uploadDir.toString(),uniqueFileName);
        Files.copy(file.getInputStream(),destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFileName;
    }
}

