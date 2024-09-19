package com.example.ecommerce.Backend.IService;

import com.example.ecommerce.Backend.Dtos.ProductDtos;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Responses.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductServices {
    public List<Product> getAllProduct();
    Product getProductById(Long id);
    Product createProduct(ProductDtos productDtos) ;
    Product updateProduct(Long id, ProductDtos productDtos);
    void deleteProduct(Long id);

    Page<ProductResponse> getAllProduct(Pageable pageable);
}
