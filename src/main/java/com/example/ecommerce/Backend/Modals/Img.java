package com.example.ecommerce.Backend.Modals;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Img")
public class Img {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imgId;

    private String imgUrl;
    private String imgName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
}