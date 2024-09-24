package com.example.ecommerce.Backend.Modals;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank(message = "Tên người dùng không được để trống.")
    @Size(min = 6, max = 20, message = "Tên người dùng phải có từ 6 đến 20 ký tự.")
    private String name;

    @NotBlank(message = "Tên người dùng không được để trống.")
    @Size(min = 6, max = 20, message = "Tên người dùng phải có từ 6 đến 20 ký tự.")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới.")
    private String userName;

    @NotBlank(message = "Địa chỉ không được để trống.")
    private String address;

    @Size(min = 10, max = 10, message = "Số điện thoại bắt buộc 10 chữ số")
    @Pattern(regexp = "^(0[35789]|84[35789])[0-9]{8}$", message = "Số điện thoại không hợp lệ.")
    private String phone;

    @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 ký tự.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$", message = "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một chữ số.")
    private String password;

    @NotBlank(message = "Email không được để trống.")
    @Email(message = "Email không hợp lệ")
    private String email;

    private int status;
    private String role;
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Rate> rates;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Orders> orders;


}