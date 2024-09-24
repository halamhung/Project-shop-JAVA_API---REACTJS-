package com.example.ecommerce.Backend.Repositories.userRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.Backend.Modals.Rate;

public interface RateRepository extends JpaRepository<Rate, Integer>{

}

