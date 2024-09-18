package com.example.ecommerce.Backend.Repositories.userRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.Backend.Modals.User;

public interface UserRepository extends JpaRepository<User, Long>{
    List<User> findByUserName(String userName);
    
}