package com.example.ecommerce.Backend.Repositories;

import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Modals.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders,Long> {

}
