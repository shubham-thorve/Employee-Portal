package com.persistent.employeeportal.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.persistent.employeeportal.entity.CompanyDetails;
import com.persistent.employeeportal.repository.CompanyDetailsRepository;
import com.persistent.employeeportal.service.impl.CompanyDetailsServiceImpl;

@Disabled
@ExtendWith(MockitoExtension.class)
public class CompanyDetailsServiceImplTest {

	@Mock
    private CompanyDetailsRepository companyDetailsRepository;

	@Mock
    private CompanyDetailsServiceImpl companyDetailsServiceImpl;

    private CompanyDetails companyDetails;
    
    /*@Before
	public void init() {
		MockitoAnnotations.openMocks(this);
	}*/

    @BeforeEach
    public void setup(){
    	companyDetails = new CompanyDetails();
    	companyDetails.setId(1112L);
    	companyDetails.setTitle("Mr");
    	companyDetails.setManagerName("raj");
    	companyDetails.setJoiningDate(new Date());
    	companyDetails.setWorkLocation("Bengaluru");
    	companyDetails.setWorkPhone(97865232832L);
    }

    // JUnit test for addCompanyDetails method
    @DisplayName("JUnit test for addCompanyDetails method")
    @Test
    public void givenCompanyObject_whenSaveCompany_thenReturnCompanyObject(){
        // given - precondition or setup
    	//Mockito.when(companyDetailsRepository.findById(companyDetails.getEmployeeId()))
                //.thenReturn(Optional.empty());

        //when(companyDetailsRepository.save(companyDetails)).thenReturn(companyDetails);

        //System.out.println(companyDetailsRepository);
       // System.out.println(companyDetailsServiceImpl);

        // when -  action or the behavior that we are going test
        //CompanyDetails savedCompany = companyDetailsServiceImpl.createCompanyDetails(companyDetails);

        //System.out.println(savedCompany);
        // then - verify the output
        //assertThat(savedCompany).isNotNull();
    	companyDetailsRepository.save(companyDetails);
    	Mockito.verify(companyDetailsServiceImpl, times(1)).createCompanyDetails("abc@persistent.com", companyDetails);
    }
    
 // JUnit test for updateCompanyDetails method
    @DisplayName("JUnit test for updateCompanyDetails method")
    @Test
    public void givenCompanyObject_whenUpdateCompany_thenReturnCompanyObject(){
        // given - precondition or setup
    	//when(companyDetailsRepository.findById(companyDetails.getEmployeeId()))
                //.thenReturn(Optional.empty());

        //when(companyDetailsRepository.save(companyDetails)).thenReturn(companyDetails);

        //System.out.println(companyDetailsRepository);
       // System.out.println(companyDetailsServiceImpl);

        // when -  action or the behavior that we are going test
        //CompanyDetails updateCompany = companyDetailsServiceImpl.updateCompanyDetails(companyDetails, 1112L);

       // System.out.println(updateCompany);
        // then - verify the output
        //assertThat(updateCompany).isNotNull();
        //when(companyDetailsServiceImpl.updateCompanyDetails(companyDetails, Mockito.anyLong()))
        //.thenReturn(companyDetails);
        //assertNotNull(companyDetails); 
    	companyDetailsRepository.save(companyDetails);
    	Mockito.verify(companyDetailsServiceImpl, times(1)).updateCompanyDetails(companyDetails, "abc@persistent.com");
    }
    
    
 // JUnit test for updateCompanyDetails method
    @DisplayName("JUnit test for deleteCompanyDetails method")
    @Test
    public void givenCompanyObject_whenDeleteCompany_thenReturnCompanyObject(){
        // given - precondition or setup
    	//when(companyDetailsRepository.findById(companyDetails.getEmployeeId()))
               // .thenReturn(Optional.empty());

       
        // when -  action or the behavior that we are going test
        //CompanyDetails deleteCompany = companyDetailsServiceImpl.deleteCompanyDetails(1112L);

        //System.out.println(deleteCompany);
        // then - verify the output
        //assertThat(deleteCompany).isNotNull();
        
        //companyDetailsServiceImpl.deleteCompanyDetails(1112L);
   	 // test that there was a call
       //Mockito.verify(companyDetailsServiceImpl, Mockito.times(1));
    	companyDetailsRepository.delete(companyDetails);
    	Mockito.verify(companyDetailsServiceImpl, times(1)).deleteCompanyDetails("abc@persistent.com");
    }
}