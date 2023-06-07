import React, { useState ,useEffect} from "react";
import myimg from "../../images/profile.jpeg"
import './Sidebar.scss';
import {
  FaBars,
  FaFileUpload,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaFilePdf,
  FaPen
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import EmployeeService from "../personalInformation/services/EmployeeService";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [profileImg, setProfileImg] = useState(""); // State variable for profile image URL

  useEffect(() => {
    fetchProfileImage();
  }, []);
  
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/uploadResume",
      name: "Upload Resume",
      icon: <FaFileUpload />,
    },
    {
      path: "/viewResume",
      name: "View Resume",
      icon: <FaFilePdf />,
    },
    {
      path: "/createResume",
      name: "Create Resume",
      icon: <FaPen />,
    },
  ];

  const social_links = [
    {
      name: "linkedin",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/feed/"
    },
    {
      name: "github",
      icon: <FaGithub />,
      link: "#"
    },
    {
      name: "facebook",
      icon: <FaFacebook />,
      link: "#"
    },
    {
      name: "twitter",
      icon: <FaTwitter />,
      link: "#"
    }
  ];


    const fetchProfileImage = () => {
      EmployeeService.getEmployeeById()
        .then((response) => {
          setProfileImg(response.data.profilePhoto);
        })
        .catch((error) => {
          console.log(error);
        });
    };


    // Get the file extension from the image data
// const fileExtension = getFileExtension(profilePhoto);
    
 

  return (
    <div className="resume-sidebar-container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="resume-sidebar">
        <div className="resume-top_section">
          <h6 style={{ display: isOpen ? "block" : "none" }} className="resume-logo">
            Resume
          </h6>
          <div style={{ marginLeft: isOpen ? "40px" : "0px" }} className="resume-bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div
          className="resume-mid_section"
          style={{ display: isOpen ? "flex" : "none" }}
        >
          {/* {profileImg && ( */}
          <img className="resume-profile_pic" src={profileImg ? `data:image;base64,${profileImg}`: myimg } alt="Profile Pic not uploaded" />
          {/* )} */}
          <p className="resume-username">{`${sessionStorage.getItem("userName")}`}</p>
        </div>

        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="resume-link " activeclassName="resume-active">
            <div className="resume-icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="resume-link_text "
              
            >
              {item.name}
            </div>
          </NavLink>
        ))}

        <div className="resume-social-links">
          {social_links.map((item, index) => (
            <a href={item.link} target="__blank" className="resume-link" key={index}>
              <div className="resume-icon">{item.icon}</div>
            </a>
          ))}
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
