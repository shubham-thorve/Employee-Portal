package com.persistent.employeeportal.service;

import com.persistent.employeeportal.entity.EmployeeDetails;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface PersonalInformationService {
	
	EmployeeDetails createPersonalInfo(EmployeeDetails personalInfo);

	EmployeeDetails getPersonalInfoById(Long employeeId);

    List<EmployeeDetails> getAllPersonalInfo();

    EmployeeDetails updatePersonalInfo(EmployeeDetails personalInfo, Long employeeId);

    void deletePersonalInfo(Long employeeId);

	Long getEmployeeIdByEmail(String userName);
	
	EmployeeDetails updatePersonalInfoWithPhoto(Long employeeId, MultipartFile documentFile) throws IOException;
	
	EmployeeDetails retrieveEmployeePhoto(Long employeeId);
    
    
}