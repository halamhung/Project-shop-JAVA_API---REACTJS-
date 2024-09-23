package com.example.ecommerce.Backend.IService.iUserService;

import java.util.List;

import org.springframework.data.domain.Page;

import com.example.ecommerce.Backend.Dtos.userDTO.UserDTO;
import com.example.ecommerce.Backend.Modals.User;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    User getUserById(Long userId);
    List<User> getAlluser();
    User saveUser(UserDTO UserDTO);
    User login(UserDTO userDTO);
    User updatePassword(Long userId, UserDTO userDTO) throws Exception;
    User updateUser(Long userId, UserDTO UserDTO) throws Exception;
    void deleteUser(Long userId);
    Page<User> getUsersWithPagination(int page, int size);
    void setUserRole(Long userId, String roleName) throws Exception;

}
