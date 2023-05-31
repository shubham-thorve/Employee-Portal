package com.persistent.employeeportal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.entity.TodoDetails;
import com.persistent.employeeportal.repository.PersonalInformationRepository;
import com.persistent.employeeportal.repository.TodoRepository;
import com.persistent.employeeportal.service.impl.TodoServiceImpl;

@SpringBootTest
public class TodoServiceImplTest {

	@Autowired
	TodoServiceImpl todoServiceImpl;

	@MockBean
	TodoRepository todoRepository;

	@MockBean
	PersonalInformationRepository personInfoRepository;

	private TodoDetails todoDetails;
	
	private EmployeeDetails empDetails;

	@BeforeEach
	public void initializeTodo() {

		TodoDetails todoDetails = new TodoDetails();
		todoDetails.setTodoId(1L);
		todoDetails.setTodoName("Task");

		DateTimeFormatter format = DateTimeFormatter.ofPattern("hh:mm a");

		todoDetails.setStartTime(LocalTime.parse("11:50 PM", format));
		todoDetails.setCreatedDate(Date.valueOf("2023-06-12"));
		todoDetails.setCompleted(false);

		
			EmployeeDetails empDetails = new EmployeeDetails("Ajay", "Singh", "abc@xyz.com", 2, "abcd");
		
		todoDetails.setEmployee(empDetails);
		
		this.todoDetails = todoDetails;
		this.empDetails = empDetails;
	}
	
	@Test
	public void getEmployeeTest() {
		when(personInfoRepository.findByEmail("abc@xyz.com")).thenReturn(empDetails);
		todoServiceImpl.getEmployee("abc@xyz.com");
		verify(personInfoRepository, times(1)).findByEmail("abc@xyz.com");
		
		// Negative case
		
		when(personInfoRepository.findByEmail("pqr@xyz.com")).thenReturn(null);
		assertEquals(null, todoServiceImpl.getEmployee("pqr@xyz.com"));
		verify(personInfoRepository, times(1)).findByEmail("pqr@xyz.com");
	}

	@Test
	public void testSaveTodo() throws Exception {

		when(todoRepository.save(todoDetails)).thenReturn(todoDetails);
		
		when(personInfoRepository.findByEmail("abc@xyz.com")).thenReturn(empDetails);
		
		TodoDetails todo = todoServiceImpl.saveTodo(todoDetails, "abc@xyz.com");
		assertEquals(2, todo.getEmployee().getEmployeeId());
		
		// Negative case
		
		TodoDetails todoDetails1 = new TodoDetails();
		todoDetails1.setTodoId(1L);
		todoDetails1.setTodoName("Task");

		DateTimeFormatter format = DateTimeFormatter.ofPattern("hh:mm a");

		todoDetails1.setStartTime(LocalTime.parse("11:50 PM", format));
		todoDetails1.setCreatedDate(Date.valueOf("2023-05-01"));
		todoDetails1.setCompleted(false);
		todoDetails1.setEmployee(empDetails);
		
		Exception ex = assertThrows(Exception.class, () -> todoServiceImpl.saveTodo(todoDetails1, "abc@xyz.com"));
		assertFalse(ex.getMessage().contains("Task creation date should be present or future date"));
	}

	@Test
	public void findByCreatedDateAndEmployeeIdTest() {

		List<TodoDetails> todoList = new ArrayList<>();
		todoList.add(todoDetails);
		
		when(todoRepository.findByCreatedDateAndEmployee(Date.valueOf("2023-05-11"), empDetails)).thenReturn(todoList);
		when(personInfoRepository.findByEmail("abc@xyz.com")).thenReturn(empDetails);
		
		assertEquals(1, todoServiceImpl.findByCreatedDateAndEmployeeId("2023-05-11", "abc@xyz.com").size());
		
		// Negative Scenario
		
		assertThrows(DateTimeParseException.class, () -> todoServiceImpl.findByCreatedDateAndEmployeeId("20230511", "abc@xyz.com"));
		
	}

	
	@Test
	public void testFindAllByEmployeeId() {

		List<TodoDetails> todoList = new ArrayList<>();
		todoList.add(todoDetails);
		when(todoRepository.findAllByEmployee(empDetails)).thenReturn(todoList);
		when(personInfoRepository.findByEmail("abc@xyz.com")).thenReturn(empDetails);
		
		assertEquals(1, todoServiceImpl.findAllByEmployeeId("abc@xyz.com").size());
	}

	@Test
	public void testUpdateTodo() throws Exception {

		when(todoRepository.findByTodoIdAndEmployee(todoDetails.getTodoId(), empDetails))
				.thenReturn(Optional.of(todoDetails));

		when(personInfoRepository.findByEmail("abc@xyz.com")).thenReturn(empDetails);
		
		when(todoRepository.save(todoDetails)).thenReturn(todoDetails);

		assertEquals(2L, todoServiceImpl.updateTodos(todoDetails, "abc@xyz.com").getEmployee().getEmployeeId());
		
		// Negetive scenario
		
		when(todoRepository.findByTodoIdAndEmployee(todoDetails.getTodoId(), empDetails))
		.thenReturn(null);
		
		TodoDetails todoDetails1 = new TodoDetails();
		todoDetails1.setTodoId(3);
		todoDetails1.setTodoName("Task");

		DateTimeFormatter format = DateTimeFormatter.ofPattern("hh:mm a");

		todoDetails1.setStartTime(LocalTime.parse("11:50 PM", format));
		todoDetails1.setCreatedDate(Date.valueOf("2023-05-12"));
		todoDetails1.setCompleted(false);
		
			EmployeeDetails empDetails1 = new EmployeeDetails("Ajay", "Singh", "abc@xyz.com", 2, "abcd");
			
		todoDetails1.setEmployee(empDetails1);
		
		Exception ex = assertThrows(Exception.class, () -> todoServiceImpl.updateTodos(todoDetails1, "abc@xyz.com"));
		assertTrue(ex.getMessage().contains("Todo item not found."));
	}

	@Test
	public void testDeleteTodo() throws Exception {

		when(todoRepository.findByTodoIdAndEmployee(todoDetails.getTodoId(), empDetails))
				.thenReturn(Optional.of(todoDetails));
		
		when(personInfoRepository.findByEmail("abc@xyz.com")).thenReturn(empDetails);
		
		todoServiceImpl.deleteTodoItem(todoDetails.getTodoId(), "abc@xyz.com");
		verify(todoRepository, times(1)).deleteById(todoDetails.getTodoId());
		
		// Negative scenario
		
		when(todoRepository.findByTodoIdAndEmployee(todoDetails.getTodoId(), empDetails))
		.thenReturn(null);
				
		Exception ex = assertThrows(Exception.class, () -> todoServiceImpl.deleteTodoItem(3, "abc@xyz.com"));
		assertTrue(ex.getMessage().contains("Wrong todo id for the employee"));
		
	}

}
