package com.persistent.employeeportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.persistent.employeeportal.entity.ProfileDetails;

public interface IProfile extends JpaRepository<ProfileDetails, Long>{
	
	public final static String GET_PROFILE = "SELECT * FROM profile_details WHERE employee_id = ?";

	@Query(value=GET_PROFILE,nativeQuery = true)
	public ProfileDetails findByEmpId(Long empId);

}
