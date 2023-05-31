package com.persistent.employeeportal.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.persistent.employeeportal.entity.CompanyDetails;
import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.repository.CompanyDetailsRepository;
import com.persistent.employeeportal.repository.PersonalInformationRepository;
import com.persistent.employeeportal.service.CompanyDetailsService;

@Service
public class CompanyDetailsServiceImpl implements CompanyDetailsService {
	
	Logger logger = LoggerFactory.getLogger(CompanyDetailsServiceImpl.class);

	@Autowired
	private CompanyDetailsRepository companyDetailsRepository;
	
	@Autowired
	private PersonalInformationRepository personalInformationRepository;
	
	

    @Override
    public CompanyDetails createCompanyDetails(String username, CompanyDetails companyDetails){
    	logger.info("Inside createCompanyDetails() in serviceImpl ");
    	EmployeeDetails employeeDetails = personalInformationRepository.findByEmail(username);
    	companyDetails.setEmployeeDetails(employeeDetails);
		return companyDetailsRepository.save(companyDetails);
    }

    @Override
    public CompanyDetails getCompanyDetailsById(String username) {
    	logger.info("Inside getCompanyDetailsById() in serviceImpl ");
    	EmployeeDetails employeeDetails = personalInformationRepository.findByEmail(username);
    	CompanyDetails companyDetails =new CompanyDetails();
    	companyDetails.setEmployeeDetails(employeeDetails);
    	Long id = companyDetailsRepository.findIdByEmployeeId(employeeDetails.getEmployeeId());
    	return companyDetailsRepository.findCompanyDetailsById(id);
    }

    @Override
    public List<CompanyDetails> getCompanyDetails() {
    	logger.info("Inside getCompanyDetails() in serviceImpl ");
        return (List<CompanyDetails>) companyDetailsRepository.findAll();
    }

    @Override
    public CompanyDetails updateCompanyDetails(CompanyDetails companyDetails, String username) {
    	logger.info("Inside updateCompanyDetails() in serviceImpl ");
    	EmployeeDetails employeeDetails = personalInformationRepository.findByEmail(username);
    	CompanyDetails existingCompanyDetails =new CompanyDetails();
    	existingCompanyDetails.setEmployeeDetails(employeeDetails);
    	Long id = companyDetailsRepository.findIdByEmployeeId(employeeDetails.getEmployeeId());
    	existingCompanyDetails = companyDetailsRepository.findCompanyDetailsById(id);
    	existingCompanyDetails.setJoiningDate(companyDetails.getJoiningDate());
    	existingCompanyDetails.setManagerName(companyDetails.getManagerName());
    	existingCompanyDetails.setWorkPhone(companyDetails.getWorkPhone());
    	existingCompanyDetails.setTitle(companyDetails.getTitle());
    	existingCompanyDetails.setWorkLocation(companyDetails.getWorkLocation());
    	CompanyDetails updatedCompanyDetails = companyDetailsRepository.save(existingCompanyDetails);
        return updatedCompanyDetails;
    }

    @Override
    public void deleteCompanyDetails(String username) {
    	logger.info("Inside deleteCompanyDetails() in serviceImpl ");
    	EmployeeDetails employeeDetails = personalInformationRepository.findByEmail(username);
    	CompanyDetails companyDetails =new CompanyDetails();
    	companyDetails.setEmployeeDetails(employeeDetails);
    	Long id = companyDetailsRepository.findIdByEmployeeId(employeeDetails.getEmployeeId());
    	companyDetailsRepository.deleteById(id);
    }
    
}
