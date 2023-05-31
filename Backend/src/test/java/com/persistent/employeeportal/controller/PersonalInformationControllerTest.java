package com.persistent.employeeportal.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.service.PersonalInformationService;

@ExtendWith(MockitoExtension.class)
public class PersonalInformationControllerTest {

	@Autowired
    private MockMvc mockMvc;
	
	@Mock
	private PersonalInformationService personalInformationService;
	
	@InjectMocks
	private PersonalInformationController personalInformationController;
	
	private static ObjectMapper mapper = new ObjectMapper();
	
	final String urlPath = "/employeeportal-service/personalinfo";
	
	@Test
    public void testUpdateExample() throws Exception {
		
		MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
	
		EmployeeDetails details = new EmployeeDetails();
		details.setEmployeeId(new Long(1111111));
		details.setFirstName("Prasanna");
		details.setLastName("K");
		details.setAddress("Bengaluru");
		details.setPhoneNo(new Long(999999999));
		details.setAlternatePhoneNo(new Long(985379419));
		details.setPersonalEmail("prasanna_info@persistent.com");
		details.setPassword("12345667");
		details.setEmail("prasanna.khilar@info.com");
		details.setGovernmentId("122333445665");
		details.setBirthDate(new Date(14-03-1992));
		details.setMaritalStatus("Single");
		
		//when(personalInformationService.createPersonalInfo(any(EmployeeDetails.class))).thenReturn(details.getEmail());
		ResponseEntity<Object> responseEntity = personalInformationController.getPersonalDetails(details.getEmail()); 
		assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
		
	}
	
	
	
}
