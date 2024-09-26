package com.example.ecommerce.Backend.Controller.UserController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import com.example.ecommerce.Backend.Dtos.ImgDtos;
import com.example.ecommerce.Backend.Modals.Role;
import com.example.ecommerce.Backend.Responses.userResponse.UserResponse;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import com.example.ecommerce.Backend.Dtos.userDTO.UserDTO;
import com.example.ecommerce.Backend.IService.iUserService.IUserService;
import com.example.ecommerce.Backend.Modals.User;
import com.example.ecommerce.Backend.Responses.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;


    @GetMapping("/employee/all")
    public ResponseEntity<ApiResponse> getUsersWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

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

    @PostMapping("/users/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO){
        try {
            User loggedInuser = userService.login(userDTO);
            // Chuyển đổi User thành UserResponse
            UserResponse userResponse = UserResponse.fromUser(loggedInuser);
            return ResponseEntity.ok(userResponse);  // Trả về toàn bộ thông tin của user
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/users/roleUser/{id}")
    public ResponseEntity<?> getRoleUser(@PathVariable Long id) {
        try {
            // Tìm người dùng dựa trên ID
            User user = userService.getUserById(id);

            // Lấy danh sách các vai trò của người dùng
            Set<Role> roles = user.getRoles();

            // Trả về danh sách các vai trò
            return ResponseEntity.ok(roles);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
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

    //img
    @GetMapping("/users/img/{imgName}")
    public ResponseEntity<?> viewImgUser(@PathVariable String imgName){
        try {
            java.nio.file.Path imgPath = Paths.get("uploadImg"+ imgName);
            UrlResource resource = new UrlResource(imgPath.toUri());
            if(resource.exists()){
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            }
            else {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new UrlResource(Paths.get("uploads/notFound.jpeg").toUri()));
            }
        }catch(Exception ex){
            return ResponseEntity.notFound().build();
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
    @PostMapping(value = "/users/uploadImg/{id}")
    public ResponseEntity<ApiResponse> upLoadUserImg(@PathVariable Long id, @RequestParam("files") MultipartFile files) throws IOException
    {
        String fileName = storeFile(files);
        ImgDtos imgDtos = ImgDtos.builder()
                .imgUrl(fileName)
                .build();
        ApiResponse apiResponse = ApiResponse.builder()
                .data(userService.saveImgUser(id,imgDtos))
                .message("Upload Img User Successfully")
                .status(HttpStatus.OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    private String storeFile(MultipartFile file) throws IOException{
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uniqueFileName = UUID.randomUUID().toString()+"_"+fileName;
        java.nio.file.Path uploadDir = Paths.get("uploadImg");
        if(!Files.exists(uploadDir)){
            Files.createDirectory(uploadDir);
        }
        java.nio.file.Path destination = Paths.get(uploadDir.toString(),uniqueFileName);
        Files.copy(file.getInputStream(),destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFileName;
    }
}
