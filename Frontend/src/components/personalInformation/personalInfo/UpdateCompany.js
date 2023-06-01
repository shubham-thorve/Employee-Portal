import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CompanyService from "../services/CompanyService";
import emp1 from "../Images/emp1.png";
import Swal from "sweetalert2";
import EmployeeService from "../services/EmployeeService";
const myStyle = {
	color: "red",
	fontSize: "12px",
};

const AddCompanyComponent = () => {
	const [employeeId, setEmployeeId] = useState("");

	const [title, setTitle] = useState("");
	const [managerName, setManagerName] = useState("");
	const [workPhone, setWorkPhone] = useState("");
	const [workLocation, setWorkLocation] = useState("");
	let [joiningDate, setJoiningDate] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

	const [titleError, setTitleError] = useState("");
	const [managerNameError, setManagerNameError] = useState("");
	const [workPhoneNoError, setWorkPhoneError] = useState("");
	const [workLocationError, setWorkLocationError] = useState("");
	const [joiningDateError, setJoiningDateError] = useState("");

	const [isOpen, setIsOpen] = useState(false);

	const validateTitle = () => {
		if (title === "") {
			setTitleError("Title is required");
		} else if (!/^[a-zA-Z\s]+$/.test(title)) {
			setTitleError("Invalid Format");
		} else {
			setTitleError(null);
		}
	};

	const validateManagerName = () => {
		if (managerName === "") {
			setManagerNameError("Manager Name is required");
		} else if (!/^[a-zA-Z\s]+$/.test(managerName)) {
			setManagerNameError("Invalid Format");
		} else {
			setManagerNameError(null);
		}
	};

	const validateWorkPhoneNumber = () => {
		if (workPhone === "") {
			setWorkPhoneError("Phone number is required");
		} else if (!/^\d{10}$/.test(workPhone)) {
			setWorkPhoneError("Enter a valid 10 digit Phone Number");
		} else {
			setWorkPhoneError(null);
		}
	};
	const validateWorkLocation = () => {
		if (workLocation === "") {
			setWorkLocationError("Work Location is required");
		} else if (/[^a-zA-Z]/.test(workLocation)) {
			setWorkLocationError("Enter a valid Location Name");
		} else {
			setWorkLocationError(null);
		}
	};

	const validateJoiningDate = () => {
		if (joiningDate === "") {
			setJoiningDateError("Joining date is required");
		} else {
			setJoiningDateError(null);
		}
	};

	const saveOrUpdateCompany = (e) => {
		console.log(id);

		validateTitle();
		validateManagerName();
		validateWorkPhoneNumber();
		validateWorkLocation();
		validateJoiningDate();

		console.log(joiningDate);
		var dateSplit = joiningDate.split("-");
		var sampleDate = dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];
		console.log(sampleDate);
		joiningDate = sampleDate;

		e.preventDefault();

		const company = {
			employeeId,
			title,
			managerName,
			workPhone,
			workLocation,
			joiningDate,
		};
		if (
			titleError === null &&
			managerNameError === null &&
			workPhoneNoError === null &&
			workLocationError === null &&
			joiningDateError === null
		) {
			CompanyService.updateCompany(id, company)
				.then((response) => {
					navigate(`/CompanyDetails`);
					Swal.fire("Submitted successfully");
				})
				.catch((error) => {
					console.log(error);
				});
			// } else {
			//   CompanyService.createCompany(company)
			//     .then((response) => {
			//       console.log(response.data);

			//       //   navigate(`/${response.data.employeeId}`);
			//       navigate(`/`);
			//     })
			//     .catch((error) => {
			//       console.log(error);
			//     });
			// }
		}
	};

	useEffect(() => {
		EmployeeService.getEmployeeById(id)
			.then((response) => {
				setEmployeeId(response.data.employeeId);
			});
		// const email = sessionStorage.getItem("email");
		// console.log(email);
		CompanyService.getCompanyById(id)
			.then((response) => {
				console.log(response);
				// setEmployeeId(response.data.employeeId);
				setTitle(response.data.title);
				setManagerName(response.data.managerName);
				setWorkPhone(response.data.workPhone);
				setWorkLocation(response.data.workLocation);
				console.log(response.data.joiningDate);
				if (response.data.joiningDate != null) {
					let datePlit = response.data.joiningDate.split("-");
					setJoiningDate(datePlit[2] + "-" + datePlit[1] + "-" + datePlit[0]);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const title1 = () => {
		if (id) {
			return <h2 className="text-center">Update Company Details</h2>;
		} else {
			return <h2 className="text-center">Update/Fill Company Details</h2>;
		}
	};

	return (
		<div>
			<div
				className="container-fluid"
				style={{
					backgroundColor: "antiquewhite",
					height: "100%",
					width: "100%",
					padding: "70px 0px 70px 0px",
				}}
			>
				<div className="row">
					<div className="card col-md-6 offset-md-3 offset-md-3">
						{title1()}

						<div className="card-body">
							<form onSubmit={saveOrUpdateCompany}>
								<img
									className="responsive"
									src={emp1}
									style={{
										width: "80%",
										height: "150px",
										marginLeft: "25px",
										marginTop: "1px",
										opacity: "0.8",
									}}
									alt="no_Image"
								/>
								<div className="form-group mb-2">
									<label className="form-label">
										Employee Id
										<span className="errmsg" style={{ color: "red" }}>
											*
										</span>{" "}
										:
									</label>
									<input
										type="number"
										min="10000"
										max="99999"
										placeholder="Enter employee Id "
										name="employeeId"
										className="form-control"
										value={employeeId}
										required
										onChange={(e) => setEmployeeId(e.target.value)}
										disabled
									></input>
								</div>

								<div className="form-group mb-2">
									<label className="form-label">
										Title
										<span className="errmsg" style={{ color: "red" }}>
											*
										</span>{" "}
										:{" "}
									</label>
									<input
										type="text"
										// placeholder="Enter first name"
										name="title"
										// pattern="^[A-Za-z.\\s]+$"
										className="form-control"
										// required
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										onBlur={validateTitle}
										style={{ borderColor: titleError ? "red" : "" }}
									></input>
									{titleError && (
										<p className="error" style={myStyle}>
											{titleError}
										</p>
									)}
								</div>

								<div className="form-group mb-2">
									<label className="form-label">
										Manager
										<span className="errmsg" style={{ color: "red" }}>
											*
										</span>{" "}
										:{" "}
									</label>
									<input
										type="text"
										placeholder="Enter Manager name"
										name="manager"
										className="form-control"
										value={managerName}
										// pattern="^[A-Za-z.\\s]+$"

										onChange={(e) => setManagerName(e.target.value)}
										onBlur={validateManagerName}
										style={{ borderColor: managerNameError ? "red" : "" }}
									></input>
									{managerNameError && (
										<p className="error" style={myStyle}>
											{managerNameError}
										</p>
									)}
								</div>

								<div className="form-group mb-2">
									<label className="form-label">
										Work Phone Number
										<span className="errmsg" style={{ color: "red" }}>
											*
										</span>{" "}
										:
									</label>
									<input
										type="tel"
										placeholder="Enter work phone number"
										// pattern="[0-9]{10}"
										name="workPhoneNumber"
										className="form-control"
										value={workPhone}
										// required
										onChange={(e) => setWorkPhone(e.target.value)}
										onBlur={validateWorkPhoneNumber}
										style={{ borderColor: workPhoneNoError ? "red" : "" }}
									></input>
									{workPhoneNoError && (
										<p className="error" style={myStyle}>
											{workPhoneNoError}
										</p>
									)}
								</div>
								<div className="form-group mb-2">
									<label className="form-label" for="worklocation" >
										{" "}
										Work Location
										<span className="errmsg" style={{ color: "red" }}>
											*
										</span>{" "}
										:
									</label>

									<input
										type="text"
										placeholder="Enter work location "
										name="workLocation"
										className="form-control"
										value={workLocation}
										// pattern="^[A-Za-z.\\s]+$"
										// required
										onChange={(e) => setWorkLocation(e.target.value)}
										onBlur={validateWorkLocation}
										style={{ borderColor: workLocationError ? "red" : "" }}></input>
									{workLocationError && (
										<p className="error" style={myStyle}>
											{workLocationError}
										</p>
									)}
								</div>

								<div className="form-group mb-2">
									<label className="form-label">
										{" "}
										start Date
										<span className="errmsg" style={{ color: "red" }}>
											*
										</span>{" "}
										:
									</label>
									<input
										type="date"
										placeholder="Enter your joining date"
										// required
										name="startDate"
										className="form-control"
										value={joiningDate}
										onChange={(e) => setJoiningDate(e.target.value)}
										onBlur={validateJoiningDate}
										style={{ borderColor: joiningDateError ? "red" : "" }}
									></input>
									{joiningDateError && (
										<p className="error" style={myStyle}>
											{joiningDateError}
										</p>
									)}
								</div>

								<button className="btn btn-success" style={{margin:"10px"}} type="submit">
									Submit{" "}
								</button>
								<Link to={`/CompanyDetails`} className="btn btn-danger">
									{" "}
									Cancel{" "}
								</Link>
								{/* <Link to={`/CompanyDetails`}>
									<button className="update" style={{ marginLeft: "54%" }}>
										View updated details
									</button>
								</Link> */}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddCompanyComponent;
