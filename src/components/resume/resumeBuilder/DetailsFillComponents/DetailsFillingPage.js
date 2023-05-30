import {React, useState} from "react";
import { Link, Routes, Route,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PersonalInfo from "./PersonalInfo";
import WorkEx from "./WorkEx";
import Education from "./Education";
import KeySkills from "./KeySkills";
import { updateState } from "../ReduxManager/dataStoreSlice";
import Sidebar from "../../Sidebar";
import swal from "sweetalert2";

import "../resumeBuilder.scss";

function DetailsFillingPage() {
  const dispatch = useDispatch();
  //errorMessages variable store all the error messages passed from TextField while checking the validation of details filled by the user//
  const errorMessages = useSelector((state) => state.dataStore.errorMessages);
  const location = useLocation();

  let isFormValid = true;
  //this 'for loop' checks whether there is any error Message in the errorMessages or not and if it finds any ,it will return the value of 'isFormValid' as 'false' otherwise it will not show any warning message.//
  for (let key in errorMessages) {
    if (errorMessages[key] !== "") {
      isFormValid = false;
      break;
    }
  }

  const onSideNavLinkClick = (index) => {
    
    
    //this function stops the users from navigating to different page by accessing sideNavbar if they hadn't filled the details of existing page correctly//
    //if 'isFormValid' is true i.e when there is no messages in the 'errorMessages' then user can navigate to other page ,otherwise it will show alert and warningMessages on the screen//
    if (!isFormValid) {
      swal.fire({
        icon: "warning",
        text: "Please fill all the necessary details marked with * correctly!",
      }); //this alert is shown on the window when the 'isFormValid' is false.
      dispatch(
        updateState({
          //this dispatch functions update the value of 'showErrorMessages' as true, which will be used by 'TextField' component to display warning Message beneath each of the 'TextField' where some kind of validation is required.
          key: "showErrorMessages",
          value: true,
        })
      );
    } else if (isFormValid) {
      dispatch(
        updateState({
          key: "showErrorMessages",
          value: false,
        })
      );
    }
  };

  const menuItem = [
    {
      path: "/detailsfillingpage/personalinfo",
      name: "Personal Info",
    },
    {
      path: "/detailsfillingpage/workex",
      name: "Work Experience",
    },
    {
      path: "/detailsfillingpage/education",
      name: "Education",
    },
    {
      path: "/detailsfillingpage/keyskills",
      name: "Key Skills",
    },
  ];

  return (
    <>
      {" "}
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="container text-center"
          style={{
            maxWidth: "1920px",
            marginTop: "12px",
            backgroundColor: "#fafafa",
          }}
        >
          <div>
            <div className="row" style={{ minHeight: "100vh" }}>
              <div
                className=" col-lg-12 col-sm-12 col-12 sidebar"
                style={{ padding: "10px" }}
              >
                {menuItem.map((item, index) => (
                  
                  
                  <li className={
                    `${location.pathname === item.path ? "resume-nav-active" : ""} list-item`} onClick={() => onSideNavLinkClick(index)} key={index}>
                    <Link
                      to={isFormValid ? item.path : "#"}
                      className="no-text-decoration"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </div>

              <div className="content col-lg-12 col-sm-12 col-12">
                {/* these are the nested routes of detailsfillingpage, which helps in rendering different component- personalInfo, workEx, education & keySkills , inside detailsfillingpage when the user clicks on next button or navigate through links of sideNavbar */}
                <Routes>
                  <Route
                    exact
                    path="/personalinfo"
                    element={<PersonalInfo isFormValid={isFormValid} />}
                  ></Route>
                  <Route
                    exact
                    path="/workex"
                    element={<WorkEx isFormValid={isFormValid} />}
                  ></Route>
                  <Route
                    exact
                    path="/education"
                    element={<Education isFormValid={isFormValid} />}
                  ></Route>
                  <Route
                    exact
                    path="/keyskills"
                    element={<KeySkills isFormValid={isFormValid} />}
                  ></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsFillingPage;
