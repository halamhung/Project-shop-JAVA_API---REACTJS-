package com.example.ecommerce.Backend.IService.iUserService;

import com.example.ecommerce.Backend.Modals.Rate;

public interface IRateServices {
    Rate leaveComment(Long userId, Long productId, String content) throws Exception;
}
