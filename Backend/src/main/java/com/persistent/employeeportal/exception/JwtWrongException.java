package com.persistent.employeeportal.exception;

public class JwtWrongException extends Exception{

    public JwtWrongException(String message){
        super(message);
    }
}
