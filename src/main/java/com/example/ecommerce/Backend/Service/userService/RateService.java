package com.example.ecommerce.Backend.Service.userService;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.example.ecommerce.Backend.Exceptions.DataNotFoundException;
import com.example.ecommerce.Backend.IService.iUserService.IRateServices;
import com.example.ecommerce.Backend.Modals.Product;
import com.example.ecommerce.Backend.Modals.Rate;
import com.example.ecommerce.Backend.Modals.User;
import com.example.ecommerce.Backend.Repositories.ProductRepo;
import com.example.ecommerce.Backend.Repositories.userRepository.RateRepository;
import com.example.ecommerce.Backend.Repositories.userRepository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.sql.Date;

@Service
@RequiredArgsConstructor
public class RateService implements IRateServices{
    private final RateRepository rateRepository;
    private final UserRepository userRepository;
    private final ProductRepo productRepository;

    public Rate leaveComment(Long userId, Long productId, String content) throws Exception {
        // Tìm user và product từ ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new DataNotFoundException("Product not found"));

        // Tạo đối tượng Rate mới
        Rate newRate = new Rate();
        newRate.setContent(content);
        newRate.setCommentDate(Date.valueOf(LocalDate.now()));  // Lấy ngày hiện tại
        newRate.setUser(user);
        newRate.setProduct(product);

        // Lưu vào database
        return rateRepository.save(newRate);
    }
}
