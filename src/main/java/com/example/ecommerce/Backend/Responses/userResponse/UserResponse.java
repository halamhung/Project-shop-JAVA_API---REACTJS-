package com.example.ecommerce.Backend.Responses.userResponse;

import com.example.ecommerce.Backend.Modals.User;
import com.example.ecommerce.Backend.Responses.BaseResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse extends BaseResponse{
    private Long userId;
    private String name;
    private String userName;
    private String email;
    private String phone;
    private String address;
    private  int status;

    public static UserResponse fromUser(User user){
        UserResponse userResponse = UserResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .userName(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .status(user.getStatus())
                .build();
        return userResponse;

    }

}
