import React, { useEffect, useState } from "react";
import UserTable from "../../common/table/UserTable";
import LeftNavbar from "../LeftNavbar";
import { allApi } from "../../common/api";
import { Grid } from "@mui/material";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Employee.css";
import { ToWords } from "to-words";
import { Tooltip } from "primereact/tooltip";

const Employee = () => {
  const navigate = useNavigate();
  const [employeesData, setEmployeesData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [salaryData, setSalaryData] = useState({});
  const toWords = new ToWords();

  useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = () => {
    setLoader(true);
    allApi("api/users/employees", "", "get")
      .then((response) => {
        setEmployeesData(response?.data?.status?.data);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const deleteHandler = (id) => {
    allApi(`api/users/${id}`, "", "delete").then((response) => {
      if (response?.data?.status?.code === 200) {
        toast.success(response?.data?.status?.message);
        getAllEmployee();
      }
    });
  };

  const editHandler = (id) => {
    navigate(`/employee/edit/${id}`);
  };

  const salaryStatistics = (id, timeline) => {
    if (timeline === "monthly") {
      allApi(`api/users/${id}/salary_histories/monthly`, "", "get").then(
        (response) => {
          if (response?.status) {
            toast.success(response?.data?.status?.message);
            let salaryData = response?.data?.status?.data;
            setSalaryData({
              basic_salary: salaryData?.basic_salary,
              net_salary: salaryData?.net_salary,
              user_name: salaryData?.user_name,
              user_roll: salaryData?.user_roll,
              time_duration: salaryData?.time_duration,
            });
          }
        }
      );
    } else {
      allApi(`api/users/${id}/salary_histories/yearly`, "", "get").then(
        (response) => {
          let innerData = response?.data?.data;
          if (response?.status) {
            toast.success(response?.data?.status?.message);
            let salaryData = response?.data?.status?.data;
            setSalaryData({
              basic_salary: salaryData?.basic_salary,
              net_salary: salaryData?.net_salary,
              user_name: salaryData?.user_name,
              user_roll: salaryData?.user_roll,
              time_duration: salaryData?.time_duration,
            });
          }
        }
      );
    }

    const cssNode = document.createElement("link");
    const printNode = document.createElement("link");
    cssNode.type = "text/css";
    cssNode.rel = "stylesheet";
    cssNode.href = `${"http://localhost:3001/" + "printModuleStyle.css"}`;
    cssNode.media = "screen";
    cssNode.title = "dynamicLoadedSheet";
    printNode.type = "text/css";
    printNode.rel = "stylesheet";
    printNode.href = `${"http://localhost:3001/" + "printModuleStyle.css"}`;
    printNode.media = "print";
    const divElements = document.getElementById(
      "salaryListContainer"
    )?.innerHTML;
    const printWindow = window.open(
      null,
      "",
      "width=1000,height=1000,scrollbars=1"
    );
    printWindow?.document?.write("<html><head>");
    printWindow?.document?.write('</head><body style="padding-bottom: 20px">');
    printWindow?.document?.write(
      '<p style="display: flex; justify-content: end;"><button id="printbtn" style="color: #fff;background-color:#6778f0;background-image: none;border-color: #0097bf;height:40px;width:80px;margin-top:20px;margin-right:36px;border: 1px solid transparent;cursor: pointer;padding: 0.375rem 0.75rem;font-size: 1rem;line-height: 1.5;border-radius: 0.25rem;" onclick="window.print()">Print</button></p>'
    );
    printWindow?.document?.write(divElements);
    printWindow?.document?.write("</body></html>");
    printWindow?.document
      ?.getElementsByTagName("head")[0]
      ?.appendChild(cssNode);
    printWindow?.document
      ?.getElementsByTagName("head")[0]
      ?.appendChild(printNode);
    printWindow?.document?.close();
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Grid className="action-data justify-content-start">
        <Button
          icon="pi pi-align-center"
          style={{ fontSize: "0rem" }}
          rounded
          text
          severity
          tooltip={"Monthly salary"}
          onClick={() => salaryStatistics(rowData?.id, "monthly")}
          tooltipOptions={{
            position: "bottom",
            mouseTrack: false,
            mouseTrackTop: 15,
            className: "custom-tooltip-design",
            showDelay: 120,
          }}
        />
        <Button
          icon="pi pi-align-justify"
          style={{ fontSize: "0rem" }}
          rounded
          text
          severity
          tooltip={"Yearly salary"}
          onClick={() => salaryStatistics(rowData?.id, "yearly")}
          tooltipOptions={{
            position: "bottom",
            mouseTrack: false,
            mouseTrackTop: 15,
            className: "custom-tooltip-design",
            showDelay: 120,
          }}
        />
        {rowData?.salary?.amount ? (
          <Button
            icon="pi pi-file-edit"
            style={{ fontSize: "0rem" }}
            rounded
            text
            severity
            tooltip={"Edit salary"}
            onClick={() => navigate(`/user/salary/${rowData?.id}`)}
            tooltipOptions={{
              position: "bottom",
              mouseTrack: false,
              mouseTrackTop: 15,
              className: "custom-tooltip-design",
              showDelay: 120,
            }}
          />
        ) : (
          <Button
            icon="pi pi-save"
            style={{ fontSize: "0rem" }}
            rounded
            text
            severity
            tooltip={"Add salary"}
            onClick={() => navigate(`/user/salary/${rowData?.id}`)}
            tooltipOptions={{
              position: "bottom",
              mouseTrack: false,
              mouseTrackTop: 15,
              className: "custom-tooltip-design",
              showDelay: 120,
            }}
          />
        )}
        <Button
          icon="pi pi-trash"
          style={{ fontSize: "0rem" }}
          rounded
          text
          severity
          tooltip={"Delete user"}
          onClick={() => deleteHandler(rowData?.id)}
          tooltipOptions={{
            position: "bottom",
            mouseTrack: false,
            mouseTrackTop: 15,
            className: "custom-tooltip-design",
            showDelay: 120,
          }}
        />
        <Button
          icon="pi pi-pencil"
          style={{ fontSize: "0rem" }}
          rounded
          text
          severity
          tooltip={"Edit user"}
          onClick={() => editHandler(rowData?.id)}
          tooltipOptions={{
            position: "bottom",
            mouseTrack: false,
            mouseTrackTop: 15,
            className: "custom-tooltip-design",
            showDelay: 120,
          }}
        />
        <Tooltip
          style={{ backgroundColor: "#red" }}
          target=".logo"
          className="my-tooltip"
          mouseTrack
          mouseTrackLeft={10}
        />
      </Grid>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <Grid className="image-outer-div">
        <img src={rowData?.image ? rowData?.image : ""} alt="" className="table-image" />
      </Grid>
    );
  };

  console.log("salaryData", salaryData);
  return (
    <div className="container custom-container">
      <div className="row">
        <div className="col-md-3 dashboard-left-menu">
          <LeftNavbar />
        </div>
        <div className="col-md-9 dashboard-right-menu">
          <div className="dashboard-right-heading">
            Employee Management System
          </div>
          <UserTable
            tableData={employeesData}
            loader={loader}
            actionBodyTemplate={actionBodyTemplate}
            imageBodyTemplate={imageBodyTemplate}
          />
        </div>
      </div>
      <div id="hidden-element">
        <div id="salaryListContainer">
          <div className="card-custom-style">
            <div>
              <div className="salary-card-heading">Salary slip</div>
              <span>
                {salaryData?.time_duration?.start_date +
                  " - " +
                  salaryData?.time_duration?.end_date}
              </span>
            </div>
            <div className="card-custom-style">
              <div className="display-flex">
                <span className="card-sub-headings">Name of employee</span>
                <span className="margin-start-20px">
                  {salaryData?.user_name}
                </span>
              </div>
              <div className="display-flex">
                <span className="card-sub-headings">Designation</span>
                <span className="margin-start-20px">
                  {salaryData?.user_roll}
                </span>
              </div>
            </div>
            <div className="card-custom-style">
              <div className="display-flex">
                <span className="card-sub-headings">Basic salary</span>
                <span className="margin-start-20px">
                  {salaryData?.basic_salary}
                </span>
              </div>
              <div className="display-flex">
                <span className="card-sub-headings">Gross salary</span>
                <span className="margin-start-20px">
                  {salaryData?.net_salary}
                </span>
              </div>
              <div className="display-flex">
                <span className="card-sub-headings">Amount in words</span>
                <span className="margin-start-20px">
                  {toWords?.convert(
                    salaryData?.net_salary ? salaryData?.net_salary : 0
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
