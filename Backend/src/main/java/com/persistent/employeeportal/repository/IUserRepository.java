package com.persistent.employeeportal.repository;




import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.persistent.employeeportal.entity.EmployeeDetails;

public interface IUserRepository extends JpaRepository<EmployeeDetails,Integer> {

    Boolean existsByEmail(String email);
    Optional<EmployeeDetails> findByEmail(String email);
    EmployeeDetails save(EmployeeDetails user);
	boolean existsByEmployeeId(long employeeId);


}

