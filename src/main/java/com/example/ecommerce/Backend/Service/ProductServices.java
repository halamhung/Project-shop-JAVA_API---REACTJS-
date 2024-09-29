package com.example.ecommerce.Backend.Service;

import com.example.ecommerce.Backend.Dtos.ImgDtos;
import com.example.ecommerce.Backend.Dtos.ProductDtos;
import com.example.ecommerce.Backend.Exceptions.ResoureNotFoundException;
import com.example.ecommerce.Backend.IService.IProductServices;
import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Modals.Img;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Repositories.CategoryRepository;
import com.example.ecommerce.Backend.Repositories.ImgRepository;
import com.example.ecommerce.Backend.Repositories.ProductRepo;
import com.example.ecommerce.Backend.Responses.CategoryResponse.CategoryResponse;
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
            ProductResponse response = ProductResponse.fromProduct(product);
            response.setCategory(CategoryResponse.fromCategory(product.getCategory())); // Gán category cho ProductResponse
            return response;
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
                .nameProduct(productDtos.getNameProduct())
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
    public ProductResponse updateProduct(Long id, ProductDtos productDtos) {
        System.out.println("ID sản phẩm cần cập nhật: " + id); // In ra ID
        System.out.println("Dữ liệu sản phẩm: " + productDtos);
        Product existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new ResoureNotFoundException("Product not found with id: " + id));
            existingProduct.setNameProduct(productDtos.getNameProduct());
            existingProduct.setPrice(productDtos.getPrice());
            existingProduct.setDescription(productDtos.getDescription());
            existingProduct.setSlug(productDtos.getSlug());
            existingProduct.setStatus(productDtos.getStatus());
            existingProduct.setQuantity(productDtos.getQuantity());
        if (productDtos.getCategoryId() != null) {
            Optional<Category> categoryOptional = categoryRepository.findById(productDtos.getCategoryId());
            categoryOptional.ifPresent(existingProduct::setCategory);
        }
        Product updatedProduct = productRepo.save(existingProduct);
        return ProductResponse.fromProduct(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new ResoureNotFoundException("Product not found with id: " + id));
        productRepo.delete(product);
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
            throw new InvalidParameterException("Mỗi sản phẩm chỉ up tối đa 4 ảnh");
        }
        return imgRepository.save(img);
    }
    @Override
    public List<Img> getAllProductImg(Long productId) {
        return imgRepository.findByImgId(productId);
    }

    public List<String> getAllImagesForProduct(Long productId) {
        return imgRepository.findAllImagesByProductId(productId);
    }

}
