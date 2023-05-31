package com.persistent.employeeportal.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

public class EmployeePortalAdvice extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleException(Exception e) {
		return new ResponseEntity<Object>(
				new EmployeePortalException("Internal Error", e.getMessage(), LocalDateTime.now()),
				HttpStatus.BAD_REQUEST);
	}

}
