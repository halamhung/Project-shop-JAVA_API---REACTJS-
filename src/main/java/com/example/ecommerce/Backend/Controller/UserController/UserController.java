package com.example.ecommerce.Backend.Controller.UserController;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.Backend.Dtos.userDTO.UserDTO;
import com.example.ecommerce.Backend.IService.iUserService.IUserService;
import com.example.ecommerce.Backend.Modals.User;
import com.example.ecommerce.Backend.Responses.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;


    @GetMapping("/employee/all")
    public ResponseEntity<ApiResponse> getUsersWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size) {

        try {
            Page<User> userPage = userService.getUsersWithPagination(page, size);
            ApiResponse response = ApiResponse.builder()
                    .message("Users retrieved successfully")
                    .status(200)
                    .data(userPage.getContent())
                    .build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = ApiResponse.builder()
                    .message(e.getMessage())
                    .status(400)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }


    @PostMapping("/users/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO,BindingResult result){
        try {
            if(result.hasErrors()){
                List<String> errors = result.getFieldErrors().stream()
                        .map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(errors);
            }
            userService.createUser(userDTO);
            return ResponseEntity.ok("Register successfull"+userDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/users/updatePass/{id}")
    public ResponseEntity<ApiResponse> rePassword(@PathVariable Long id, @RequestBody UserDTO userDTO){
        try {
            userService.updatePassword(id, userDTO);
            ApiResponse response = ApiResponse.builder()
                    .message("Password updated successfully")
                    .status(200)
                    .build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = ApiResponse.builder()
                    .message(e.getMessage())
                    .status(400)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/users/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO){
        try {
            User loggedInuser = userService.login(userDTO);
            return ResponseEntity.ok("Login success, welcome "+loggedInuser.getName());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            ApiResponse response = ApiResponse.builder()
                    .message("User deleted successfully")
                    .status(200)
                    .build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = ApiResponse.builder()
                    .message(e.getMessage())
                    .status(400)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/users/update/{id}")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        try {
            // Gọi hàm updateUser từ UserService để cập nhật thông tin
            User updatedUser = userService.updateUser(id, userDTO);
            ApiResponse response = ApiResponse.builder()
                    .message("User updated successfully")
                    .status(200)
                    .data(updatedUser)
                    .build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = ApiResponse.builder()
                    .message(e.getMessage())
                    .status(400)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/admin/setRole/{userId}")
    public ResponseEntity<ApiResponse> setRole(@PathVariable Long userId, @RequestBody Map<String, String> body) {
        try {
            String roleName = body.get("roleName");
            userService.setUserRole(userId, roleName);
            ApiResponse response = ApiResponse.builder()
                    .message("Role updated successfully")
                    .status(200)
                    .build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = ApiResponse.builder()
                    .message(e.getMessage())
                    .status(400)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
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
