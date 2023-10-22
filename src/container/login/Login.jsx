import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginImg from "./login.jpg";
import * as yup from "yup";
import { useFormik } from "formik";
import InputTextComponent from "../common/input/InputTextComponent";
import { IconButton, InputAdornment, Grid } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { allApi } from "../common/api";

const initialData = {
  email: "",
  password: "",
};

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const onHandleSubmit = () => {
    const payload = {
      user: {
        email: values.email,
        password: values.password,
      },
    };
    allApi("users/sign_in", payload, "post")
      .then((response) => {
        let innerData = response?.data?.status;
        let token = response?.headers?.get("Authorization");
        if (innerData?.code === 200) {
          localStorage.setItem("Token", JSON.stringify(token));
          localStorage.setItem("UserData", JSON.stringify(innerData?.data));
          toast.success(innerData?.message);
          navigate("/dashboard/statistics");
        }
      })
      .cetch((error) => {
        toast.error(error);
      });
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password is invalid")
      .max(20, "Password is invalid")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialData,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: true,
  });

  const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
    formik;

  return (
    <div className="container custom-container">
      <div className="row responsive-parent-div">
        <div className="col-md-8 col-xs-12 responsive-child-div1">
          <img
            src={loginImg}
            alt=""
            className="img-fluid custom-image-height responsive-login-image"
          />
        </div>
        <div className="col-4 responsive-child-div2">
          <div className="login-form">
            <h2>Login</h2>
            <form>
              <div className="form-group">
                <label>Email</label>
                <InputTextComponent
                  name="email"
                  value={values?.email}
                  type="string"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={handleChange}
                  error={errors?.email && touched?.email}
                  helperText={
                    errors?.email && touched?.email ? errors?.email : ""
                  }
                  onBlur={handleBlur}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <InputTextComponent
                  name="password"
                  className="form-control"
                  type={passwordShown ? "text" : "password"}
                  value={values?.password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setPasswordShown(!passwordShown)}
                          edge="end"
                        >
                          {passwordShown ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={errors?.password && touched?.password}
                  helperText={
                    errors?.password && touched?.password
                      ? errors?.password
                      : ""
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
