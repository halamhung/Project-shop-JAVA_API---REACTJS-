package com.example.ecommerce.Backend.IService;

import com.example.ecommerce.Backend.Dtos.OrderDtos;
import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Modals.User;
import com.example.ecommerce.Backend.Responses.OrderResponse.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderServices {
    List<Orders> getAllOrder();
    Orders postOrder(OrderDtos orderDtos);

    Orders getOrder(Long id)  ;
    List<Orders> findByUserId(Long userId);
    Orders updateOrder(Long id,OrderDtos orderDtos);
    Orders updateStatusOrder(Long id,int status);
    Page<OrderResponse> getAllOrder(Pageable pageable);
    List<Orders> search(String consignee,String addressConsignee, int orderDate,String phoneConsignee);
//    void deleteOrder(Long id);

}
