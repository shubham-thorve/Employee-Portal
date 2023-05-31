import React from "react";




import "/node_modules/bootstrap/dist/css/bootstrap.min.css";




import { Link } from "react-scroll";




import { MdOutlineKeyboardArrowDown } from "react-icons/md";




import "./HomeCards.css";




const HomeCards = () => {

  return (

    <>

      <div className="container" style={{ marginTop: "100px" }}>

        <div class="row">

          <div className="col">

            <div

              class="card"

              style={{

                boxShadow: "5px 5px rgba(20,20,20,0.4)",

                width: " 22rem",

              }}

            >

              <img

                class="card-img-top"

                src="https://cdn2.hubspot.net/hubfs/5242301/Blog%20Images/Happy%20Employee%20Dovetail%20Employee%20Portal.jpg"

                height="220"

                alt="Card image cap"

              />




              <div class="card-body">

                <h3 class="card-title" style={{ textAlign: "center" }}>

                  EMPLOYEE PORTAL

                </h3>




                <Link

                  to="sectionToScrollPanel2"

                  smooth={true}

                  class="card-text"

                  style={{ textDecoration: "none", cursor: "pointer" }}

                >

                  Explore More

                  <MdOutlineKeyboardArrowDown />

                </Link>

              </div>

            </div>

          </div>




          <div className="col">

            <div

              class="card"

              style={{

                boxShadow: "5px 5px rgba(20,20,20,0.4)",

                width: " 22rem",

              }}

            >

              <img

                class="card-img-top"

                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGDSrzaLTrE7MAyKmipWOk88wimy62t5K-Q&usqp=CAU"

                alt="Card image cap"

                height="220"

              />




              <div class="card-body">

                <h3 class="card-title" style={{ textAlign: "center" }}>

                  HAPPY WORKFORCE

                </h3>




                <Link

                  to="sectionToScrollPanel3"

                  smooth={true}

                  class="card-text"

                  style={{ textDecoration: "none", cursor: "pointer" }}

                >

                  Explore More

                  <MdOutlineKeyboardArrowDown />

                </Link>

              </div>

            </div>

          </div>




          <div className="col">

            <div

              class="card"

              style={{

                boxShadow: "5px 5px rgba(20,20,20,0.4)",

                width: " 22rem",

              }}

            >

              <img

                class="card-img-top"

                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp8uOFO0U4QMBIx_zXmhQO1W6acURjEhcPjA&usqp=CAU"

                height="220"

                alt="Card image cap"

              />




              <div class="card-body">

                <h3 class="card-title" style={{ textAlign: "center" }}>

                  BENEFITS OF PORTAL

                </h3>




                <Link

                  to="sectionToScrollBenefit"

                  smooth={true}

                  class="card-text"

                  style={{ textDecoration: "none", cursor: "pointer" }}

                >

                  Explore More

                  <MdOutlineKeyboardArrowDown />

                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  );

};




export default HomeCards;