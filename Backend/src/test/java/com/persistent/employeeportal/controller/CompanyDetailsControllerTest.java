package com.persistent.employeeportal.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.persistent.employeeportal.entity.CompanyDetails;
import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.service.CompanyDetailsService;

@ExtendWith(MockitoExtension.class)
public class CompanyDetailsControllerTest {
	
	@InjectMocks
	private CompanyDetailsController companyDetailsController;
	
	@Mock
	private CompanyDetailsService companyDetailsService;
	
	final String urlPath = "/employeeportal-service/personalinfo";
	
	@Test
    public void testPostExample() throws Exception {
		
		MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        
        CompanyDetails details = new CompanyDetails();
        details.setId(new Long(11112));
        details.setTitle("Mr");
        details.setManagerName("Kumar");
        details.setWorkLocation("Bhubaneswar");
        details.setWorkPhone(new Long(999999999));
        details.setJoiningDate(new Date(15-03-1992));
        
        when(companyDetailsService.createCompanyDetails("abc@persistent.com", details)).thenReturn(details);
        ResponseEntity<Object> responseEntity = companyDetailsController.addCompanyDetails("abc@persistent.com",details);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
	}

}
