package com.example.ecommerce.Backend.Repositories;

import com.example.ecommerce.Backend.Modals.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    Page<Product> findAll(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE " +
            "(:nameProduct is null OR p.nameProduct LIKE %:nameProduct%) AND " +
            "(:price is null OR p.price = :price) AND " +
            "(:description is null OR p.description LIKE %:description%)"
    )
    List<Product> search(
            @Param("nameProduct") String nameProduct,
            @Param("price") Double price,
            @Param("description") String description
    );

    @Query("SELECT p FROM Product p WHERE p.category.categoryId = :categoryId")
    List<Product> findByCategoryId(@Param("categoryId") Long categoryId);


}