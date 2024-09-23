package com.example.ecommerce.Backend.Repositories;

import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Modals.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders,Long> {
    Page<Orders> findAll(Pageable pageable);
    @Query("SELECT s FROM Orders s where "+
            "(:consignee is null or s.consignee like %:consignee%) or " +
            "(:addressConsignee is null or s.addressConsignee like %:addressConsignee%) and"+
            "(:orderDate is null or year(s.orderDate) = :orderDate) and " +
            "(:phoneConsignee is null or s.phoneConsignee = :phoneConsignee)"
    )
    List<Orders> search(
            @Param("consignee") String consignee,
            @Param("addressConsignee") String addressConsignee,
            @Param("orderDate") int orderDate,
            @Param("phoneConsignee") String phoneConsignee
    );
}
