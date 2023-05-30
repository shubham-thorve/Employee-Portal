import { Link, useNavigate, useLocation } from "react-router-dom";

import "./NavbarStyles.css";
import React, { useState} from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import Swal from "sweetalert2";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaCheckCircle,
  FaUserAlt,
  FaBook,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState("false");
  const location = useLocation();
  const [userName, setUserName] = useState("");

  const handleClick = () => {
    setClick(!click);
  };

  // const clearAllCookies = () => {
  //   const cookies = Cookies.get();

  //   // Loop through all cookies and remove them
  //   Object.keys(cookies).forEach((cookieName) => {
  //     Cookies.remove(cookieName);
  //   });
  // };

  const handleLogout = () => {
    const token = localStorage.getItem("jwtToken");
    const varEmail = localStorage.getItem("email");
    console.log("logged out");
    axios
      .post(
        "http://localhost:8085/employeeportal-service/employee_auth/logout",
        {
          email: varEmail, //varEmail is a variable which holds the email
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        // setUserName("");
        localStorage.clear();
        // clearAllCookies();
        Swal.fire("Logout Successful");
        navigate("/");
      })

      .catch((err) => console.log(err));
    localStorage.clear();
    Swal.fire("Logout Successful");
    navigate("/");
  };

  //update username when user context changes
  // useEffect(() => {
  //   if (user) {
  //     console.log(user);
  //     console.log(user.firstName);
  //     setUserName(`${user.firstName} ${user.lastName}`);
  //   }
  // }, [user]);

  return (
    <div className="header">
      <Link to="/">
        <img
          className="logo"
          src="https://tse2.mm.bing.net/th/id/OIP.GlnVhpILKika1QBHYP7s5gHaHa?w=191&h=192&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        />
      </Link>
      {localStorage.getItem("jwtToken") !==null && (
        <div>
          <Tippy content={`You have logged in to the Employee Portal`}>
            <span className="username">{`Hi, ${localStorage.getItem("userName")} !`}</span>
          </Tippy>
        </div>
      )}
      <ul className={!click ? "nav-menu nav-menu-active" : "nav-menu"}>
        <li
          className={`${
            location.pathname === "/" ? "main-nav-active" : ""
          } nav-item `}
        >
          <Tippy content="HOME">
            <Link to="/">
              <FaHome className="icons-nav" />
            </Link>
          </Tippy>
        </li>
        <li
          className={`${
            location.pathname === "/personalinfo" ? "main-nav-active" : ""
          } nav-item `}
        >
          <Tippy content="PERSONAL INFO">
            <Link to="/personalinfo" onClick={handleClick}>
              <FaUserAlt className="icons-nav" />
            </Link>
          </Tippy>
        </li>

        <li
          className={`${
            location.pathname === "/viewResume" ? "main-nav-active" : ""
          } nav-item `}
        >
          <Tippy content="RESUME">
            <Link to="/viewResume" onClick={handleClick}>
              <FaBook className="icons-nav" />
            </Link>
          </Tippy>
        </li>

        <li
          className={`${
            location.pathname === "/todo" ? "main-nav-active" : ""
          } nav-item `}
        >
          <Tippy content="TODO">
            <Link to="/todo" onClick={handleClick}>
              <FaCheckCircle className="icons-nav" />
            </Link>
          </Tippy>
          {/* <Todo isLoggedIn={this.props.isLoggedIn} /> */}
        </li>

        <li
          className={`${
            location.pathname === "/login" ? "main-nav-active" : ""
          } nav-item `}
        >
          {localStorage.getItem("jwtToken") == null && (
            <Tippy content="LOGIN">
              <Link to="/login" onClick={handleClick}>
                <FaSignInAlt className="icons-nav" />
              </Link>
            </Tippy>
          )}
          {localStorage.getItem("jwtToken") != null && (
            <Tippy content="LOGOUT">
              <a onClick={handleLogout}>
                <FaSignOutAlt className="icons-nav" />
              </a>
            </Tippy>
          )}
        </li>
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaBars size={20} style={{ color: "black" }} />
        ) : (
          <FaTimes size={20} style={{ color: "black" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
