import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../ReduxManager/dataStoreSlice";
import Tippy from "@tippyjs/react";
import swal from "sweetalert2";
import "../resumeBuilder.scss";
// import EmployeeService from "../../../personalInformation/services/EmployeeService";
import { FaUpload } from "react-icons/fa";
import userUpload from "../../../../images/uploadUser.png"

function ProfileUpload() {
  const imageFile = useSelector((state) => state.dataStore.imageFile);
  const dispatch = useDispatch();
  // const [profileImg, setProfileImg] = useState(""); // State variable for profile image URL

  // useEffect(() => {
  //   // Simulating API call to fetch profile image URL

  //   fetchProfileImage(); // Call your API to fetch the image URL here
  // }, []);

  // const fetchProfileImage = () => {
  //   EmployeeService.getEmployeeById()
  //     .then((response) => {
  //       setProfileImg(response.data.profilePhoto);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  function handleChange(e) {
    //this function is used to update 'imageFile' in dataStoreSlice with the user given input ,
    //which will be reflected in personalInfo as the profile image.
  
    let file = e.target.files[0];
    const fileType = file["type"];
    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      let temp = URL.createObjectURL(file);

      dispatch(
        updateState({
          key: "imageFile",
          value: temp,
        })
      );
    } else {
      swal.fire({
        icon: "warning",
        text: "Uploaded file type should be jpg/png!",
      });
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <img
            style={{
              height: "150px",
              width: "150px",
              background: "grey",
              padding: 0,
            }}
            src={imageFile || userUpload}
            // src={imageFile || `data:image;base64,${profileImg}`}
            alt="profile"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3 mt-3">
          <Tippy content="Replace with new photo for resume">
            <label
              for="resume-fileInput"
              className="resume-fileInputLabel resume-button-upload"
            >
              {" "}
              <i className="photo-upload-icon">
                <FaUpload />
              </i>
              Update Photo
            </label>
          </Tippy>
        </div>

        <input
          id="resume-fileInput"
          className="resume-fileInput"
          style={{ margin: "10px" }}
          type="file"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
export default ProfileUpload;
