package com.example.ecommerce.Backend.IService;

import com.example.ecommerce.Backend.Dtos.ProductDtos;
import com.example.ecommerce.Backend.Modals.Product;

import java.util.List;

public interface IProductServices {
    public List<Product> getAllProduct();
    Product getProductById(Long id);
    Product createProduct(ProductDtos productDtos) ;
    Product updateProduct(Long id, ProductDtos productDtos);
    void deleteProduct(Long id);
}
