package com.persistent.employeeportal.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class MaxUploadSizeExceededException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public MaxUploadSizeExceededException(String message) {
		super(message);
	}

	public MaxUploadSizeExceededException(String message, Throwable cause) {
		super(message, cause);
	}

}
