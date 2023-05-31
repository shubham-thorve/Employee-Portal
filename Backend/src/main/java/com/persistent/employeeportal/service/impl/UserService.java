package com.persistent.employeeportal.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.persistent.employeeportal.config.JwtUtilities;
import com.persistent.employeeportal.entity.CompanyDetails;
import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.entity.JwtResponse;
import com.persistent.employeeportal.entity.LoginDto;
import com.persistent.employeeportal.entity.LogoutDto;
import com.persistent.employeeportal.entity.RegisterDto;
import com.persistent.employeeportal.entity.Token;
import com.persistent.employeeportal.repository.CompanyDetailsRepository;
import com.persistent.employeeportal.repository.ITokenRepository;
import com.persistent.employeeportal.repository.IUserRepository;
import com.persistent.employeeportal.service.IUserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements IUserService {
	Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private IUserRepository iUserRepository;

	@Autowired
	private CompanyDetailsRepository companyDetailsRepository;

	@Autowired
	private ITokenRepository iTokenRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtUtilities jwtUtilities;

	@Override
	public EmployeeDetails saverUser(EmployeeDetails user) {
		return iUserRepository.save(user);
	}

	@Override
	public String register(RegisterDto registerDto) {

		EmployeeDetails user = new EmployeeDetails();
		user.setEmail(registerDto.getEmail());
		user.setFirstName(registerDto.getFirstName());
		user.setEmployeeId(registerDto.getEmployeeId());
		user.setLastName(registerDto.getLastName());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		EmployeeDetails savedUser = iUserRepository.save(user);
		logger.info("signup request:" + user);
		CompanyDetails cmp = new CompanyDetails();
		cmp.setTitle("");
		cmp.setWorkLocation("");
		cmp.setEmployeeDetails(savedUser);
		//cmp.setEmployeeId(registerDto.getEmployeeId());
		companyDetailsRepository.save(cmp);
		logger.info("company details request:" + cmp);
		return "Employee registered successfully";

	}

	@Override
	public JwtResponse authenticate(LoginDto loginDto) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		EmployeeDetails user = iUserRepository.findByEmail(authentication.getName())
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		String token = jwtUtilities.generateToken(user.getEmail());
		logger.info("token:" + token);
		Token tokenobj = new Token();
		tokenobj.setToken(token);
		tokenobj.setEmpEmail(loginDto.getEmail());
		iTokenRepository.save(tokenobj);
		return new JwtResponse(token, user.getEmail());
	}

	@Override
	public ResponseEntity<?> logout(LogoutDto logoutDto) {
		if (iUserRepository.existsByEmail(logoutDto.getEmail())) {
			iTokenRepository.deleteByEmpEmail(logoutDto.getEmail());
			return new ResponseEntity<>("Logout Successfull", HttpStatus.OK);
		}
		logger.info("Email is not Exist:" + logoutDto.getEmail());
		return new ResponseEntity<>("Email is not Exist !", HttpStatus.NOT_FOUND);
	}

	@Override
	public boolean existsByEmail(String email) {

		return iUserRepository.existsByEmail(email);
	}

	@Override
	public boolean existsByEmployeeId(long employeeId) {
		// TODO Auto-generated method stub
		return iUserRepository.existsByEmployeeId(employeeId);
	}

}
