package com.example.ecommerce.Backend.IService;

import com.example.ecommerce.Backend.Dtos.OrderDetailDTO;
import com.example.ecommerce.Backend.Modals.Orderdetails;

public interface IOrderDetailService {
    Orderdetails createOrderDetail(OrderDetailDTO orderDetailDTO);
    Orderdetails getOrderDetail(Long id);
    Orderdetails updateOrderDetail(Long id,OrderDetailDTO orderDetailDTO);
    void deleteById(Long id) ;
//    List<OrderDetail> findByOrderId(Long orderId);
}
