import React from "react";
import "./NotAuthorized.css";

const NotAuthorized = () => {
  const notFoundTitle = "Not Authorized found.";
  const notFoundDescription = "You don't have permission to access this page";
  return (
    <>
      <div className="page-container error-found">
        <img src="" alt="" className="img-setting" />
        <h1 className="title Authorized" style={{ textAlign: "center" }}>
          {notFoundTitle}
        </h1>
        <span className="permission-text" style={{ textAlign: "center" }}>
          {" "}
          {notFoundDescription}
        </span>
      </div>
    </>
  );
};

export default NotAuthorized;
