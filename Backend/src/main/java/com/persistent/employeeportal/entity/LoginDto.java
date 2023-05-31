package com.persistent.employeeportal.entity;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public class LoginDto implements Serializable {

	private static final long serialVersionUID = 5926468583005150707L;
	@NotBlank
	@Email
	private String email;

	@NotBlank
	@Size(min = 4)
	private String password;
	
	public LoginDto()
	{
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
}