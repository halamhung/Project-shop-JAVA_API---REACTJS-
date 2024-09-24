package com.example.ecommerce.Backend.Dtos.userDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    @NotBlank(message = "Tên không dược rỗng")
    @Size(min=6,max=20,message = "Tên phải có từ 6 đến 20 kí tự")
    private String name;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    @Size(min = 10, max = 10, message = "Số điện thoại bắt buộc 10 chữ số")
    @Pattern(regexp = "^(0[35789]|84[35789])[0-9]{8}$", message = "Số điện thoại không hợp lệ.")
    private String phone;

    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;

    @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 ký tự.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$", message = "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một chữ số.")
    private String password;

    private int status;

    @NotBlank(message = "Hãy nhập tên người dùng")
    @Size(min=6,max=20, message = "Tên phải có từ 6 đến 20 kí tự")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới.")
    private String username;
    
}
