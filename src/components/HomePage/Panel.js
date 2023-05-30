import React, { useEffect, useRef } from "react";

import "./Panel.css";

import main1 from "../../images/main1.png";

import Aos from "aos";

import "aos/dist/aos.css";

import { MdKeyboardDoubleArrowDown } from "react-icons/md";

import "./GoToBottom.css";

import Cards from "./HomeCards";




const Panel = () => {

    useEffect(() => {

        Aos.init({ duration: 2000 });

    }, []);

    const cardsRef = useRef(null); // Create a reference to the Panel2 component




    const scrollToCards = () => {

        if (cardsRef.current) {

            cardsRef.current.scrollIntoView({ behavior: "smooth" });

        }

    };

    return (

        <div className="panel-main-div">

            <div className="card-container-3">

                <div className="card-3">

                    <h1 className="fade-in-text">

                        Enhance Productivity with Employee Portal

                    </h1>

                    <span></span>

                    <p></p>

                    <br></br>

                    <p>

                        With the employee portal, employees can easily save their

                        information and access it. They can set their to-do list and also

                        upload their resume on the portal.{" "}

                    </p>

                </div>

                <div className="card-3" data-aos="fade-left">

                    <img className="img-3" src={main1} alt="no image" />

                </div>

            </div>

            <div className="btm-btn" onClick={scrollToCards}>

                <MdKeyboardDoubleArrowDown />

            </div>

            <div ref={cardsRef}></div>

        </div>

    );

};




export default Panel;