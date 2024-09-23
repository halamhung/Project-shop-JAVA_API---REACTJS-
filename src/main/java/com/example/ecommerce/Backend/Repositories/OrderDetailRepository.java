package com.example.ecommerce.Backend.Repositories;

import com.example.ecommerce.Backend.Modals.Orderdetails;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface OrderDetailRepository extends JpaRepository<Orderdetails, Long> {

}
