package com.persistent.employeeportal.service;

import com.persistent.employeeportal.entity.ProfileDetails;
import com.persistent.employeeportal.exception.FileNotFoundException;
import com.persistent.employeeportal.exception.FileStorageException;
import com.persistent.employeeportal.exception.ResourceNotFoundException;

public interface IProfileService {

	public ProfileDetails fileUpload(ProfileDetails profileDetails) throws FileStorageException, ResourceNotFoundException, Exception;

	public ProfileDetails updateProfile(ProfileDetails profileDetails) throws FileStorageException, ResourceNotFoundException, Exception;

	public ProfileDetails downloadProfile(Long employeeId) throws FileNotFoundException, Exception;
	
	public String getFileName(Long employeeId) throws FileNotFoundException, Exception;

}
