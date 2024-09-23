package com.example.ecommerce.Backend.Service;

import com.example.ecommerce.Backend.Dtos.OrderDtos;
import com.example.ecommerce.Backend.IService.IOrderServices;
import com.example.ecommerce.Backend.Modals.Category;
import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Modals.User;
import com.example.ecommerce.Backend.Repositories.OrderRepository;
import com.example.ecommerce.Backend.Repositories.userRepository.UserRepository;
import com.example.ecommerce.Backend.Responses.OrderResponse.OrderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class OrderServices implements IOrderServices {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Override
    public List<Orders> getAllOrder() {
        return orderRepository.findAll();
    }

    @Override
    public Orders postOrder(OrderDtos orderDtos) {
        User user = userRepository.findById(orderDtos.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Orders orders = Orders.builder()
                .consignee(orderDtos.getConsignee())
                .phoneConsignee(orderDtos.getPhoneConsignee())
                .addressConsignee(orderDtos.getAddressConsignee())
                .note(orderDtos.getNote())
                .orderDate(orderDtos.getOrderDate())
                .paymentMethod(orderDtos.getPaymentMethod())
                .status(orderDtos.getStatus())
                .user(user)
                .build();
        orderRepository.save(orders);
        return orders;
    }

    @Override
    public Orders getOrder(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public Orders updateOrder(Long id, OrderDtos orderDtos) {
        Orders orders = getOrder(id);

        orders.setAddressConsignee(orderDtos.getAddressConsignee());
        orders.setConsignee(orderDtos.getConsignee());
        orders.setNote(orderDtos.getNote());
        orders.setOrderDate(orderDtos.getOrderDate());
//        orders.setPaymentMethod(orderDtos.getPaymentMethod());
        orders.setPhoneConsignee(orderDtos.getPhoneConsignee());
//        orders.setStatus(orderDtos.getStatus());
//        orders.setUser(orderDtos.getUserId());

        return orderRepository.save(orders);
    }

    @Override
    public Orders updateStatusOrder(Long id, int status) {

        return null;
    }

    @Override
    public Page<OrderResponse> getAllOrder(Pageable pageable) {
        return orderRepository.findAll(pageable).map(orders -> {
            return OrderResponse.fromOrders(orders);
        });
    }

    @Override
    public List<Orders> search(String consignee, String addressConsignee, int orderDate, String phoneConsignee) {
        return orderRepository.search(consignee,addressConsignee,orderDate,phoneConsignee);
    }

    @Override
    public List<Orders> findByUserId(Long userId) {
        return null;
    }
}
