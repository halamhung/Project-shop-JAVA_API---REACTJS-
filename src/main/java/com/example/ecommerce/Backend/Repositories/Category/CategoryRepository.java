package com.example.ecommerce.Backend.Repositories.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ecommerce.Backend.Modals.Category;
public interface CategoryRepository extends JpaRepository <Category, Long>{

}
