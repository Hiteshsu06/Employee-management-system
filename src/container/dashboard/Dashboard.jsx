import React from "react";
import "./Dashboard.css";
import LeftNavbar from "./LeftNavbar";
import UserTable from "../common/table/UserTable.jsx";

const Dashboard = () => {
  return (
    <div className="container custom-container">
      <div className="row height-100">
        <div className="col-md-3 dashboard-left-menu">
          <LeftNavbar />
        </div>
        <div className="col-md-9 dashboard-right-menu">
          <div className="dashboard-right-heading">
            Employee Management System
          </div>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
