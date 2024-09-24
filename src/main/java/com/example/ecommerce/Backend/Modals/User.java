package com.example.ecommerce.Backend.Modals;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;



@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "User")
public class User implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank(message = "Tên người dùng không được để trống.")
    @Size(min = 6, max = 20, message = "Tên người dùng phải có từ 6 đến 20 ký tự.")
    private String name;

    @NotBlank(message = "Tên người dùng không được để trống.")
    @Size(min = 6, max = 20, message = "Tên người dùng phải có từ 6 đến 20 ký tự.")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới.")
    private String username;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rate> rates;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "roleId")
    )
    @JsonManagedReference
    private Set<Role> roles = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();
    }


    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}