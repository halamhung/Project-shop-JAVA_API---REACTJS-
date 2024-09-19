package com.example.ecommerce.Backend.IService.iUserService;

import java.util.List;

import com.example.ecommerce.Backend.Dtos.userDTO.UserDTO;
import com.example.ecommerce.Backend.Modals.User;

public interface IUserService {
    User getUserById(Long userId);
    List<User> getAlluser();
    User saveUser(UserDTO UserDTO);
    User updateUser(Long userId, UserDTO UserDTO);
    void deleteUser(Long userId);

}
