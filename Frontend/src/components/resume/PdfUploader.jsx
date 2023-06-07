import React, { useState, useRef, useEffect } from "react";
import "./PdfUploader.scss";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import swal from "sweetalert2";
import Sidebar from "./Sidebar";

//added this comments for understanding git

function PdfUploader() {
  const [pdfFile, setPdfFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef();
  const [details, setDetails] = useState(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [employeeId, setEmployeeId] = useState(2); // for now kept 2
  const [message,setMesage]=useState("");

  useEffect(() => {
    if (status === "201 CREATED") {
      setUploaded(true);
    }
  }, [status]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("documentFile", file);
    const token = sessionStorage.getItem("jwtToken");
    const email = sessionStorage.getItem("email");
    axios
      .post(
        `http://localhost:8085/employeeportal-service/profile/`+email,
        formData,
        {
          headers: {
              Authorization: 'Bearer ' + token
          }
      }
      )
      .then((response) => {
        
        const { message, details, fileName, status } = response.data;
       // const { details } = response.data;

        if (status === "201 CREATED") {
          setPdfFile(file);
          setPreviewUrl(URL.createObjectURL(file));
          setDetails(details);
          setFileName(fileName);
          setStatus(status);
          swal.fire({
            icon: 'success',
            title: 'Success!',
            text: details
          })
        } else {
          setPdfFile(null);
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message
          })
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          // const errorMessage = error.response.data.message;
          const errorMessage = error.response.data.details;
          console.log(errorMessage)
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage
          })
        } else {
          console.log(error);
        }
      });
  };

  const handlePreviewButtonClick = () => {
    window.open(previewUrl, "_blank");
  };

  const handleDownloadButtonClick = () => {
    const token = sessionStorage.getItem("jwtToken");
    const email = sessionStorage.getItem("email");
    axios
      .get(
        `http://localhost:8085/employeeportal-service/profile/`+email+`/downloadFile`,
        {
          responseType: "blob",
          
            headers: {
                Authorization: 'Bearer ' + token
            }
        
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "resume.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpdateFileInputChange = (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("documentFile", file);
    const token = sessionStorage.getItem("jwtToken");
    const email = sessionStorage.getItem("email");
    axios
      .put(
        `http://localhost:8085/employeeportal-service/profile/`+email,
        formData,
        {
          headers: {
              Authorization: 'Bearer ' + token
          }
      }
      )
      .then((response) => {
        const { details, fileName, status } = response.data;
        setPdfFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setDetails(details);
        setFileName(fileName);
        setStatus(status);
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: details
        })
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          // const errorMessage = error.response.data.message;
          const errorMessage = error.response.data.details;
          
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage
          })
        } else {
          console.log(error);
        }
      });
  };
  return (
    <>
    <div style={{display:"flex"}}>
    <Sidebar/>
    <div className="resume-main-container">
      <div className="resume-background"></div>
      {uploaded && pdfFile ? (
        <div className="resume-preview" style={{ height: "90vh" }}>
          <embed
            className="resume-embed"
            src={previewUrl}
            type="application/pdf"
            width="100%"
            height="90%"
          />
          <div className="resume-dwnldbtn">
            <button className="resume-button" onClick={handleDownloadButtonClick}>
              Download
            </button>
            <button className="resume-button" onClick={handleUpdateButtonClick}>
              Replace Resume
            </button>
          </div>
          <input
            className="resume-update-input"
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUpdateFileInputChange}
          />
        </div>
      ) : (
        <div className="resume-upload-div">
          <div className="resume-file-card">
            <div className="resume-file-inputs resume-common">
              <input
                className="resume-upload-input resume-inp"
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              <button
                className="resume-button resume-upload-btn resume-btnup"
                onClick={() => fileInputRef.current.click()}
              >
                <i className="resume-upload-icon">
                  <FaCloudUploadAlt/>
                </i>
                Upload
              </button>
            </div>
            <div className="resume-common">
              <p className="resume-info">Supported files</p>
              <p className="resume-info">PDF or Docx</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
  
}
export default PdfUploader;
