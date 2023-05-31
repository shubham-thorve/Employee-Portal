package com.persistent.employeeportal.controller;

import java.time.LocalDateTime;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.persistent.employeeportal.entity.CompanyDetails;
import com.persistent.employeeportal.exception.EmployeePortalException;
import com.persistent.employeeportal.service.CompanyDetailsService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CompanyDetailsController {
	
	Logger logger = LoggerFactory.getLogger(CompanyDetailsController.class);
	
	final String urlPath = "/employeeportal-service/companydetails";

	@Autowired
	private CompanyDetailsService companyDetailsService;
	
	// Add Employee Personal Info
    @PostMapping(path = urlPath + "/{username}")
    @PreAuthorize("#username == authentication.name")
    public ResponseEntity<Object> addCompanyDetails(@PathVariable("username") String username, @RequestBody @Valid CompanyDetails companyDetails)
    {
    	logger.info("Inside addCompanyDetails() in controller ");
    	try {
    		CompanyDetails companyDetailsResponse = companyDetailsService.createCompanyDetails(username, companyDetails);
    		return new ResponseEntity<Object>(companyDetailsResponse, HttpStatus.OK);
	    } catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return new ResponseEntity<Object>(new EmployeePortalException("Couldn't save Company Details", e.getMessage(), LocalDateTime.now()),HttpStatus.BAD_REQUEST);
		}
    }
	
	
    
    //Get Particular Employee Company Details
	@GetMapping(path = urlPath + "/{username}")
	@PreAuthorize("#username == authentication.name")
	public ResponseEntity<Object> getEmployeeCompanyDetails(@PathVariable("username") String username) {
		logger.info("Inside getEmployeeCompanyDetails() in controller ");
		try {
			CompanyDetails retrieveCompanyDetails = companyDetailsService.getCompanyDetailsById(username);
			return new ResponseEntity<Object>(retrieveCompanyDetails, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return new ResponseEntity<Object>(new EmployeePortalException("Couldn't get Employee Company Details",
					"Wrong Employee Id", LocalDateTime.now()), HttpStatus.BAD_REQUEST);
		}
	}
    
    //Build Update User REST API
    @PutMapping(path = urlPath + "/{username}")
    public ResponseEntity<Object> updatePersonalInfo(@PathVariable("username") String username,
    		@Valid @RequestBody CompanyDetails companyDetails){
    	logger.info("Inside updatePersonalInfo() in controller ");
    	CompanyDetails updatedPersonalInfo =  null;
    	try {
	    	updatedPersonalInfo = companyDetailsService.updateCompanyDetails(companyDetails, username);
	        return new ResponseEntity<Object>(updatedPersonalInfo, HttpStatus.OK);
	    } catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return new ResponseEntity<Object>(new EmployeePortalException("Couldn't update Company Details", "Wrong Employee Id", LocalDateTime.now()),HttpStatus.BAD_REQUEST);
			
		}
    }

    // Build Delete User REST API
    @DeleteMapping(path = urlPath + "/{username}")
    @PreAuthorize("#username == authentication.name")
    public ResponseEntity<Object> deletePersonalDetails(@PathVariable("username") String username){
    	logger.info("Inside deletePersonalDetails() in controller ");
    	try {
    		companyDetailsService.deleteCompanyDetails(username);
    		return new ResponseEntity<Object>("Company Details of Employee successfully deleted!", HttpStatus.OK);
	    } catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(new EmployeePortalException("Couldn't delete Company Details", e.getMessage(), LocalDateTime.now()),HttpStatus.BAD_REQUEST);
		}
    }
}
