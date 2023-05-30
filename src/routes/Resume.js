import { useNavigate } from "react-router-dom";

import React from "react";

// import { useAuth } from "../components/Auth";

import Navbar from "../components/Navbar/Navbar";

import Footer from "../components/Footer/Footer";

import Sidebar from "../components/resume/Sidebar";

import { Outlet } from 'react-router-dom';





const Resume = () => {

  // const auth = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    // auth.logout();

    navigate("/");

  };

  return (

    <>

      <Navbar />

      <div style={{display:"flex"}}>

      <Sidebar/>

      <Outlet/>

        {/* Resume Page {auth.user} */}

        {/* <button onClick={handleLogout}>Logout</button> */}

      </div>

    </>

  );

};





export default Resume;