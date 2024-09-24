package com.example.ecommerce.Backend.Repositories.userRepository;

import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.ecommerce.Backend.Modals.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByUsername(String userName);
    boolean existsByName(String name);
    Page<User> findAll(Pageable pageable);
}