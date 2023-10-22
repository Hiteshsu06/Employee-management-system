import "./App.css";
import Dashboard from "./container/dashboard/Dashboard";
import Statistics from "./container/dashboard/statistics/Statistics.jsx";
import Employee from "./container/dashboard/employee/Employee.jsx";
import HumanResource from "./container/dashboard/human-resource/HumanResource.jsx";
import UserForm from "./container/form/UserForm";
import Login from "./container/login/Login";
import UserTaskManager from "./container/user-task-manager/UserTaskManager";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotAuthorized from "./container/not-authorized/NotAuthorized";
import SalaryForm from "./container/form/SalaryForm";

function App() {
  function PrivateRoute({ children, role }) {
    const authorization = JSON.parse(localStorage.getItem("UserData"));
    return authorization ? (
      role?.includes(authorization?.roll_name) ? (
        children
      ) : (
        <Navigate to="/not-authorized" />
      )
    ) : (
      <Navigate to="/" />
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route
          path="/dashboard/employee"
          element={
            <PrivateRoute role={["SUPER_ADMIN", "HUMAN_RESOURCE"]}>
              <Employee />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/human-resource"
          element={
            <PrivateRoute role={["SUPER_ADMIN"]}>
              <HumanResource />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/statistics"
          element={
            <PrivateRoute role={["SUPER_ADMIN", "HUMAN_RESOURCE", "EMPLOYEE"]}>
              <Statistics />
            </PrivateRoute>
          }
        />
        <Route
          path="/new/employee"
          element={
            <PrivateRoute role={["SUPER_ADMIN", "HUMAN_RESOURCE"]}>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-profile-edit"
          element={
            <PrivateRoute role={["SUPER_ADMIN", "HUMAN_RESOURCE", "EMPLOYEE"]}>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/edit/:id"
          element={
            <PrivateRoute role={["SUPER_ADMIN", "HUMAN_RESOURCE"]}>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/new/human-resource"
          element={
            <PrivateRoute role={["SUPER_ADMIN"]}>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/salary/:id"
          element={
            <PrivateRoute role={["SUPER_ADMIN", "HUMAN_RESOURCE"]}>
              <SalaryForm />
            </PrivateRoute>
          }
        />
        <Route path="/dashboard/employee/task" element={<UserTaskManager />} />
      </Routes>
    </>
  );
}

export default App;
