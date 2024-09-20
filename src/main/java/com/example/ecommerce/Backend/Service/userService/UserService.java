package com.example.ecommerce.Backend.Service.userService;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ecommerce.Backend.Dtos.userDTO.UserDTO;
import com.example.ecommerce.Backend.IService.iUserService.IUserService;
import com.example.ecommerce.Backend.Modals.User;
import com.example.ecommerce.Backend.Repositories.userRepository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    private final UserRepository userRepository;
    

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(()-> new RuntimeException("Không tìm thấy user"));
    }

    @Override
    public List<User> getAlluser() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAlluser'");
    }


    /// CHƯA BĂM PASSWORD
    @Override
    public User saveUser(UserDTO UserDTO) {
       User user = User.builder()
                    .name(UserDTO.getName())
                    .userName(UserDTO.getUserName())
                    .email(UserDTO.getEmail())
                    .password(UserDTO.getPassword())
                    .phone(UserDTO.getPhone())
                    .address(UserDTO.getAddress())
                    .build();
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long userId, UserDTO UserDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
    
}
