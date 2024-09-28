package com.example.ecommerce.Backend.Service;

import com.example.ecommerce.Backend.Dtos.ImgDtos;
import com.example.ecommerce.Backend.Dtos.ProductDtos;
import com.example.ecommerce.Backend.IService.IProductServices;
import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Modals.Img;
import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Repositories.CategoryRepository;
import com.example.ecommerce.Backend.Repositories.ImgRepository;
import com.example.ecommerce.Backend.Repositories.ProductRepo;
import com.example.ecommerce.Backend.Responses.OrderResponse.OrderResponse;
import com.example.ecommerce.Backend.Responses.productResponse.ProductResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServices implements IProductServices {

    private final ProductRepo productRepo;
    private final CategoryRepository categoryRepository; //
    private final ImgRepository imgRepository;

    @Override
    public Page<ProductResponse> getAllProduct(Pageable pageable) {
        return productRepo.findAll(pageable).map(product -> {
            return ProductResponse.fromProduct(product);
        });
    }


    @Override
    public Product getProductById(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    @Override
    public Product createProduct(ProductDtos productDtos) {
        Long categoryId = productDtos.getCategoryId();

        // Tìm kiếm Category từ database
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
        Product product = Product.builder()
                .nameProduct(productDtos.getNameproduct())
                .price(productDtos.getPrice())
                .description(productDtos.getDescription())
                .slug(productDtos.getSlug())
                .status(productDtos.getStatus())
                .quantity(productDtos.getQuantity())
                .category(categoryOptional.get()) // Set
                .build();
        return productRepo.save(product);
    }else {
            // Xử lý trường hợp không tìm thấy category, ví dụ:
            throw new IllegalArgumentException("Không tìm thấy danh mục sản phẩm với ID: " + categoryId);
        }
        }

    @Override
    public Product updateProduct(Long id, ProductDtos productDtos) {
        Long categoryId = productDtos.getCategoryId();
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
        Product product = getProductById(id);
        product.setNameProduct(productDtos.getNameproduct());
        product.setPrice(productDtos.getPrice());
        product.setDescription(productDtos.getDescription());
        product.setSlug(productDtos.getSlug());
        product.setStatus(productDtos.getStatus());
        product.setQuantity(productDtos.getQuantity());
        product.setCategory(categoryOptional.get());
        return productRepo.save(product);
    }
        else {
            // Xử lý trường hợp không tìm thấy category, ví dụ:
            throw new IllegalArgumentException("Không tìm thấy danh mục sản phẩm với ID: " + categoryId);
        }
        }

    @Override
    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }




    public Img saveProductImg(Long productId, ImgDtos imgDtos){
        Product product = getProductById(productId);
        Img img = Img.builder()
                .imgUrl(imgDtos.getImgUrl())
                .product(product)
                .user(null)
                .build();
        int size = imgRepository.findByImgId(productId).size();
        if(size >=4){
            throw new InvalidParameterException("Mỗi sinh viên chỉ up tối đa 4 ảnh");
        }
        return imgRepository.save(img);
    }
    @Override
    public List<Img> getAllProductImg(Long productId) {
        return imgRepository.findByImgId(productId);
    }
}
