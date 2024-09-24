package com.example.ecommerce.Backend.Modals;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp; // Thay đổi import

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Rate")
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rateId;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Date commentDate; // Thay đổi kiểu dữ liệu

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productId")
    private Product product; // Thêm thuộc tính product
}