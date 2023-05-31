package com.persistent.employeeportal.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.repository.PersonalInformationRepository;
import com.persistent.employeeportal.service.impl.PersonalInformationServiceImpl;

@Disabled
@ExtendWith(MockitoExtension.class)
public class PersonalInformationServiceImplTest {

	@Mock
    private PersonalInformationRepository personalInformationRepository;

	@Mock
    private PersonalInformationServiceImpl personalInformationServiceImpl;

    private EmployeeDetails employeeDetails;

    @BeforeEach
    public void setup(){
    	employeeDetails = new EmployeeDetails();
    	employeeDetails.setEmployeeId(1112L);
    	employeeDetails.setFirstName("Ram");
    	employeeDetails.setLastName("Kumar");
    	employeeDetails.setAddress("Suraj");
    	employeeDetails.setPhoneNo(97865232832L);
    	employeeDetails.setPassword("werewrerweoreijaskfask");
    	employeeDetails.setGovernmentId("1332434532423");
    	employeeDetails.setBirthDate(new Date());
    	employeeDetails.setMaritalStatus("Married");
    	employeeDetails.setEmail("test@persistent.com");
    	
    }

    // JUnit test for addCompanyDetails method
    @DisplayName("JUnit test for addPersonalInformation method")
    @Test
    public void givenPersonalInfoObject_whenSavePersonalInfo_thenReturnPersonalInfoObject(){
        // given - precondition or setup
    	//Mockito.when(personalInformationRepository.findById(employeeDetails.getEmployeeId()))
                //.thenReturn(Optional.empty());

       // when(personalInformationRepository.save(employeeDetails)).thenReturn(employeeDetails);

        //System.out.println(personalInformationRepository);
        //System.out.println(personalInformationServiceImpl);

        // when -  action or the behavior that we are going test
        //EmployeeDetails savedPersonalInfo = personalInformationServiceImpl.createPersonalInfo(employeeDetails);

        //System.out.println(savedPersonalInfo);
        // then - verify the output
        //assertThat(savedPersonalInfo).isNotNull();
    	
    	personalInformationRepository.save(employeeDetails);
    	Mockito.verify(personalInformationServiceImpl, times(1)).createPersonalInfo(employeeDetails);
    }
    
 // JUnit test for updateCompanyDetails method
    @DisplayName("JUnit test for updateCompanyDetails method")
    @Test
    public void givenPersonalInfoObject_whenUpdatePersonalInfo_thenReturnPersonalInfoObject(){
        // given - precondition or setup
    	//when(personalInformationRepository.findById(employeeDetails.getEmployeeId()))
                //.thenReturn(Optional.empty());

        //when(personalInformationRepository.save(employeeDetails)).thenReturn(employeeDetails);

        //System.out.println(personalInformationRepository);
        //System.out.println(personalInformationServiceImpl);

        // when -  action or the behavior that we are going test
        //EmployeeDetails updatePersonalInfo = personalInformationServiceImpl.updatePersonalInfo(employeeDetails, 1112L);

        //System.out.println(updatePersonalInfo);
        // then - verify the output
        //assertThat(updatePersonalInfo).isNotNull();
    	personalInformationRepository.save(employeeDetails);
    	Mockito.verify(personalInformationServiceImpl, times(1)).updatePersonalInfo(employeeDetails, 111L);
    }
    
    
 // JUnit test for updateCompanyDetails method
    @DisplayName("JUnit test for deleteCompanyDetails method")
    @Test
    public void givenPersonalInfoObject_whenDeletePersonalInfo_thenReturnPersonalInfoObject(){
        // given - precondition or setup
    	//when(personalInformationRepository.findById(employeeDetails.getEmployeeId()))
                //.thenReturn(Optional.empty());

       
        //System.out.println(personalInformationRepository);
        //System.out.println(personalInformationServiceImpl);

        // when -  action or the behavior that we are going test
        //EmployeeDetails deletePersonalInfo = personalInformationServiceImpl.deletePersonalInfo(1112L);

        //System.out.println(deletePersonalInfo);
        // then - verify the output
        //verify(personalInformationServiceImpl.deletePersonalInfo(1112L),times(1)).println("expected command");
    	//doNothing().when(1112L).deletePersonalInfo(employeeDetails.getEmployeeId());
    	
    	//personalInformationServiceImpl.deletePersonalInfo(1112L);
    	 // test that there was a call
        //Mockito.verify(personalInformationServiceImpl, Mockito.times(1));
    	personalInformationRepository.delete(employeeDetails);
    	Mockito.verify(personalInformationServiceImpl, times(1)).deletePersonalInfo(111L);
    }
}