package com.example.ecommerce.Backend.Responses.userResponse;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserListPageResponse {
    private List<UserResponse> userResponsesList;
    private int totalPage;
}
