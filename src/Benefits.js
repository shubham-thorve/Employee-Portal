import React from "react";
import "./Benefits.css";
const Benefits = () => {
  return (
    <div className="benifits">
      <div className="card-container">
        <div className="card">
          <h3>Remote Accessibility</h3>
          <span></span>
          <img
            className="img"
            src="https://www.pockethrms.com/wp-content/uploads/2022/04/Remote-Accessibility-1.svg"
            alt="no image"
          />
          <span></span>
          <p>
            It allows your staff to work remotely and mark their work accurately
            anywhere and anytime by effortlessly. It also reduce paperwork.
          </p>
        </div>
        <div className="card">
          <h3>Employee Engagement</h3>
          <span></span>
          <img
            className="img"
            src="https://www.pockethrms.com/wp-content/uploads/2022/04/Employee-Engagement-2.svg"
            alt="no image"
          />
          <span></span>
          <p>
            With a self service portal, employees are more engaged and feel more
            empowered in our portal.
          </p>
        </div>
        <div className="card">
          <h3>Saves Productive Time</h3>
          <span></span>
          <img className="img" src="https://www.pockethrms.com/wp-content/uploads/2022/01/Saves-Productive-Time.jpg" alt="no image" />
          <span></span>
          <p>
            If you are travelling and you need the help of some of your
            employees, you do not need to wait till you reach the office.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
