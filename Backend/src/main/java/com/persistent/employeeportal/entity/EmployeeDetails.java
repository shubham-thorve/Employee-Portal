package com.persistent.employeeportal.entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "employee_details")
public class EmployeeDetails implements Serializable, UserDetails {
	public EmployeeDetails() {
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EmployeeDetails(String firstName, String lastName, String email, long employee_id, String password) {

		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.employeeId = employee_id;
		this.password = password;
	}

	@Id
	long employeeId;

	String firstName;
	String lastName;
	String email;

	@JsonIgnore
	String password;
	String governmentId;

	private String address;

	// @NotNull
	private Long phoneNo;

	private Long alternatePhoneNo;

	@Email
	private String personalEmail;
	private String maritalStatus;
	

	@JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Kolkata")
	private Date birthDate;
	
	@Lob
	@Column(name = "profile_photo", columnDefinition="LONGBLOB")
	private byte[] profilePhoto;

	public long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(long employee_id) {
		this.employeeId = employee_id;
	}

	public EmployeeDetails(String email, String password) {
		this.email = email;
		this.password = password;
	}

//    public long getId() {
//		return id;
//	}

	public EmployeeDetails(String firstName, String lastName, String email, String password) {
		super();
//		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}

//	public void setId(long id) {
//		this.id = id;
//	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return null;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	public String getGovernmentId() {
		return governmentId;
	}

	public void setGovernmentId(String governmentId) {
		this.governmentId = governmentId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(Long phoneNo) {
		this.phoneNo = phoneNo;
	}

	public Long getAlternatePhoneNo() {
		return alternatePhoneNo;
	}

	public void setAlternatePhoneNo(Long alternatePhoneNo) {
		this.alternatePhoneNo = alternatePhoneNo;
	}

	public String getPersonalEmail() {
		return personalEmail;
	}

	public void setPersonalEmail(String personalEmail) {
		this.personalEmail = personalEmail;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getMaritalStatus() {
		return maritalStatus;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}
	
	public byte[] getProfilePhoto() {
		return profilePhoto;
	}

	public void setProfilePhoto(byte[] profilePhoto) {
		this.profilePhoto = profilePhoto;
	}


}