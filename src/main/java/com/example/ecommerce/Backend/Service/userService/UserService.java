package com.example.ecommerce.Backend.Service.userService;

import java.util.HashSet;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.ecommerce.Backend.Dtos.userDTO.UserDTO;
import com.example.ecommerce.Backend.Exceptions.DataNotFoundException;
import com.example.ecommerce.Backend.IService.iUserService.IUserService;
import com.example.ecommerce.Backend.Modals.Role;
import com.example.ecommerce.Backend.Modals.User;
import com.example.ecommerce.Backend.Repositories.userRepository.RoleRepository;
import com.example.ecommerce.Backend.Repositories.userRepository.UserRepository;
import com.example.ecommerce.Backend.Responses.ApiResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder; // Inject password encoder

    @Override
    public Page<User> getUsersWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    @Override
    public User createUser(UserDTO userDTO) throws Exception {
        String name = userDTO.getName();
        if (userRepository.existsByName(name)) {
            throw new DataNotFoundException("Name '" + name + "' already exists");
        }

        // Tìm vai trò mặc định là CUSTOMER
        Role defaultRole = roleRepository.findByName("ROLE_CUSTOMER")
                .orElseThrow(() -> new DataNotFoundException("Role 'CUSTOMER' not found"));

        // Mã hóa mật khẩu trước khi lưu user
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());

        // Tạo mới User với vai trò mặc định là CUSTOMER
        User newUser = User.builder()
                .name(userDTO.getName())
                .email(userDTO.getEmail())
                .phone(userDTO.getPhone())
                .password(encodedPassword) // Set mã hóa mật khẩu
                .userName(userDTO.getUserName())
                .address(userDTO.getAddress())
                .roles(new HashSet<>())  // Khởi tạo roles
                .build();

        // Gán vai trò CUSTOMER cho user
        newUser.getRoles().add(defaultRole);
        return userRepository.save(newUser);
    }

    @Override
    public void setUserRole(Long userId, String roleName) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new DataNotFoundException("Role not found"));

        // Kiểm tra và khởi tạo roles nếu cần
        if (user.getRoles() == null) {
            user.setRoles(new HashSet<>());
        }

        user.getRoles().clear();

        // Thêm role vào user
        user.getRoles().add(role);

        // Lưu lại user với role mới
        userRepository.save(user);
    }

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
    public User updateUser(Long userId, UserDTO UserDTO) throws Exception{
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        // Kiểm tra và cập nhật các trường
        if (UserDTO.getUserName() != null && !UserDTO.getUserName().isEmpty()) {
            existingUser.setUserName(UserDTO.getUserName());
        }
        if (UserDTO.getPhone() != null && !UserDTO.getPhone().isEmpty()) {
            existingUser.setPhone(UserDTO.getPhone());
        }
        if (UserDTO.getEmail() != null && !UserDTO.getEmail().isEmpty()) {
            existingUser.setEmail(UserDTO.getEmail());
        }
        if (UserDTO.getAddress() != null && !UserDTO.getAddress().isEmpty()) {
            existingUser.setAddress(UserDTO.getAddress());
        }

        // Lưu lại thông tin đã cập nhật
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User updatePassword(Long userId, UserDTO userDTO) throws Exception {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        if (userDTO.getPassword() == null || userDTO.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long.");
        }

        // Mã hóa mật khẩu trước khi lưu
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        existingUser.setPassword(encodedPassword);

        return userRepository.save(existingUser);
    }

    @Override
    public User login(UserDTO userDTO) {
        User existingUser = userRepository.findByUserName(userDTO.getUserName());

        if (existingUser == null) {
            throw new IllegalArgumentException("User not found");
        }

        // Kiểm tra mật khẩu (mã hóa)
        if (!passwordEncoder.matches(userDTO.getPassword(), existingUser.getPassword())) {
            throw new IllegalArgumentException("Incorrect password");
        }

        return existingUser;
    }

    @PostMapping("/users/logout")
    public ResponseEntity<ApiResponse> logout() {
        ApiResponse response = ApiResponse.builder()
                .message("Logout successful")
                .status(200)
                .build();
        return ResponseEntity.ok(response);
    }





}
