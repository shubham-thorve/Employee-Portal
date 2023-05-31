package com.persistent.employeeportal.service;

import com.persistent.employeeportal.entity.CompanyDetails; 
import java.util.List;

public interface CompanyDetailsService {
	
	CompanyDetails createCompanyDetails(String username, CompanyDetails companyDetails);

	CompanyDetails getCompanyDetailsById(String username);

    List<CompanyDetails> getCompanyDetails();

    CompanyDetails updateCompanyDetails(CompanyDetails companyDetails, String username);

    void deleteCompanyDetails(String username);
}