package com.persistent.employeeportal.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import jakarta.persistence.Lob;
import org.springframework.web.multipart.MultipartFile;

import com.persistent.employeeportal.entity.EmployeeDetails;


@Repository
public interface PersonalInformationRepository extends CrudRepository<EmployeeDetails, Long> {
	
	@Query("select employeeId from EmployeeDetails where email= :emailId")
	long findEmployeeIdByEmail(@Param("emailId") String emailId);

	EmployeeDetails findByEmail(String email);
	
	//@Query("update EmployeeDetails employeeDetails set employeeDetails.profilePhoto=:profilePhoto where employeeDetails.employeeId=:employeeId")
	//EmployeeDetails updatePhoto(@Param("employeeDetails") EmployeeDetails employeeDetails);
}
