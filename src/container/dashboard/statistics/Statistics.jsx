import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftNavbar from "../LeftNavbar";
import "./Statistics.css";
import { useStopwatch } from "react-timer-hook";
import { allApi } from "../../common/api";
import { toast } from "react-toastify";

const Statistics = () => {
  const navigate = useNavigate();
  const [countAllUsers, setCountAllUsers] = useState({
    admin: 0,
    human_resource: 0,
    employee: 0,
    total_salary: 0
  });
  const userDetails = JSON.parse(localStorage.getItem("UserData"));
  const [clockIn, setClockIn] = useState(false);

  let { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const clockHandler = () => {
    if (clockIn === false) {
      //when we click on clock in
      setClockIn(true);
      start();
      let payload = {
        log: {
          user_id: userDetails?.id,
          time_stamp: 0,
          clock_in: true,
          clock_out: false,
        },
      };
      allApi(`api/users/${userDetails?.id}/logs`, payload, "post").then(
        (response) => {
          if (response?.data?.status?.code === 200) {
            toast.success(response?.data?.status?.message);
            localStorage.setItem("log_id", response?.data?.status?.data?.id);
          }
        }
      );
    } else {
      setClockIn(false);
      reset();
      pause();
      localStorage.setItem("clockOut", new Date()?.toISOString()?.slice(0, 10));
      let workSeconds = hours * 60 * 60 + minutes * 60 + seconds;
      let log_id = localStorage.getItem("log_id");
      let payload = {
        log: {
          user_id: userDetails?.id,
          time_stamp: workSeconds,
          clock_in: true,
          clock_out: true,
        },
      };
      allApi(
        `api/users/${userDetails?.id}/logs/${log_id}`,
        payload,
        "put"
      ).then((response) => {
        if (response?.data?.status?.code === 200) {
          toast.success(response?.data?.status?.message);
        }
      });
    }
  };

  useEffect(() => {
    allApi("api/users_count", "", "get").then((response) => {
      let innerData = response?.data?.data;
      if (innerData) {
        setCountAllUsers({
          admin: innerData?.admin,
          human_resource: innerData?.human_resource,
          employee: innerData?.employee,
          total_salary: innerData?.total_salary
        });
        toast.success(innerData?.message);
        navigate("/dashboard/statistics");
      }
    });
  }, []);

  useEffect(() => {
    // Every second it is sending seconds to local storage
    let workSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    if (workSeconds > 0) {
      localStorage.setItem("workSeconds", workSeconds);
    }
  }, [seconds]);

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
          <div className="clock-in-div">
            <div className="clock-button-div">
              <button
                className="btn btn-primary custom-create-button"
                type="button"
                onClick={() => clockHandler()}
              >
                {!clockIn ? "Clock In" : "Clock Out"}
              </button>
            </div>
            <div className="theme-border clock-fonts">
              <span className="hours-span">
                {hours < 10 ? `0${hours}` : hours}
              </span>
              :
              <span className="minutes-span">
                {minutes < 10 ? `0${minutes}` : minutes}
              </span>
              :
              <span className="seconds-span">
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </div>
          </div>
          {userDetails?.roll_name !== "EMPLOYEE" ? (
            <div className="display-flex justify-space-between responsive-cards-grid">
              {userDetails?.roll_name === "SUPER_ADMIN" ? (
                <div className="card custom-card-padding">
                  <div className="card-heading">
                    <b>ADMIN</b>
                  </div>
                  <div className="card-data">
                    <span>Total Number:</span>
                    <span>
                      <b>{countAllUsers?.admin}</b>
                    </span>
                  </div>
                </div>
              ) : null}
              <div className="card custom-card-padding">
                <div className="card-heading">
                  <b>HUMAN RESOURCE</b>
                </div>
                <div className="card-data">
                  <span>Total Number:</span>
                  <span>
                    <b>{countAllUsers?.human_resource}</b>
                  </span>
                </div>
              </div>
              <div className="card custom-card-padding">
                <div className="card-heading">
                  <b>EMPLOYEE</b>
                </div>
                <div className="card-data">
                  <span>Total Number:</span>
                  <span>
                    <b>{countAllUsers?.admin}</b>
                  </span>
                </div>
              </div>
              <div className="card custom-card-padding">
                <div className="card-heading">
                  <b>SALARY</b>
                </div>
                <div className="card-data">
                  <span>Total Amount:</span>
                  <span>
                    <b>{countAllUsers?.total_salary}</b>
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          <div className="gap-2 mx-auto mt-4 display-flex">
            {userDetails?.roll_name !== "EMPLOYEE" ? (
              <button
                className="btn btn-primary custom-create-button"
                type="button"
                onClick={() => navigate("/new/employee")}
              >
                Create Employee
              </button>
            ) : null}
            {userDetails?.roll_name === "SUPER_ADMIN" ? (
              <button
                className="btn btn-primary custom-create-button"
                type="button"
                onClick={() => navigate("/new/human-resource")}
              >
                Create Human Resource
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
