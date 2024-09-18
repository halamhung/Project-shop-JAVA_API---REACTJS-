package com.example.ecommerce.Backend.Exceptions;

public class ResoureNotFoundException extends RuntimeException{
    public ResoureNotFoundException(String message){
        super(message);
    }
}