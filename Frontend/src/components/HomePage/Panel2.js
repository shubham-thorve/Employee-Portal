import React, { useEffect } from "react";

import "./Panel2.css";

import main2 from "../../images/main2.jpg";

import Aos from "aos";




import "aos/dist/aos.css";

const Panel2 = () => {

    useEffect(() => {

        Aos.init({ duration: 2000 });

    }, []);

    return (

        <div className="panel2-main-div">

            <div id="sectionToScrollPanel2">

                <div className="card-container-1">

                    <div className="card-panel" data-aos="fade-right">

                        <img className="img-1" src={main2} alt="no image" />

                    </div>

                    <div className="card-panel" data-aos="fade-left">

                        <h1>What is Employee Portal?</h1>

                        <span></span>

                        <br></br>

                        <p>

                            An employee portal can help your employees give their best efforts

                            every day to achieve the goals of your organisation. It guides and

                            manages employees efforts in the right direction. It also securely

                            stores and manages personal and other work-related details for

                            your employees.

                        </p>

                        <p>

                            In this portal, employees can save their personal information,

                            like their current company information and their experience, and

                            we also provided a to-do list in which employees can easily add

                            their work with date and time and mark it as complete or

                            incomplete. We provided a resume upload portal where employees

                            could upload their resumes.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};




export default Panel2;