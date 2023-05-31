package com.persistent.employeeportal.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.persistent.employeeportal.entity.LoginDto;
import com.persistent.employeeportal.entity.LogoutDto;
import com.persistent.employeeportal.entity.RegisterDto;
import com.persistent.employeeportal.service.IUserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserAuthController {
	Logger logger = LoggerFactory.getLogger(UserAuthController.class);
	@Autowired
	private IUserService iUserService;

	final String urlPath = "/employeeportal-service/employee_auth";

	@PostMapping(path = urlPath + "/signup")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto) {
		if (iUserService.existsByEmail(registerDto.getEmail())) {
			
			return new ResponseEntity<>("Email is already exist please try another email!", HttpStatus.BAD_REQUEST);
		}
		if (iUserService.existsByEmployeeId(registerDto.getEmployeeId())) {
			logger.info("Email id already exist please try another Id");
			return new ResponseEntity<>("Employee id is already exist please try another employee id !",
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(iUserService.register(registerDto), HttpStatus.CREATED);
	}

	@PostMapping(path = urlPath + "/signin")
	public ResponseEntity<?> authenticate(@Valid @RequestBody LoginDto loginDto) {

		return new ResponseEntity<>(iUserService.authenticate(loginDto), HttpStatus.OK);
		
	}

	@PostMapping(path = urlPath + "/logout")
	public ResponseEntity<?> logoutUser(@Valid @RequestBody LogoutDto logoutDto) {
		SecurityContextHolder.clearContext();
		return ResponseEntity.ok(iUserService.logout(logoutDto));
	}

	@GetMapping(path = urlPath + "/test")
	public String authenticateTest() {
		return "Restricted Message";
	}

}