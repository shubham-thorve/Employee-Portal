import { useState } from "react";

import axios from "axios";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const myStyle = {
  color: "red",
  fontSize: "12px",
};

const Register = () => {
  const [employeeId, employeeIdChange] = useState("");
  const [firstName, firstnamechange] = useState("");
  const [lastName, lastnamechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailChange] = useState("");
  const navigate = useNavigate();

  const [employeeIdError, setEmployeeIdError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const isSmallScreen = window.innerWidth < 768;

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

  const validatePassword = () => {
    if (password === "" || password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
    } else {
      setPasswordError(null);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    validateEmployeeId();
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePassword();

    if (
      employeeIdError === null &&
      firstNameError === null &&
      lastNameError === null &&
      emailError === null &&
      passwordError === null
    ) {
      axios
        .post(
          "http://localhost:8085/employeeportal-service/employee_auth/signup",
          {
            employeeId: employeeId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }
        )
        .then((response) => {
          Swal.fire({ icon: 'Success',
          title: 'Success!',
          text:`Hi, Welcome to the Employee Portal. Login to explore the features!`,});
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed :" + err.response.data);
        });
    }
  };
  const handlebutton=()=>{
    navigate('/login')
  }

  return (
    <div className="bg-Container">
      
      <div>
        <div className="offset-lg-2 col-lg-6 regist_formContainer">
          <form onSubmit={handlesubmit} className="register_form_container">
            <div className="card" style={{backgroundColor:"transparent"}}>
              <div className="card-header">
                <h1>User Registeration</h1>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Employee Id <span className="errmsg">*</span>
                      </label>
                      <input
                        type="number"
                        value={employeeId}
                        onChange={(e) => employeeIdChange(e.target.value)}
                        onBlur={validateEmployeeId}
                        style={{ borderColor: employeeIdError ? "red" : "" }}
                        className="form-control"
                      ></input>
                      {employeeIdError && (
                        <p className="error" style={myStyle}>
                          {employeeIdError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        First Name <span className="errmsg">*</span>
                      </label>
                      <input
                      type="text"
                        value={firstName}
                        onChange={(e) => firstnamechange(e.target.value)}
                        onBlur={validateFirstName}
                        placeholder="eg: john"
                        style={{ borderColor: firstNameError ? "red" : "" }}
                        className="form-control"
                      ></input>
                      {firstNameError && (
                        <p className="error" style={myStyle}>
                          {firstNameError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Last Name <span className="errmsg">*</span>
                      </label>
                      <input
                      type="text"
                        value={lastName}
                        placeholder="eg: wick"
                        onChange={(e) => lastnamechange(e.target.value)}
                        onBlur={validateLastName}
                        style={{ borderColor: lastNameError ? "red" : "" }}
                        className="form-control"
                      ></input>
                      {lastNameError && (
                        <p className="error" style={myStyle}>
                          {lastNameError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Email <span className="errmsg">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="eg: user@abc.com"
                        value={email}
                        onChange={(e) => emailChange(e.target.value)}
                        onBlur={validateEmail}
                        style={{ borderColor: emailError ? "red" : "" }}
                        className="form-control"
                      ></input>
                      {emailError && (
                        <p className="error" style={myStyle}>
                          {emailError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Password <span className="errmsg">*</span>
                      </label>
                      <input
                        value={password}
                        type="password"
                        onChange={(e) => passwordchange(e.target.value)}
                       
                        onBlur={validatePassword}
                        style={{ borderColor: passwordError ? "red" : "" }}
                        className="form-control"
                      ></input>
                      {passwordError && (
                        <p className="error" style={myStyle}>
                          {passwordError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="register_btn">
                  Register
                </button>
                
                <button onClick={handlebutton} className="register_btn">
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
