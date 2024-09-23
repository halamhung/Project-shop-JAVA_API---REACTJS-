package com.example.ecommerce.Backend.Repositories;

import com.example.ecommerce.Backend.Modals.Img;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImgRepository extends JpaRepository<Img,Long> {
    List<Img> findByImgId(Long id);
}
