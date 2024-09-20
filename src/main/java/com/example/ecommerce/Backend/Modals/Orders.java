package com.example.ecommerce.Backend.Modals;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.sql.Date;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
@Builder
public class Orders extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @NotBlank(message = "Tên người nhận không được để trống")
    private String consignee;

    @Size(min = 10, max = 10, message = "Số điện thoại bắt buộc 10 chữ số")
//    @Pattern(regexp = "^(0[35789]|84[35789])[0-9]{8}$", message = "Số điện thoại không hợp lệ.")
    private String phoneConsignee;

    @NotBlank(message = "Địa chỉ không được để trống")
    private String addressConsignee;

    private String note;

    private Date orderDate; // Thay đổi kiểu dữ liệu

    private int paymentMethod;

    private int status;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

//    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Orderdetails> orderDetails;

}