package com.example.ecommerce.Backend.Repositories;

import com.example.ecommerce.Backend.Modals.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {

}
