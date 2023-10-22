import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import PeopleIcon from "@mui/icons-material/People";
import SpeedIcon from "@mui/icons-material/Speed";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { allApiWithHeaders } from "../common/api";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import "./Dashboard.css";

const LeftNavbar = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("UserData"));

  const logoutHandler = () => {
    const payload = {
      user: {
        email: userData?.email,
        password: userData?.password,
      },
    };
    allApiWithHeaders("users/sign_out", payload, "delete").then((response) => {
      if (response?.status === 200) {
        toast.success(response?.message);
        navigate("/");
        localStorage.removeItem("UserData");
        localStorage.removeItem("Token");
      }
    });
  };

  const editUserProfile = () => {
    navigate("/employee-profile-edit");
  };

  return (
    <div>
      <div className="dashboard-heading">
        <span>Welcome {userData?.name}</span>
        <span>
          <Button
            icon="pi pi-user-edit"
            rounded
            text
            severity
            className="ms-2 edit-profile-button"
            onClick={() => editUserProfile()}
          />
        </span>
      </div>
      <div className="dashboard-lists">
        <ul>
          <li
            className="sidebar-list"
            onClick={() => navigate("/dashboard/statistics")}
          >
            <SpeedIcon /> Dashboard
          </li>
          {userData.roll_name === "EMPLOYEE" ? null : (
            <li
              className="sidebar-list"
              onClick={() => navigate("/dashboard/employee")}
            >
              <PeopleIcon /> Manage Employees
            </li>
          )}
          {userData.roll_name === "SUPER_ADMIN" ? (
            <li
              className="sidebar-list"
              onClick={() => navigate("/dashboard/human-resource")}
            >
              <Person2Icon /> Manage HR
            </li>
          ) : null}
          <li
            className="sidebar-list"
            onClick={() => navigate("/dashboard/employee/task")}
          >
            <PlaylistAddIcon /> Task Manager
          </li>
          <li className="sidebar-list" onClick={() => logoutHandler()}>
            <LogoutIcon /> Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNavbar;
