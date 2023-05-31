package com.persistent.employeeportal.exception;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ExceptionHandlerControllerAdvice {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	
	public ResponseEntity<EmployeePortalException> handleException(MethodArgumentNotValidException e, WebRequest webRequest) {
		List<FieldError> errs = e.getBindingResult().getFieldErrors();
		String errorMessage = errs.stream().map(er -> er.getField() + "::" + er.getDefaultMessage())
				.collect(Collectors.joining(" || "));
		
		return new ResponseEntity<EmployeePortalException>(
				new EmployeePortalException("Validation Exception", errorMessage, LocalDateTime.now()),
				HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(FileNotFoundException.class)
	public ResponseEntity<EmployeePortalException> handlerFileNotFoundException(FileNotFoundException exception,
			WebRequest webRequest) {
		EmployeePortalException employeePortalException = new EmployeePortalException("FILE_NOT_FOUND",
				exception.getMessage(), LocalDateTime.now());
		return new ResponseEntity<>(employeePortalException, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(FileStorageException.class)
	public ResponseEntity<EmployeePortalException> handlerFileStorageException(FileStorageException exception,
			WebRequest webRequest) {
		EmployeePortalException employeePortalException = new EmployeePortalException("FILE_STORAGE_EXCEPTION",
				exception.getMessage(), LocalDateTime.now());
		return new ResponseEntity<>(employeePortalException, HttpStatus.BAD_REQUEST);

	}

	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ResponseEntity<EmployeePortalException> handlerMaxUploadSizeExceededException(
			MaxUploadSizeExceededException exception, WebRequest webRequest) {

		EmployeePortalException employeePortalException = new EmployeePortalException("MAX_UPLOAD_SIZE_EXCEEDED",
				exception.getMessage(), LocalDateTime.now());

		return new ResponseEntity<EmployeePortalException>(employeePortalException, HttpStatus.NOT_ACCEPTABLE);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<EmployeePortalException> handlerGlobalException(Exception exception, WebRequest webRequest) {
		EmployeePortalException employeePortalException = new EmployeePortalException("INTERNAL_SERVER_ERROR",
				exception.getMessage(), LocalDateTime.now());
		return new ResponseEntity<>(employeePortalException, HttpStatus.INTERNAL_SERVER_ERROR);

	}
}
