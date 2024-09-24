package com.example.ecommerce.Backend.Dtos;

import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Modals.User;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImgDtos {

    @Column(name = "image_url",length = 300)
    private String imgUrl;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
    private Long product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Long user;
}
