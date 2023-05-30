import React, { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import emp1 from "../Images/emp1.png";
import Swal from "sweetalert2";
import axios from "axios";

const myStyle = {
	color: "red",
	fontSize: "12px",
  };

const AddEmployeeComponent = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [alternatePhoneNo, setAlternatePhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  let [birthDate, setBirthDate] = useState("");
  const [governmentId, setGovernmentId] = useState("");
  const navigate = useNavigate();
  const { id } = 1;
  console.log(id);

  const [employeeIdError, setEmployeeIdError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
 
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [altPhoneNumberError, setAltPhoneNumberError] = useState("");
  const [personalEmailError, setPersonalEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [governmentIDError, setGovernmentIDError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");



  const validateEmployeeId = () => {
    if (employeeId === "") {
      setEmployeeIdError("Employee ID is required");
    } else if (!/^\d{5}$/.test(employeeId)) {
      setEmployeeIdError("Employee ID must be a 5-digit number");
    } else {
      setEmployeeIdError(null);
    }
  };

  const validateFirstName = () => {
    if (firstName === "") {
      setFirstNameError("First name is required");
    } else if (/[^a-zA-Z]/.test(firstName)) {
      setFirstNameError(
        "First name should not contain special characters or numbers"
      );
    } else {
      setFirstNameError(null);
    }
  };

  const validateLastName = () => {
    if (lastName === "") {
      setLastNameError("Last name is required");
    } else if (/[^a-zA-Z]/.test(lastName)) {
      setLastNameError(
        "Last name should not contain special characters or numbers"
      );
    } else {
      setLastNameError(null);
    }
  };

  const validateEmail = () => {
    if (email === "") {
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError(null);
    }
  };

  const validatePhoneNumber=()=>{
	if(phoneNo===""){
		setPhoneNumberError("Phone number is required");
	}else if(!/^\d{10}$/.test(phoneNo)){
		setPhoneNumberError("Enter a valid Phone Number");
	}else{
		setPhoneNumberError(null);
	}
  }

  const validateAltPhoneNumber=()=>{

	if(!/^\d{10}$/.test(phoneNo)){
		setAltPhoneNumberError("Enter a valid Phone Number");
	}else{
		setAltPhoneNumberError(null);
	}
  }

  const validatePersonalEmailId=()=>{
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		setPersonalEmailError("Enter a valid email address");
	}else{
		setPersonalEmailError(null);
	}
  }

  const validateAddress=()=>{
	if(address===""){
		setAddressError("Address is required");
	}else{
		setAddressError(null);
	}
  }

  const validateGovernamentId=()=>{
	if(governmentId===""){
		setGovernmentIDError("Govt Id is required")
	}else if(!/^[a-zA-Z0-9]{6,12}$/.test(governmentId)){
		setGovernmentIDError("Enter a valid Govt Id")
	}else{
		setGovernmentIDError(null);
	}
  }

  const validateDOB=()=>{
	if(birthDate===""){
		setDateOfBirthError("DOB is required")
	}else {
       setDateOfBirthError(null);
	}
  }
  


  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

	validateEmployeeId();
    validateFirstName();
    validateLastName();
    validateEmail();
	validatePhoneNumber();
	validateAddress();
	validateAltPhoneNumber();
	validatePersonalEmailId();
	validateGovernamentId();
	validateDOB();

    console.log(birthDate);
    var dateSplit = birthDate.split("-");
    var sampleDate = dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];
    console.log(sampleDate);
    birthDate = sampleDate;

    // this.setState({birthDate:sampleDate})

    const employee = {
      employeeId,
      firstName,
      lastName,
      email,
      phoneNo,
      alternatePhoneNo,
      address,
      personalEmail,
      governmentId,
      birthDate,
    };
    console.log(employee);
	if (
		employeeIdError === null &&
		firstNameError === null &&
		lastNameError === null &&
		emailError === null &&
		phoneNumberError=== null &&
		altPhoneNumberError===null &&
		personalEmailError===null &&
		governmentIDError===null &&
		dateOfBirthError===null &&
		addressError===null

	  ) {

    EmployeeService.updateEmployee(id, employee)
      .then((response) => {
        Swal.fire("Submitted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    // } else {
    //   EmployeeService.createEmployee(employee)
    //     .then((response) => {
    //       navigate(`/${response.data.employeeId}`);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
	  }
  };


  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        setEmployeeId(response.data.employeeId);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPhoneNo(response.data.phoneNo);
        setAlternatePhoneNo(response.data.alternatePhoneNo);
        setAddress(response.data.address);
        setGovernmentId(response.data.governmentId);
        setPersonalEmail(response.data.personalEmail);
        console.log(response.data.birthDate);
        if (response.data.birthDate != null) {
          let datePlit = response.data.birthDate.split("-");
          setBirthDate(datePlit[2] + "-" + datePlit[1] + "-" + datePlit[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (employeeId) {
      return <h2 className="text-center">Update Personal Information</h2>;
    } else {
      return <h2 className="text-center">Add Personal Information</h2>;
    }
  };

  return (
    <div>
      {/* <br />
			<br /> */}
      <div
        className="container-fluid"
        style={{
          backgroundColor: "antiquewhite",
          height: "100%",
          width: "100%",
          padding: "70px 0px 70px 0px",
        }}
      >
        <div className="row">
          <div className="col-md-9 col-lg-6 col-xl-6">
            <center>
              {/* <img className="responsive" src={emp1} style={{ width: '500px', height: '350px', marginLeft: '520px', marginTop: "1px", opacity: "0.8" }} alt="no_Image" /> */}
            </center>
          </div>
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form onSubmit={saveOrUpdateEmployee}>
                <img
                  className="responsive"
                  src={emp1}
                  style={{
                    width: "80%",
                    height: "150px",
                    marginLeft: "25px",
                    marginTop: "1px",
                    opacity: "0.8",
                  }}
                  alt="no_Image"
                />

                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    Employee Id
                    <span className="errmsg" style={{ color: "red" }}>
                      *
                    </span>{" "}
                    :{" "}
                  </label>

                  <input
                    type="number"
                    min="1000"
                    max="99999"
                    placeholder="Enter Employee Id"
                    name="employeeId"
                    required
                    className="form-control"
                    value={employeeId}
                    // onChange={(e) => setEmployeeId(e.target.value)}
                    disabled
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    First Name
                    <span className="errmsg" style={{ color: "red" }}>
                      *
                    </span>{" "}
                    :{" "}
                  </label>

                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    // required
                    // pattern="^[A-Za-z.\\s]+$"
                    onChange={(e) => setFirstName(e.target.value)}
					onBlur={validateFirstName}
					style={{ borderColor: firstNameError ? "red" : "" }}
                  ></input>
				   {firstNameError && (
                        <p className="error" style={myStyle}>
                          {firstNameError}
                        </p>
                      )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    Last Name
                    <span className="errmsg" style={{ color: "red" }}>
                      *
                    </span>{" "}
                    :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    // required
                    // pattern="^[A-Za-z.\\s]+$"
                    onChange={(e) => setLastName(e.target.value)}
					onBlur={validateLastName}
                    style={{ borderColor: lastNameError ? "red" : "" }}
                  ></input>
				   {lastNameError && (
                        <p className="error" style={myStyle}>
                          {lastNameError}
                        </p>
                      )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    Email Id
                    <span className="errmsg" style={{ color: "red" }}>
                      *
                    </span>{" "}
                    :{" "}
                  </label>

                  <input
                    type="email"
                    // pattern=".+@globex\.com"
                    placeholder="Enter email Id (ex:abc@gmail.com)"
                    name="email"
                    className="form-control"
                    value={email}
                    required
                    // onChange={(e) => setEmail(e.target.value)}
                    disabled
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    Phone Number
                    <span className="errmsg" style={{ color: "red" }}>
                      *
                    </span>
                    :{" "}
                  </label>

                  <input
                    type="number"
                    placeholder="Enter Phone Number (ex:9823543211) "
                    name="phoneNo"
                    // pattern="[0-9]{10}"
                    className="form-control"
                    value={phoneNo}
                    // required
                    onChange={(e) => setPhoneNo(e.target.value)}
					onBlur={validatePhoneNumber}
                    style={{ borderColor: phoneNumberError ? "red" : "" }}
                  ></input>
				   {phoneNumberError && (
                        <p className="error" style={myStyle}>
                          {phoneNumberError}
                        </p>
                      )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    Alternate Phone Number :
                  </label>

                  <input
                    type="number"
                    placeholder="Enter Alternate Phone Number (ex:9876543211)"
                    // pattern="[0-9]{10}"
                    name="alternatPphoneNo"
                    className="form-control"
                    value={alternatePhoneNo}
                    onChange={(e) => setAlternatePhoneNo(e.target.value)}
					onBlur={validateAltPhoneNumber}
                    style={{ borderColor: altPhoneNumberError ? "red" : "" }}
                  ></input>
				   {altPhoneNumberError && (
                        <p className="error" style={myStyle}>
                          {altPhoneNumberError}
                        </p>
                      )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Personal Email Id: </label>

                  <input
                    type="email"
                    // pattern=".+@globex\.com"
                    placeholder="Enter personal email Id"
                    name="personalEmail"
                    className="form-control"
                    value={personalEmail}
                    onChange={(e) => setPersonalEmail(e.target.value)}
					onBlur={validatePersonalEmailId}
                        style={{ borderColor: personalEmailError ? "red" : "" }}
                  ></input>
				    {personalEmailError && (
                        <p className="error" style={myStyle}>
                          {personalEmailError}
                        </p>
                      )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    Address
                    <span className="errmsg" style={{ color: "red" }}>
                      *
                    </span>{" "}
                    :{" "}
                  </label>

                  <input
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    className="form-control"
                    value={address}
                    // required
                    onChange={(e) => setAddress(e.target.value)}
					onBlur={validateAddress}
                        style={{ borderColor: addressError ? "red" : "" }}
                  ></input>
				    {addressError && (
                        <p className="error" style={myStyle}>
                          {addressError}
                        </p>
                      )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    GovernmentId
                    <span className="errmsg" style={{ color: "red" }}>
                      *
                    </span>{" "}
                    :{" "}
                  </label>

                  <input
                    type="text"
                    placeholder="Enter Government Id "
                    name="governmentId"
                    className="form-control"
                    value={governmentId}
                    required
                    onChange={(e) => setGovernmentId(e.target.value)}
					
					onBlur={validateGovernamentId}
                    style={{ borderColor: governmentIDError ? "red" : "" }}
                  ></input>
				    { governmentIDError && (
                        <p className="error" style={myStyle}>
                          { governmentIDError}
                        </p>
                      )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    Birth Date
                    <span className="errmsg" style={{ color: "red" }}>
                      *
                    </span>{" "}
                    :{" "}
                  </label>

                  <input
                    type="date"
                    placeholder="Enter your date of birth"
                    name="birthDate"
                    className="form-control"
                    value={birthDate}
                    // required
                    onChange={(e) => {
                      console.log("Selected Date :");

                      console.log(e.target.value);

                      setBirthDate(e.target.value);
                    }}
					onBlur={validateDOB}
                        style={{ borderColor: dateOfBirthError ? "red" : "" }}
                  ></input>
				    { dateOfBirthError  && (
                        <p className="error" style={myStyle}>
                          {  dateOfBirthError }
                        </p>
                      )}
                </div>

                <button className="btn btn-success" style={{margin:"10px"}} type="submit">
                  Submit{" "}
                </button>
                <Link to={`/PersonalInfo`} className="btn btn-danger">
                  {" "}
                  Cancel
                </Link>
                {/* <Link to={`/Personalinfo`}>
                  <button className="update" style={{ marginLeft: "54%" }}>
                    View updated details
                  </button>
                </Link> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;