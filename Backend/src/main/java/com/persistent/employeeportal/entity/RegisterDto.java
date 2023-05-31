package com.persistent.employeeportal.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterDto {

	private Long id;

	public RegisterDto() {
	}

	@NotBlank
	private String firstName;

	@Min(value = 1)
	private long employeeId;

	public long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}

	@NotBlank
	private String lastName;

	@NotBlank
	@Email
	private String email;

	@NotBlank
	@Size(min = 4)
	private String password;

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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Object orElseThrow1(Object object) {
		// TODO Auto-generated method stub
		return null;
	}

}