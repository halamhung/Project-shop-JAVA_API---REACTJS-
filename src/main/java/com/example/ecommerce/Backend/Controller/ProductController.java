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
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;


@RestController
@RequestMapping("/api/users/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServices productServices;

    @GetMapping("")
    public ResponseEntity<ApiResponse> getAllProduct(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(
                page, size, Sort.by("createAt").descending()
        );
        Page<ProductResponse> productResponses = productServices.getAllProduct(pageable);
        int totalPages = productResponses.getTotalPages();
        List<ProductResponse> responseList = productResponses.getContent();

        // Tạo một đối tượng để chứa dữ liệu phân trang
        Map<String, Object> pageData = new HashMap<>();
        pageData.put("productResponses", responseList);
        pageData.put("currentPage", page); //  lấy số trang hiện tại
        pageData.put("totalPages", totalPages);

        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Show products Successfully")
                .data(pageData) // Trả về dữ liệu phân trang
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
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable Long id, @RequestBody @Valid ProductDtos productDtos, BindingResult result){
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
        ProductResponse product = productServices.updateProduct(id, productDtos);
        Long categoryId = productDtos.getCategoryId();
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

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProduct(@PathVariable Long id){
       Product product = productServices.getProductById(id);
       if (product == null) {
           throw new ResoureNotFoundException("product not found by id"+id);
       }
       ApiResponse apiResponse = ApiResponse.builder()
               .data(product)
               .message("Get Successfully")
               .status(HttpStatus.OK.value())
               .build();
       return ResponseEntity.ok(apiResponse);
    }


    @PostMapping(value = "/PostImgUser/{id}")
    public ResponseEntity<ApiResponse> upLoadImgProduct(@PathVariable Long id, @RequestParam("files")List<MultipartFile> files) throws IOException
    {

        if (files == null || files.isEmpty()) {
            throw new IllegalArgumentException("Files are not present");
        }
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
    @GetMapping("/getAllImages/{id}")
    public ResponseEntity<?> getALLImageStudents(@PathVariable Long id) {
        List<String> imageNames =  productServices.getAllImagesForProduct(id);

        if (imageNames.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(HttpStatus.NOT_FOUND.value(), "No images found for this product", null));
        }
        String firstImageName = imageNames.get(0);

        try {
            java.nio.file.Path imagePath = Paths.get("upload/" + firstImageName);
            UrlResource resource = new UrlResource(imagePath.toUri());

            // Check if the image file exists
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Adjust if images are not JPEG
                        .body(resource);
            } else {
                // If the image doesn't exist, return a "not found" image
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new UrlResource(Paths.get("uploads/notfound.jpg").toUri()));
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving image");
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse> getProductsByCategory(@PathVariable Long categoryId) {
        List<Product> products = productServices.getProductsByCategory(categoryId);
        ApiResponse apiResponse = ApiResponse.builder()
                .data(products)
                .message("Get Successfully")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}

