package com.persistent.employeeportal.service.impl;

import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.service.PersonalInformationService;
import com.persistent.employeeportal.repository.PersonalInformationRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PersonalInformationServiceImpl implements PersonalInformationService {

	Logger logger = LoggerFactory.getLogger(PersonalInformationServiceImpl.class);
	
	@Autowired
	private PersonalInformationRepository personalInformationRepository;

    @Override
    public EmployeeDetails createPersonalInfo(EmployeeDetails personalInfo){
    	logger.info("Inside createPersonalInfo() in serviceImpl ");
        return personalInformationRepository.save(personalInfo);
    }

    @Override
    public EmployeeDetails getPersonalInfoById(Long employeeId) {
    	logger.info("Inside getPersonalInfoById() in serviceImpl ");
    	Optional<EmployeeDetails> optionalUser = personalInformationRepository.findById(employeeId);
        return optionalUser.get();
    }

    @Override
    public List<EmployeeDetails> getAllPersonalInfo() {
    	logger.info("Inside getAllPersonalInfo() in serviceImpl ");
        return (List<EmployeeDetails>) personalInformationRepository.findAll();
    }

    @Override
    public EmployeeDetails updatePersonalInfo(EmployeeDetails personalInfo, Long employeeId) {
    	logger.info("Inside updatePersonalInfo() in serviceImpl ");
    	EmployeeDetails existingPersonalInfo = personalInformationRepository.findById(employeeId).get();
    	existingPersonalInfo.setFirstName(personalInfo.getFirstName());
    	existingPersonalInfo.setLastName(personalInfo.getLastName());
    	existingPersonalInfo.setGovernmentId(personalInfo.getGovernmentId());
    	existingPersonalInfo.setAddress(personalInfo.getAddress());
    	existingPersonalInfo.setPhoneNo(personalInfo.getPhoneNo());
    	existingPersonalInfo.setBirthDate(personalInfo.getBirthDate());
    	existingPersonalInfo.setPersonalEmail(personalInfo.getPersonalEmail());
    	existingPersonalInfo.setMaritalStatus(personalInfo.getMaritalStatus());

    	existingPersonalInfo.setAlternatePhoneNo(personalInfo.getAlternatePhoneNo());
    	EmployeeDetails updatedPersonalInfo = personalInformationRepository.save(existingPersonalInfo);
        return updatedPersonalInfo;
    }

    @Override
    public void deletePersonalInfo(Long employeeId) {
    	logger.info("Inside deletePersonalInfo() in serviceImpl ");
    	personalInformationRepository.deleteById(employeeId);
    }
    
    
    @Override
    public Long getEmployeeIdByEmail(String userName) {
    	logger.info("Inside getEmployeeIdByEmail() in serviceImpl ");
        Long employeeId = personalInformationRepository.findEmployeeIdByEmail(userName);
        return employeeId;
    }
    
    @Override
    public EmployeeDetails updatePersonalInfoWithPhoto(Long employeeId, MultipartFile documentFile) throws IOException{
    	logger.info("Inside updatePersonalInfoWithPhoto() in serviceImpl ");
    	EmployeeDetails existingPersonalInfo = personalInformationRepository.findById(employeeId).get();
    	EmployeeDetails updatingPersonalInfoForPhoto = existingPersonalInfo;
    	if(null != documentFile && null != employeeId) {
	    	existingPersonalInfo.setEmployeeId(employeeId);
	    	existingPersonalInfo.setFirstName(updatingPersonalInfoForPhoto.getFirstName());
	    	existingPersonalInfo.setLastName(updatingPersonalInfoForPhoto.getLastName());
	    	existingPersonalInfo.setGovernmentId(updatingPersonalInfoForPhoto.getGovernmentId());
	    	existingPersonalInfo.setAddress(updatingPersonalInfoForPhoto.getAddress());
	    	existingPersonalInfo.setPhoneNo(updatingPersonalInfoForPhoto.getPhoneNo());
	    	existingPersonalInfo.setBirthDate(updatingPersonalInfoForPhoto.getBirthDate());
	    	existingPersonalInfo.setPersonalEmail(updatingPersonalInfoForPhoto.getPersonalEmail());
	    	existingPersonalInfo.setMaritalStatus(updatingPersonalInfoForPhoto.getMaritalStatus());
	
	    	existingPersonalInfo.setAlternatePhoneNo(updatingPersonalInfoForPhoto.getAlternatePhoneNo());
	    	existingPersonalInfo.setProfilePhoto(documentFile.getBytes());
	    	existingPersonalInfo = personalInformationRepository.save(existingPersonalInfo);
    	}
    	
        return existingPersonalInfo;
    }
    
    @Override
    public EmployeeDetails retrieveEmployeePhoto(Long employeeId) {
    	logger.info("Inside retrieveEmployeePhoto() in serviceImpl ");
    	//EmployeeDetails existingPersonalInfo = personalInformationRepository.findById(employeeId).get();
    	Optional<EmployeeDetails> optionalEmployeePhoto = personalInformationRepository.findById(employeeId);
    	
    	EmployeeDetails retrievingEmployeePhoto = null;
    	
    	if(optionalEmployeePhoto.isPresent()) {
    		retrievingEmployeePhoto = optionalEmployeePhoto.get();
    	
    		if(null != retrievingEmployeePhoto.getProfilePhoto()) {
    			return retrievingEmployeePhoto;
    		}
    	}
    	return retrievingEmployeePhoto;
    }	
}
