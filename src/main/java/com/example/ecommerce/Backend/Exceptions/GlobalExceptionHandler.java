package com.example.ecommerce.Backend.Exceptions;

import com.example.ecommerce.Backend.Responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGeneralException(Exception exception, HttpServletRequest request){
        ApiResponse response = ApiResponse.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("An unexpected error occurred "+ exception.getMessage())
                .data(null)
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationException(MethodArgumentNotValidException exception){
        StringBuilder errorMessage = new StringBuilder();
        exception.getBindingResult().getAllErrors().forEach((error)->{
            errorMessage.append(error.getDefaultMessage()).append("; ");
        });
        ApiResponse response = ApiResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message("Validation failed: "+ errorMessage.toString())
                .data(null)
                .build();
        return ResponseEntity.badRequest().body(response);
    }
    @ExceptionHandler(ResoureNotFoundException.class)
    public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResoureNotFoundException exception){
        ApiResponse response = ApiResponse.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message("Resoure not found: "+ exception.getMessage())
                .data(null)
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
