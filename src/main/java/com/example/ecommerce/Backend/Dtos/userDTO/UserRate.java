package com.example.ecommerce.Backend.Dtos.userDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRate {
    private Date commentDate;
    private String content;
}
