package com.example.ecommerce.Backend.Service;

import com.example.ecommerce.Backend.Dtos.ProductDtos;
import com.example.ecommerce.Backend.IService.IProductServices;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Repositories.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServices implements IProductServices {

    private final ProductRepo productRepo;

    @Override
    public List<Product> getAllProduct() {
        return productRepo.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    @Override
    public Product createProduct(ProductDtos productDtos) {
        Product product = Product.builder()
                .nameProduct(productDtos.getNameProduct())
                .price(productDtos.getPrice())
                .description(productDtos.getDescription())
                .slug(productDtos.getSlug())
                .status(productDtos.getStatus())
                .quantity(productDtos.getQuantity())

                .build();
        return productRepo.save(product);
    }

    @Override
    public Product updateProduct(Long id, ProductDtos productDtos) {
        return null;
    }

    @Override
    public void deleteProduct(Long id) {

    }
}
