import React, { useState , useEffect} from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../personalInformation/services/EmployeeService";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const myStyle = {
  color: "red",
  fontSize: "12px",
};
const Login = () => {
  const [email, emailUpdate] = useState("");
  const [password, passwordUpdate] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // const user = useContext(UserContext);
  const navigate = useNavigate();
  let token;
  let userEmail;


  const fetchName = () => {
    return new Promise((resolve, reject) => {
      EmployeeService.getEmployeeById()
        .then((res) => {
          const userName = `${res.data.firstName} ${res.data.lastName}`;
          sessionStorage.setItem("userName", userName);
          resolve(userName);
        })
        .catch((err) => reject(err));
    });
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
      setPasswordError("Wrong password");
    } else {
      setPasswordError(null);
    }
  };

  const ProceedLogin = (e) => {
    const credentials = {
      email,
      password,
    };
    validateEmail();
    validatePassword();
    e.preventDefault();
    if (emailError === null && passwordError === null) {
      // console.log(credentials)
      axios
        .post(
          "http://localhost:8085/employeeportal-service/employee_auth/signin",
          credentials
        )
        .then((res) => {
          token = res.data.jwtToken;
          userEmail = res.data.userName;
          sessionStorage.setItem("jwtToken", token);
          sessionStorage.setItem("email", userEmail);
          fetchName()
            .then((userName) => {
              Swal.fire(`Hi ${userName}! Login Successful`);
              navigate("/");
            })
            .catch((err) => {
              Swal.fire(`Login Successful`);
              navigate("/");
            });
        })
        .catch((err) => {
          toast.error("Invalid credentials / User not found!");
          console.log(err);
        });
    }
  };
  const handlebutton = () => {
    navigate("/register");
    // fetchName();
  };
  return (
    <div className="login_cont">
      <div className="">
        <div className="login_card_container offset-lg-2 col-lg-6">
          <form onSubmit={ProceedLogin} className="login_form_container">
            <div
              className="card"
              style={{
                // boxShadow:
                //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                backgroundColor: "transparent",
                border: "1px solid black",
              }}
            >
              <div className="card-header">
                <h4>EMPLOYEE LOGIN</h4>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>
                    Email <span className="errmsg">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => emailUpdate(e.target.value)}
                    className="form-control"
                    // required
                    placeholder="eg: abc@gmail.com"
                    onBlur={validateEmail}
                    style={{ borderColor: emailError ? "red" : "" }}
                  ></input>
                  {emailError && (
                    <p className="error" style={myStyle}>
                      {emailError}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Password <span className="errmsg">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => passwordUpdate(e.target.value)}
                    className="form-control"
                    // required
                    onBlur={validatePassword}
                    style={{ borderColor: passwordError ? "red" : "" }}
                  ></input>
                  {passwordError && (
                    <p className="error" style={myStyle}>
                      {passwordError}
                    </p>
                  )}
                </div>
              </div>
              <div className="card-footer">
                <button
                  type="submit"
                  className="login_btn"
                  // style={{ border: "1px solid black",backgroundColor:"#ff6d1f"}}
                >
                  Login
                </button>
                <button
                  className="login_btn"
                  // to={'/register'}
                  onClick={handlebutton}
                  // style={{ border: "1px solid black", marginLeft: "15px",backgroundColor:"#ff6d1f"}}
                >
                  New User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

