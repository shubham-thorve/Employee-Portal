package com.persistent.employeeportal.service.impl;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.entity.TodoDetails;
import com.persistent.employeeportal.repository.PersonalInformationRepository;
import com.persistent.employeeportal.repository.TodoRepository;

@Service
public class TodoServiceImpl {

	Logger logger = LoggerFactory.getLogger(TodoServiceImpl.class);

	@Autowired
	TodoRepository todoRepository;

	@Autowired
	PersonalInformationRepository persRepository;

	public TodoDetails saveTodo(TodoDetails todoDetails, String username) throws Exception {

		logger.info("Inside saveTodo()");
		
		if (todoDetails.getCreatedDate().before(Date.valueOf(LocalDate.now())))
			throw new Exception("Todo task can be created only for present or future date");

		todoDetails.setEmployee(getEmployee(username));
		return todoRepository.save(todoDetails);
	}

	public long getEmployeeId(String emailId) {
		logger.info("Getting Employee details of user : {}", emailId);
		return persRepository.findByEmail(emailId).getEmployeeId();
	}

	public EmployeeDetails getEmployee(String emailId) {
		logger.info("Getting Employee details of user : {}", emailId);
		return persRepository.findByEmail(emailId);
	}

	public List<TodoDetails> findByCreatedDateAndEmployeeId(String createdDate, String userName) {
		
		logger.info("Inside findByCreatedDateAndEmployeeId()");
		
		DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate date = LocalDate.parse(createdDate, format);
		logger.info("ToDo item creation date parsed in yyyy-MM-dd format is : {}", date);
		return todoRepository.findByCreatedDateAndEmployee(Date.valueOf(date), getEmployee(userName));
	}

	public List<TodoDetails> findAllByEmployeeId(String userName) {
		return todoRepository.findAllByEmployee(getEmployee(userName));
	}

	public TodoDetails updateTodos(TodoDetails todo, String username) throws Exception {
		
		logger.info("Inside updateTodos()");
		
		Optional<TodoDetails> todoDetails = todoRepository.findByTodoIdAndEmployee(todo.getTodoId(),
				getEmployee(username));
		if (todoDetails.isPresent()) {
			todoDetails.get().setCompleted(todo.isCompleted());
			todoDetails.get().setStartTime(todo.getStartTime());
			todoDetails.get().setTodoName(todo.getTodoName());

			return todoRepository.save(todoDetails.get());
		} else {
			logger.info("Todo item to be update could not be found for current user");
			throw new Exception("Todo item not found.");
		}
	}

	public void deleteTodoItem(long todoId, String username) throws Exception {
		
		logger.info("Inside deleteTodoItem()");
		
		Optional<TodoDetails> todoDetails = todoRepository.findByTodoIdAndEmployee(todoId, getEmployee(username));
		if (todoDetails.isPresent()) {
			logger.info("Todo item is being deleted");
			todoRepository.deleteById(todoId);
		} else {
			throw new Exception("Wrong todo id for the employee");
		}

	}
}
