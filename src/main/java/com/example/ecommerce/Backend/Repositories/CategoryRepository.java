package com.example.ecommerce.Backend.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ecommerce.Backend.Modals.Category;
import org.springframework.data.domain.Pageable;

public interface CategoryRepository extends JpaRepository <Category, Long>{

    Category findByName(String name);

    Page<Category> findAll(Pageable pageable);


}
