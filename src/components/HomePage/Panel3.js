import React, { useEffect } from "react";

import "./Panel3.css";

import main3 from "../../images/main3.jpg";

import Aos from "aos";

import "aos/dist/aos.css";

const Panel3 = () => {

  useEffect(() => {

    Aos.init({ duration: 2000 });

  }, []);

  return (

    <div className="panel3-main-div">

      <div id="sectionToScrollPanel3">

        <div className="card-container-2">

          <div className="card-2" data-aos="fade-right">

            <h1>Happy Workforce!</h1>

            <span></span>

            <br></br>

            <p>

              This is an employee portal that can keep your employees happy and

              create a happy workforce. A good work culture environment and a

              culture is a need of your employees. An employee portal is a

              platform that gives you better employee database management,

              employess progress and more.

            </p>

            <p>

              {" "}

              This enriches the work experience of your employees. Getting

              appreciation for the efforts and hard work employees put in your

              business makes them feel happy.

            </p>

          </div>

          <div className="card-2" data-aos="fade-left">

            <img className="img-2" src={main3} alt="no image" />

          </div>

        </div>

      </div>

    </div>

  );

};




export default Panel3;