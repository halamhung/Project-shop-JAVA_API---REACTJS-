package com.example.ecommerce.Backend.Responses;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Date;


public class BaseResponse {
    @JsonProperty("created_at")
    private Date createdAt;
    @JsonProperty("updated_at")
    private Date updatedAt;
}
