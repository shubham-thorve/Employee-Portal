package com.persistent.employeeportal.service;

import org.springframework.http.ResponseEntity;

import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.entity.JwtResponse;
import com.persistent.employeeportal.entity.LoginDto;
import com.persistent.employeeportal.entity.LogoutDto;
import com.persistent.employeeportal.entity.RegisterDto;

public interface IUserService {
	

	JwtResponse authenticate(LoginDto loginDto);

	String register(RegisterDto registerDto);

	ResponseEntity<?> logout(LogoutDto logoutDto);

	EmployeeDetails saverUser(EmployeeDetails user);

	boolean existsByEmail(String email);

	boolean existsByEmployeeId(long employeeId);
}