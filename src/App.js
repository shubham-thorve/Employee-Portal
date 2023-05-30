import React from "react";
import "./index.css";
import Home from "./routes/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Resume from "./routes/Resume";
import Todo from "./routes/Todo";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";
import { ToastContainer } from 'react-toastify';
import PrivateRoute from "./components/authentication/PrivateRoute";
import PdfUploader from "./components/resume/PdfUploader";
import ViewResume from "./components/resume/ViewResume";
import MyResume from "./components/resume/resumeBuilder/ResumeDisplay/MyResume";
import DetailsFillingPage from './components/resume/resumeBuilder/DetailsFillComponents/DetailsFillingPage';
import CreateResume from './components/resume/resumeBuilder/HomePage/Home';

import PersonalInfo from './components/personalInformation/personalInfo/PersonalDetails';
import UpdateEmployee from './components/personalInformation/personalInfo/UpdateEmployee';
import CompanyDetails from './components/personalInformation/personalInfo/CompanyDetails';
import UpdateCompany from './components/personalInformation/personalInfo/UpdateCompany';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer></ToastContainer>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/todo' element={<PrivateRoute component={Todo} />} />
        {/* <Route path="/resume" element={<PrivateRoute component={Resume}/>}> */}

        <Route path="/uploadResume" element={<PrivateRoute component={PdfUploader} />} />

        <Route path="/viewResume" element={<PrivateRoute component={ViewResume} />} />
        <Route path="/myresume" element={<PrivateRoute component={MyResume} />} />
        <Route exact path="/createResume" element={<PrivateRoute component={CreateResume} />} />
        <Route path="/detailsfillingpage/*" element={<PrivateRoute component={DetailsFillingPage} />} />
        <Route path="/myresume" element={<PrivateRoute component={MyResume} />} />

        <Route path="/personalinfo" element={<PrivateRoute component={PersonalInfo} />} />
        <Route path="/edit-employee" element={<PrivateRoute component={UpdateEmployee} />} />
        <Route path="/edit-company" element={<PrivateRoute component={UpdateCompany} />} />
        <Route path="/companyDetails" element={<PrivateRoute component={CompanyDetails} />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
