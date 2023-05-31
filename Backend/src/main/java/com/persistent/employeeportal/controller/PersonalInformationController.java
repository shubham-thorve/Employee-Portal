package com.persistent.employeeportal.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.entity.ProfileDetails;
import com.persistent.employeeportal.exception.EmployeePortalException;
import com.persistent.employeeportal.exception.FileStorageException;
import com.persistent.employeeportal.exception.MaxUploadSizeExceededException;
import com.persistent.employeeportal.exception.ResourceNotFoundException;
import com.persistent.employeeportal.service.PersonalInformationService;

import jakarta.validation.Valid;



@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PersonalInformationController {
	
	Logger logger = LoggerFactory.getLogger(PersonalInformationController.class);
	
	final String urlPath = "/employeeportal-service/personalinfo";
	
	private final static String CONTENT_JPEG = "image/jpeg";
	private final static String CONTENT_JPG = "image/jpeg";
	private final static String CONTENT_PNG = "image/png";

	@Autowired
	private PersonalInformationService personalInformationService;
	
	// Add Employee Personal Info
    /*@PostMapping(path = urlPath)
    @PreAuthorize("#username == authentication.name")
    public ResponseEntity<Object> addPersonalInfo(@Valid @RequestBody EmployeeDetails personalInformation)
    {
    	try{
            EmployeeDetails personalInformationResponse = personalInformationService.createPersonalInfo(personalInformation);
    		return new ResponseEntity<Object>(personalInformationResponse, HttpStatus.OK);
	   }catch (Exception e) {
		   e.printStackTrace();
		   return new ResponseEntity<Object>(new EmployeePortalException("Couldn't save Personal Information ", e.getMessage(), LocalDateTime.now()),HttpStatus.BAD_REQUEST);
	   }
    }*/
    
    @GetMapping(path = urlPath +"/{username}")
	@PreAuthorize("#username == authentication.name")
    public ResponseEntity<Object> getPersonalDetails(@PathVariable("username") String username){
    	logger.info("Inside getPersonalDetails() in controller ");
    	try {
    		Long employeeId = personalInformationService.getEmployeeIdByEmail(username);
    		EmployeeDetails empDetails = personalInformationService.getPersonalInfoById(employeeId);
    		return new ResponseEntity<Object>(empDetails, HttpStatus.OK);
	    } catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(new EmployeePortalException("Couldn't add Personal Information", e.getMessage(), LocalDateTime.now()),HttpStatus.BAD_REQUEST);
		}
    }
    
    
    //Build Update User REST API
    @PutMapping(path = urlPath + "/{username}")
	@PreAuthorize("#username == authentication.name")
    public ResponseEntity<Object> updatePersonalInfo(@PathVariable("username") String username,
    		@Valid @RequestBody EmployeeDetails personalInformation){
    	logger.info("Inside updatePersonalInfo() in controller ");
    	try {
    		Long employeeId = personalInformationService.getEmployeeIdByEmail(username);    		
	        EmployeeDetails updatedPersonalInfo = personalInformationService.updatePersonalInfo(personalInformation, employeeId);
	        return new ResponseEntity<Object>(updatedPersonalInfo, HttpStatus.OK);
	    } catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return new ResponseEntity<Object>(new EmployeePortalException("Couldn't update Personal Information", "Wrong Employee Id", LocalDateTime.now()),HttpStatus.BAD_REQUEST);
			
		}
    }
    
    @PutMapping(path = urlPath +"/profilephoto" +"/{username}")
	@PreAuthorize("#username == authentication.name")
	public ResponseEntity<?> updateProfilePhoto(@PathVariable String username, @RequestParam MultipartFile file)
			throws MaxUploadSizeExceededException, FileStorageException, ResourceNotFoundException, Exception {
    	logger.info("Inside updateProfilePhoto() in controller ");
		try {
			validateFile(file); // File Validations
			
			Long employeeId = personalInformationService.getEmployeeIdByEmail(username);    		
	        EmployeeDetails updatedPersonalInfoWithPhoto = personalInformationService.updatePersonalInfoWithPhoto(employeeId, file);

			Map<String, String> map = new HashMap<>();
			
			map = setResponse(HttpStatus.NO_CONTENT, "Profile Photo updated successfully.", "Profile Photo");

			return new ResponseEntity<>(map, HttpStatus.OK);
			
		} catch (MaxUploadSizeExceededException error) {
			throw new MaxUploadSizeExceededException(error.getMessage());
		} catch (FileStorageException error) {
			throw new FileStorageException(error.getMessage());
		} catch (ResourceNotFoundException error) {
			throw new ResourceNotFoundException(error.getMessage());
		} catch (Exception error) {
			throw new Exception(error.getMessage());
		}
	}
    
    @GetMapping(path = urlPath +"/profilephoto" +"/{username}")
	@PreAuthorize("#username == authentication.name")
	public ResponseEntity<?> getProfilePhoto(@PathVariable String username)
			throws MaxUploadSizeExceededException, FileStorageException, ResourceNotFoundException, Exception {
    	logger.info("Inside getProfilePhoto() in controller ");
		try {
			Long employeeId = personalInformationService.getEmployeeIdByEmail(username);    		
	        EmployeeDetails retrieveProfilePhoto = personalInformationService.retrieveEmployeePhoto(employeeId);

			Map<String, String> map = new HashMap<>();
			
			map = setResponse(HttpStatus.NO_CONTENT, "Profile Photo retrieved successfully.", "Profile Photo");

			return new ResponseEntity<>(map, HttpStatus.OK);
			
		} catch (MaxUploadSizeExceededException error) {
			throw new MaxUploadSizeExceededException(error.getMessage());
		} catch (FileStorageException error) {
			throw new FileStorageException(error.getMessage());
		} catch (ResourceNotFoundException error) {
			throw new ResourceNotFoundException(error.getMessage());
		} catch (Exception error) {
			throw new Exception(error.getMessage());
		}
	}
    
    private void validateFile(MultipartFile documentFile) throws MaxUploadSizeExceededException, Exception {
		if (documentFile.getSize() > 2000000) { // Below 2MB allowed
			throw new MaxUploadSizeExceededException("File size should not be greater than 2MB");
		} else if (!isValid(documentFile)) { // Check file format
			throw new Exception("Please upload valid file format(JPEG or PNG)");
		}
	}

	public Boolean isValid(MultipartFile documentFile) {

		if (documentFile.getContentType().equals(CONTENT_JPEG) || documentFile.getContentType().equals(CONTENT_PNG) || documentFile.getContentType().equals(CONTENT_JPG)) {
			return true;
		}
		return false;
	}
	
	private Map<String, String> setResponse(HttpStatus status, String message, String fileName) {
		Map<String, String> map = new HashMap<>();
		map.put("details", message);
		map.put("fileName", fileName);
		map.put("status", String.valueOf(status));
		map.put("timeStamp", String.valueOf(LocalDateTime.now()));
		return map;
	}

}
