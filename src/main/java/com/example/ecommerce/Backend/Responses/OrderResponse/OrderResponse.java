package com.example.ecommerce.Backend.Responses.OrderResponse;

import com.example.ecommerce.Backend.Modals.Orders;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Modals.User;
import com.example.ecommerce.Backend.Responses.BaseResponse;
import com.example.ecommerce.Backend.Responses.productResponse.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse extends BaseResponse {
    private Long orderId;
    private String consignee;
    private String phoneConsignee;
    private String addressConsignee;
    private String note;
    private Date orderDate; // Thay đổi kiểu dữ liệu
    private int paymentMethod;
    private int status;
    private Long user;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    public static OrderResponse fromOrders(Orders orders) {
        OrderResponse orderResponse = OrderResponse.builder()
                .orderId(orders.getOrderId())
                .consignee(orders.getConsignee())
                .phoneConsignee(orders.getPhoneConsignee())
                .addressConsignee(orders.getAddressConsignee())
                .note(orders.getNote())
                .orderDate(orders.getOrderDate())
                .paymentMethod(orders.getPaymentMethod())
                .status(orders.getPaymentMethod())
                .user(orders.getUser().getUserId())
                .createdAt(orders.getCreateAt()) // Lấy giá trị từ product
                .updatedAt(orders.getUpdateAt()) // Lấy giá trị từ product
                .build();
        return orderResponse;
    }
}
