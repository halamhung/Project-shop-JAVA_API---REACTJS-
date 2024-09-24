package com.example.ecommerce.Backend.Modals;

import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Img")
public class Img extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imgId;

    @Column(name = "image_url",length = 300)
    private String imgUrl;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productId", nullable = true)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId", nullable = true)
    private User user;
}