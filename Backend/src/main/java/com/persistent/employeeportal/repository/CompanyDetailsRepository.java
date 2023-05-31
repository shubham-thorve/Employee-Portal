package com.persistent.employeeportal.repository;

import com.persistent.employeeportal.entity.CompanyDetails;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CompanyDetailsRepository extends CrudRepository<CompanyDetails, Long> {
	
	@Query("select companyDetails.id from CompanyDetails companyDetails where companyDetails.employeeDetails.employeeId= :employeeId")
	Long findIdByEmployeeId(@Param("employeeId") Long employeeId);
	
	//@Query("select employeeDetails from EmployeeDetails employeeDetails where employeeDetails.employeeId= :employeeId")
	CompanyDetails findCompanyDetailsById(@Param("id") Long id);

}
