package com.example.ecommerce.Backend.IService;

import com.example.ecommerce.Backend.Dtos.ImgDtos;
import com.example.ecommerce.Backend.Dtos.ProductDtos;
import com.example.ecommerce.Backend.Modals.Img;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Responses.productResponse.ProductResponse;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface IImgServices {

    List<Img> getAllImg();
    Img getImgById(Long id);
    Img createImg(ImgDtos imgDtos);
    Img updateImg(Long id,ImgDtos imgDtos);
    void deleteImg(Long id);

}
