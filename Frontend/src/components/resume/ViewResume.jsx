import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import { FaEye, FaRedoAlt } from 'react-icons/fa';
import Sidebar from './Sidebar'
import "./ViewResume.scss"


function ViewResume() {
  const [fileName, setFileName] = useState('');
  
  const [pdfFile, setPdfFile] = useState(null);
  const [details, setDetails] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const email = sessionStorage.getItem("email");
      const response = await axios.get(`http://localhost:8085/employeeportal-service/profile/` + email + `/filename`,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
      setFileName(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const email = sessionStorage.getItem("email");
      const response = await axios.get(`http://localhost:8085/employeeportal-service/profile/` + email + `/downloadFile`, {
        responseType: 'arraybuffer',

        headers: {
          Authorization: 'Bearer ' + token
        }

      });

      const mimeType = response.headers['content-type'];
      const file = new Blob([response.data], { type: mimeType });

      setPdfFile(file);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.details;
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage
        })
      } else {
        console.log(error);
      }
    }
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
      formData.append('documentFile', file);
      const token = sessionStorage.getItem("jwtToken");
      const email = sessionStorage.getItem("email");
      axios
        .put(`http://localhost:8085/employeeportal-service/profile/` + email, formData,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
        .then((response) => {
          const { details, fileName } = response.data;

          setPdfFile(file);
          setDetails(details);
          setFileName(fileName);
          setIsUploaded(details === 'Resume updated successfully');
          swal.fire({
            icon: 'success',
            title: 'Success',
            text: details
          })
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>

      <div style={{ display: "flex" }}>
        <Sidebar/>
        <div className="view-resume-main">
          <div className="resume-container" >
            <div className="resume-background"></div>
            
            <div className="resume-header">
              {fileName ? (
                <>
                  <div className="resume-filename">{fileName}</div>
                  <div className="view-resume-buttons">
                    <button className="resume-button resume-download-btn" onClick={handleDownload}>
                      View <i className="resume-icon"><FaEye /></i>
                    </button>
                    <button className="resume-button resume-update-btn" onClick={handleButtonClick}>
                      Update <i className="resume-icon"><FaRedoAlt /></i>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf, .doc, .docx"
                      onChange={handleFileInputChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="resume-filename">You have not uploaded your resume yet!</div>
                  <Link to="/uploadResume">
                    <button className="resume-button resume-upload-btn">Upload Resume</button>
                  </Link>
                </>
              )}
            </div>
            {pdfFile && (
              <div className="resume-preview">
                <p>File Preview:</p>
                <iframe src={URL.createObjectURL(pdfFile)} width="100%" height="500px" title="Resume Preview" />
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewResume;





