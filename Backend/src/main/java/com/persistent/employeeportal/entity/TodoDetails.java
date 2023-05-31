package com.persistent.employeeportal.entity;

import java.sql.Date;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class TodoDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long todoId;

	@NotBlank(message = "Todo name is required")
	@Size(min = 3, message = "Minimum 3 character required")
	private String todoName;

	public EmployeeDetails getEmployee() {
		return employee;
	}

	public void setEmployee(EmployeeDetails employee) {
		this.employee = employee;
	}

	@JsonFormat(pattern = "hh:mm a", timezone = "Asia/Kolkata")
	private LocalTime startTime;

	@JsonProperty("isCompleted")
	private boolean isCompleted;

	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Kolkata")
	private Date createdDate;

//	private long employeeId;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="employee_id", nullable=false)
	EmployeeDetails employee;

	public long getTodoId() {
		return todoId;
	}

	public void setTodoId(long todoId) {
		this.todoId = todoId;
	}

	public String getTodoName() {
		return todoName;
	}

	public void setTodoName(String todoName) {
		this.todoName = todoName;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public boolean isCompleted() {
		return isCompleted;
	}

	public void setCompleted(boolean isCompleted) {
		this.isCompleted = isCompleted;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	/*
	 * public long getEmployeeId() { return employeeId; }
	 * 
	 * public void setEmployeeId(long employeeId) { this.employeeId = employeeId; }
	 */

}
