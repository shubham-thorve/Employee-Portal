import { Link } from "react-router-dom";
import "./NavbarStyles.css";
import React, { useEffect, useState } from 'react'
import { FaBars , FaTimes} from "react-icons/fa";
import {toast} from 'react-toastify';
// import "react-toastify/dist/React-Toastify.css";


const Navbar = () => {
    const [click, setClick]=useState('false');

    const handleClick= () => setClick(!click);
    // {
    //     window.alert("Login First");
    // }

  return (
    <div className="header">
        <Link to="/">
            <img className="logo" src="https://tse4.mm.bing.net/th/id/OIP.bTWaiIirNZvVO2UDJMBoHwAAAA?pid=ImgDet&rs=1"/>
        </Link>
        <ul className={click ? "nav-menu active" :
    "nav-menu"}>
            <li className="nav-item">
                <Link to="/"  >Home</Link>
            </li>
            <li>
                <Link to="/login" onClick={handleClick}>Todo</Link>
            </li>
            <li>
                <Link to="/login" onClick={handleClick}>Resume</Link>
            </li>
            <li>
                <Link to="/login" onClick={handleClick}>Login</Link>
            </li>
        </ul>
        <div className="hamburger" onClick={handleClick}>
           {click ? (
            <FaTimes size={20} style={{color: "black"}
            }/>
           ) :(
            <FaBars size={20} style={{color: "black"}
            }/>
           )}

        </div>
    </div>
  )
}

export default Navbar
