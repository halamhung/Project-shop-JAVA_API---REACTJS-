package com.example.ecommerce.Backend.Repositories;

import com.example.ecommerce.Backend.Modals.Img;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImgRepository extends JpaRepository<Img,Long> {
    List<Img> findByImgId(Long id);

    @Query("select i.imgUrl  from Img i where i.product.productId = :productId")
    List<String> findAllImagesByProductId(@Param("productId") Long productId);

}
