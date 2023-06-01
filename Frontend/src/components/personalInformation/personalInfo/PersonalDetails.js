import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import "./Personal.css";
import ProfileImage2 from "../Images/ProfileImage2.png"
import { BiEdit, BiUpload } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { FaAddressCard } from "react-icons/fa";
import axios from 'axios';

const ListEmployeeComponent = () => {
	const { id } = useParams();

	const [employees, setEmployees] = useState([]);
	// const [img, setImg] = useState();
	// const [fileName, setFileName] = useState('');
	const fileInputRef = useRef(null);

	useEffect(() => {
		getEmployeeById(id);

	}, [id]);
	const getEmployeeById = (employeeId) => {
		EmployeeService.getEmployeeById(employeeId)
			.then((response) => {
				console.log(response.data)
				setEmployees(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		handleUpdate(file);
	};

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleUpdate = (file) => {
		try {
			const formData = new FormData();
			formData.append('file', file);
			const token = sessionStorage.getItem("jwtToken");
			const email = sessionStorage.getItem("email");
			axios
				.put(`http://localhost:8085/employeeportal-service/personalinfo/profilephoto/` + email, formData,
					{
						headers: {
							Authorization: 'Bearer ' + token
						}
					})
				.then((response) => {
					console.log(response.data);
					getEmployeeById();
				})

		} catch (error) {
			console.log(error);
		}
	};

	const navigate = useNavigate();
	const handleButton = () => {
		navigate("/edit-employee")
	}



	return (
		<div className="container-fluid3">
			<div className="background-container"></div>

			<div className="container-fluid" style={{
				padding: "23px 10px 160px 20px"
			}}>
				<div className="head">
				<center><h2 className="" >PERSONAL INFORMATION</h2> </center>
				</div>
				<Link to={`/CompanyDetails`}>
					<button className="company" style={{ marginLeft: "80%", marginTop: "10px" }}>

						<FaAddressCard className="company-icon" style={{ width: "25px", height: "25px", marginRight: "10px", marginTop: "-2px" }}></FaAddressCard>
						<span className="company-tooltiptext">Click to View the Company Information</span>
						Company Details
					</button>
				</Link>
				<table className="table table--striped" style={{ marginTop: "-30px", marginLeft: "10px" }}>
					<tbody>
						<tr key={employees.employeeId}>
							{/* <div className="polaroid">
									<img src={ProfileImage2} style={{ width: "40%", height: "40%" }} />
								</div> */}
							{/* < className="polaroid"> */}
							{/* <th>profile photo:</th> */}
							{/* //fetching the img */}
							{/* <td> 
								<img src={`data:image;base64,${employees.profilePhoto}`} width="50px" alt="Profile image not uploaded" />
							</td> */}
							{/* <button className="profilepic-update-btn" onClick={handleButtonClick}>Update </button> */}
							<input
								ref={fileInputRef}
								type="file"
								accept=".jpeg, .png, .jpg"
								onChange={handleFileInputChange}
								style={{ display: 'none' }}>
							</input>
							<td>
								<div className="head1" >
									<div className="profile">
										{/* <img src={ProfileImage2} style={{ width: "67%", height: "67%", float: "right" }} /> */}
										{/* <th>profile photo:</th> */}
										<h3 className="profilepic" >
											PROFILE PICTURE
											<CiUser className="profilepic-icon" style={{ width: "17px", height: "17px", marginTop: "-4px", color: "black", fontWeight: "bolder" }}></CiUser>
										</h3>
										<img src={`data:image;base64,${employees.profilePhoto}`} onError={(e) => { e.target.src = ProfileImage2 }} style={{ width: "160px", height: "200px", float: "right", marginTop: "10px" }} alt="Profile image not uploaded" />
										<button className="upload" onClick={handleButtonClick} style={{ marginLeft: "65%", marginTop: "15px" }}>
											UPLOAD
											<BiUpload className="upload-icon" style={{ width: "40px", height: "30px" }}></BiUpload>
											<span className="upload-tooltiptext">Upload your profile picture</span>
										</button>
									</div>
								</div>
							</td>
							<br></br><br /><br /><br />

							<tr style={{ bgcolor: "grey" }}>
								<th> Employee Id: </th>
								<td> {employees.employeeId} </td>
								<th>Address:</th>
								<td>{employees.address} </td>
							</tr>

							<tr>
								<th> First Name: </th>
								<td> {employees.firstName} </td>
								<th> Date of Birth:</th>
								<td>{employees.birthDate} </td>
							</tr>

							<tr>
								<th> Last Name: </th>
								<td>{employees.lastName}</td>
								<th> Phone Number: </th>
								<td>{employees.phoneNo} </td>
							</tr>

							<tr>
								<th> Employee Email Id: </th>
								<td>{employees.email}</td>
								<th>Alternate Phone Number: </th>
								<td>{employees.alternatePhoneNo} </td>
							</tr>

							<tr>
								<th>Personal Email Id: </th>
								<td>{employees.personalEmail}</td>
								<th> Government ID:</th>
								<td>{employees.governmentId} </td>
							</tr>
						</tr>
					</tbody>
				</table>
				<div>
					{/* <Link to={`/edit-employee`}> */}
					<button className="update" style={{ marginLeft: "90%" }} onClick={handleButton}>
						<BiEdit className="update-icon" style={{ width: "30px", height: "30px" }}></BiEdit>
						<span className="update-tooltiptext">Click to update the Personal Information</span>
					</button>
					{/* </Link> */}
				</div>
			</div>
		</div >
	);
};

export default ListEmployeeComponent;
