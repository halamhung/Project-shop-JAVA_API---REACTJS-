package com.example.ecommerce.Backend.Service;

import com.example.ecommerce.Backend.Dtos.OrderDetailDTO;
import com.example.ecommerce.Backend.IService.IOrderDetailService;
import com.example.ecommerce.Backend.Modals.Orderdetails;
import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Repositories.OrderDetailRepository;
import com.example.ecommerce.Backend.Repositories.OrderRepository;
import com.example.ecommerce.Backend.Repositories.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderDetailServices implements IOrderDetailService {
    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;
    private final ProductRepo productRepo;
    @Override
    public Orderdetails createOrderDetail(OrderDetailDTO orderDetailDTO) {
        Orders orders = orderRepository.findById(orderDetailDTO.getOrders()).orElseThrow(() -> new RuntimeException("Order not found"));
        Product product = productRepo.findById(orderDetailDTO.getProduct()).orElseThrow(() -> new RuntimeException("Product not found"));
        Orderdetails orderdetails = Orderdetails.builder()
                .orders(orders)
                .product(product)
                .quantityBuy(orderDetailDTO.getQuantityBuy())
                .price(orderDetailDTO.getPrice())
                .totalPrice(orderDetailDTO.getTotalPrice())
                .build();
        return orderDetailRepository.save(orderdetails);
    }

    @Override
    public Orderdetails getOrderDetail(Long id) {
        return orderDetailRepository.findById(id).orElse(null);
    }

    @Override
    public Orderdetails updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) {
        Orderdetails orderdetails = getOrderDetail(id);
        orderdetails.setQuantityBuy(orderDetailDTO.getQuantityBuy());
        orderdetails.setPrice(orderDetailDTO.getPrice());
        orderdetails.setTotalPrice(orderDetailDTO.getTotalPrice());

        return orderDetailRepository.save(orderdetails);
    }

    @Override
    public void deleteById(Long id) {
        orderDetailRepository.deleteById(id);
    }
}
