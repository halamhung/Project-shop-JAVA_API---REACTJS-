package com.example.ecommerce.Backend.Responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;

@Data
public class BaseResponse {
    @JsonProperty("created_at")
    private LocalDate createdAt;
    @JsonProperty("updated_at")
    private LocalDate updatedAt;
}
