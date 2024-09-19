package com.example.ecommerce.Backend.Service;

import com.example.ecommerce.Backend.Dtos.OrderDtos;
import com.example.ecommerce.Backend.IService.IOrderServices;
import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Modals.User;
import com.example.ecommerce.Backend.Repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class OrderServices implements IOrderServices {
    private final OrderRepository orderRepository;

    @Override
    public List<Orders> getAllOrder() {
        return orderRepository.findAll();
    }

    @Override
    public Orders postOrder(OrderDtos orderDtos) {

        Orders orders = Orders.builder()
                .consignee(orderDtos.getConsignee())
                .phoneConsignee(orderDtos.getPhoneConsignee())
                .addressConsignee(orderDtos.getAddressConsignee())
                .note(orderDtos.getNote())
                .orderDate(orderDtos.getOrderDate())
                .paymentMethod(orderDtos.getPaymentMethod())
                .status(orderDtos.getStatus())
//                .user(orderDtos.getU)
                .build();
        return orderRepository.save(orders);
    }
}
