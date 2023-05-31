package com.persistent.employeeportal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.persistent.employeeportal.entity.ProfileDetails;
import com.persistent.employeeportal.exception.FileStorageException;
import com.persistent.employeeportal.exception.ResourceNotFoundException;
import com.persistent.employeeportal.repository.ProfileDetailsRepository;
import com.persistent.employeeportal.service.IProfileService;
import com.persistent.employeeportal.exception.FileNotFoundException;

@Service
public class ProfileServiceImpl implements IProfileService {

	@Autowired
	public ProfileDetailsRepository profileDetailsRepository;

	@Override
	public ProfileDetails fileUpload(ProfileDetails profileDetails)
			throws FileStorageException, ResourceNotFoundException, Exception {		
		if (profileDetails.getDocumentName().contains("..")) { // Check if the file's name contains invalid characters
			throw new FileStorageException("Sorry! Filename contains invalid path sequence " + profileDetails.getDocumentName());
		}
		ProfileDetails searchProfile = profileDetailsRepository.findByEmpId(profileDetails.getEmployee().getEmployeeId());
		if (searchProfile != null) {
			throw new Exception(
					"Resume already present for employeeId: " + profileDetails.getEmployee().getEmployeeId());
		} else {
			ProfileDetails uploadedProfile = profileDetailsRepository.save(profileDetails);
			System.out.println(uploadedProfile);
			return uploadedProfile;
		}
	}

	@Override
	public ProfileDetails updateProfile(ProfileDetails profileDetails) 
			throws FileStorageException, ResourceNotFoundException, Exception {
			
			ProfileDetails updatedProfile;
			if (profileDetails.getDocumentName().contains("..")) { // Check if the file's name contains invalid characters
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + profileDetails.getDocumentName());
			}
			ProfileDetails searchProfile = profileDetailsRepository.findByEmpId(profileDetails.getEmployee().getEmployeeId());

			if (searchProfile != null) {
				searchProfile.setDocumentName(profileDetails.getDocumentName());
				searchProfile.setDocumentFile(profileDetails.getDocumentFile());
				searchProfile.setFileType(profileDetails.getFileType());
				updatedProfile = profileDetailsRepository.save(searchProfile);
			} else {
				throw new ResourceNotFoundException("Profile details not present for employeeId: "+ searchProfile.getEmployee().getEmployeeId());
			}
		return updatedProfile;
	}

	@Override
	public ProfileDetails downloadProfile(Long employeeId) throws FileNotFoundException, Exception {
		ProfileDetails profileDetails = null;
		profileDetails = profileDetailsRepository.findByEmpId(employeeId);

		if (profileDetails == null) {
			throw new FileNotFoundException("File not found");
		}
		
		return profileDetails;
	}

	@Override
	public String getFileName(Long employeeId) throws FileNotFoundException, Exception {
		ProfileDetails profileDetails = null;
		profileDetails = profileDetailsRepository.findByEmpId(employeeId);

		if (profileDetails == null) {
			throw new FileNotFoundException("File not found");
		}
		return profileDetails.getDocumentName();
	}

}
