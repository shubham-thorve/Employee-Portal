package com.persistent.employeeportal.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LogoutDto {
    @NotBlank
    @Email
    private String email;

    public LogoutDto() {
    }

    public LogoutDto(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
