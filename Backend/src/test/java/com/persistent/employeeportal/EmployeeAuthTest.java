package com.persistent.employeeportal;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import com.persistent.employeeportal.config.JwtAuthenticationFilter;
import com.persistent.employeeportal.config.JwtUtilities;
import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.entity.JwtResponse;
import com.persistent.employeeportal.entity.LoginDto;
import com.persistent.employeeportal.entity.LogoutDto;
import com.persistent.employeeportal.entity.RegisterDto;
import com.persistent.employeeportal.repository.IUserRepository;
import com.persistent.employeeportal.service.IUserService;
import com.persistent.employeeportal.service.impl.UserService;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class EmployeeAuthTest {
	@MockBean
	@Autowired
	private UserService iUserService;

	private RegisterDto dto;
	@MockBean
	private JwtResponse response;
	private LoginDto login;
	private LogoutDto logout;
    @Mock
	EmployeeDetails employeeDetails;
    @MockBean
    IUserRepository iUserRepository;
	@BeforeEach
	public void initializeSignUp() {

		RegisterDto dto = new RegisterDto();
		dto.setEmail("bharat@gmail.com");
		dto.setPassword("bharat@123");
		dto.setEmployeeId(123);
		dto.setFirstName("Bharat");
		dto.setLastName("Bhanvase");
		this.dto = dto;
	}

	

	@Test
	public void testRegistration() throws Exception {

		
		
		iUserService.register(dto);
    	Mockito.verify(iUserService, times(1)).register(dto) ;
    	
		/*
		 * when(iUserService.register(dto)).
		 * thenReturn("Employee registered successfully"); String
		 * msg=iUserService.register(dto); assertEquals(msg,
		 * "Employee registered successfully");
		 */
	}

	@BeforeEach
	public void initializeSignIn() {

		LoginDto dto = new LoginDto();
		dto.setEmail("bharat@gmail.com");
		dto.setPassword("bharat@123");
		this.login = dto;
	}
	@Test
	public void testLogin() throws Exception {
		iUserService.authenticate(login);
		Mockito.verify(iUserService, times(1)).authenticate(login) ;

	}

	@BeforeEach
	public void initializeLogout() {

		LogoutDto dto = new LogoutDto();
		dto.setEmail("bharat@gmail.com");
		this.logout = dto;
	}
	@Test
	public void testLogout() throws Exception {
		iUserService.logout(logout);
		Mockito.verify(iUserService, times(1)).logout(logout) ;

	}

}
