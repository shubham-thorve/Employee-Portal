import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompanyService from "../services/CompanyService";
import "./Personal.css";
import "./company.css";
import { useParams } from "react-router-dom";
import emp3 from "../Images/emp3.png";
import Swal from "sweetalert2";
import { BiEdit, BiArrowBack } from "react-icons/bi";
import EmployeeService from "../services/EmployeeService";

const CompanyComponent = () => {
  const { id } = useParams();
  const[employeeId,setEmployeeId]=useState("");
  console.log(id);

  const [companys, setCompanys] = useState([]);

  useEffect(() => {
    getCompanyById(id);
    EmployeeService.getEmployeeById(id)
    .then((response) => {
      setEmployeeId(response.data.employeeId);
    });

    // getAllCompanys();
  }, [id]);
  const getCompanyById = (employeeId) => {
    console.log("company.js line 20");
    CompanyService.getCompanyById(employeeId)
      .then((response) => {
        console.log(response.data);
        setCompanys(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  const getCompanyById = (employeeId) => {
  //    CompanyService.getCompanyById(employeeId).then((response) =>{
  //     // setCompanys(response.data)
  //     //       console.log(response.data);
  //           getCompanyById();

  //    }).catch(error =>{
  //        console.log(error);
  //    })

  // }

  return (

	<div className="container-fluid4">
	<div className="background2-container"></div>
    <>
      <div
        className="container-fluid2"
        style={{
          backgroundColor: "antiquewhite",
          padding: "30px 0px 100px 10px",
        }}
      >
        <br></br>
        <h1 className="text-center"> Company Details </h1>
        <br></br>
        <div>
          {/* <img src={emp3} style={{ width: "480px", height: "450px", opacity: "0.9" }} /> */}
        </div>
        <br></br>
        <center>
          <table>
            {
              <tr key={companys.employeeId}>
                <div className="st">
                  {" "}
                  <tr>
                    {" "}
                    <td></td>
                  </tr>
                  <tr>
                    {" "}
                    <th> Employee Id: </th>
                    <td> {employeeId} </td>
                  </tr>
                  <tr>
                    <th>Title:</th>
                    <td>{companys.title}</td>
                  </tr>
                  <tr>
                    {" "}
                    <th>Manager</th>
                    <td>{companys.managerName}</td>
                  </tr>
                  <tr>
                    <th>Work Location:</th>
                    <td>{companys.workLocation} </td>
                  </tr>
                  <tr>
                    <th> Work Phone Number:</th>
                    <td>{companys.workPhone} </td>
                  </tr>
                  <tr>
                    <th> Joining Date:  </th>
                    <td>{companys.joiningDate} </td>
                  </tr>
                </div>
                <br></br>
                <div className="st1">
                  <Link to={`/edit-company`}>
                    <button
                      className="update"
                      style={{ marginLeft: "-40px", padding: "8px" }}
                    >
                      <BiEdit
                        className="update-icon"
                        style={{ width: "25px", height: "25px" }}
                      ></BiEdit>
                      <span className="update-tooltiptext">
                        Click to update the Company Information
                      </span>
                    </button>
                  </Link>

                  <Link to={`/personalinfo`}>
                    <button
                      className="update"
                      style={{ marginLeft: "10px", padding: "8px" }}
                    >
                      <BiArrowBack
                        className="update-icon"
                        style={{ width: "25px", height: "25px" }}
                      ></BiArrowBack>
                      <span className="update-tooltiptext">
                        Go to Personal Information Page
                      </span>
                    </button>
                  </Link>
                </div>
              </tr>
            }
          </table>
        </center>
      </div>
    </>
	</div>
  );
};

export default CompanyComponent;