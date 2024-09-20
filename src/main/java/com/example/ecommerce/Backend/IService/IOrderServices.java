package com.example.ecommerce.Backend.IService;

import com.example.ecommerce.Backend.Dtos.OrderDtos;
import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Modals.User;

import java.util.List;

public interface IOrderServices {
    List<Orders> getAllOrder();
    Orders postOrder(OrderDtos orderDtos);

    Orders getOrder(Long id)  ;
    List<Orders> findByUserId(Long userId);
    Orders updateOrder(Long id,OrderDtos orderDtos);
    Orders updateStatusOrder(Long id,int status);
//    void deleteOrder(Long id);

}
