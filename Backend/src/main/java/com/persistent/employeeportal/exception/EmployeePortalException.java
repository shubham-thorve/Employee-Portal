package com.persistent.employeeportal.exception;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@NoArgsConstructor
public class EmployeePortalException {
	
	String message;
	String details;
	LocalDateTime dateTime;
	
	public EmployeePortalException(String message, String details, LocalDateTime dateTime)
	{
		this.message = message;
		this.details = details;
		this.dateTime = dateTime;
	}

}

