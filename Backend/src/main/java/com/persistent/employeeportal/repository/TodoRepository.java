package com.persistent.employeeportal.repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.entity.TodoDetails;

@Repository
public interface TodoRepository extends CrudRepository<TodoDetails, Long> {

//	public List<TodoDetails> findByCreatedDateAndEmployeeId(Date date, long employeeId);
	public List<TodoDetails> findByCreatedDateAndEmployee(Date date, EmployeeDetails employeeDetails);

	List<TodoDetails> findAllByEmployee(EmployeeDetails employeeDetails);

	Optional<TodoDetails> findByTodoIdAndEmployee(long todoId, EmployeeDetails employeeDetails);

}
