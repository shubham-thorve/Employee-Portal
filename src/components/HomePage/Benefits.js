import React from "react";




import "./Benefits.css";




import "/node_modules/bootstrap/dist/css/bootstrap.min.css";




import ReadMore from "./ReadMore";




import "./HomeCards.css";




const Benefits = () => {

  const longText =

    "Ensuring that the employee portal is optimized for mobile devices allows employees to access it easily from their smartphones or tablets, increasing convenience and accessibility.";




  const longText2 =

    "Employee portals often include self-service features that empower employees to perform various tasks independently. This can include updating personal information, submitting tasks, Uploading resume and Updating. ";




  const longText3 =

    "The Personal Information Page in the Employee Portal allows you to add/update the profile details of an employee. The page helps you to keep accurate and up-to-date records of employee information, job history, and personal details ";




  return (

    <div className="benifits">

      <div id="sectionToScrollBenefit">

        <section className="section1">

          <h1 className="left-to-right">BENEFITS OF THE EMPLOYEE PORTAL</h1>

        </section>




        <div class="container text-center">

          <div class="row">

            <div class="col">

              <div

                class="card"

                style={{

                  boxShadow: "5px 5px rgba(20,20,20,0.4)",

                  width: " 22rem",

                }}

              >

                <img

                  src="https://www.manageengine.com/secure-remote-access-software/images/banner.svg"

                  height="180px"

                  class="card-img-top"

                  alt="..."

                />




                <div class="card-body">

                  <h5 style={{ color: "#f25c05" }} class="card-title">

                    REMOTE ACCESSIBILITY

                  </h5>




                  <ReadMore text={longText} maxLength={100} />

                </div>

              </div>

            </div>




            <div class="col">

              <div

                class="card"

                style={{

                  boxShadow: "5px 5px rgba(20,20,20,0.4)",

                  width: " 22rem",

                }}

              >

                <img

                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Yl_ASXauGCWqhHX8nhB4XLr4byHoDSV5Wg&usqp=CAU"

                  height="180px"

                  class="card-img-top"

                  alt="..."

                />




                <div class="card-body">

                  <h5 style={{ color: "#f25c05" }} class="card-title">

                    EMPLOYEE ENGAGEMENT

                  </h5>




                  <ReadMore text={longText2} maxLength={100} />

                </div>

              </div>

            </div>




            <div class="col">

              <div

                class="card"

                style={{

                  boxShadow: "5px 5px rgba(20,20,20,0.4)",

                  width: " 22rem",

                }}

              >

                <img

                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg6X-JfJiyVlsrQIWYp6QqqcgieurJk_-zGQ&usqp=CAU"

                  height="180px"

                  class="card-img-top"

                  alt="..."

                />




                <div class="card-body">

                  <h5 style={{ color: "#f25c05" }} class="card-title">

                    UPDATE EMPLOYEE INFORMATION

                  </h5>




                  <ReadMore text={longText3} maxLength={100} />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};




export default Benefits;