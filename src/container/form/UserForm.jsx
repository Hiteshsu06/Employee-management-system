import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Button } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import InputTextComponent from "../common/input/InputTextComponent";
import Autocomplete from "@mui/material/Autocomplete";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import "./UserForm.css";
import { allApi } from "../common/api";
import { toast } from "react-toastify";

const initialData = {
  userType: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  uploadImage: "",
};

const userTypeData = [
  {
    value: "HUMAN_RESOURCE",
    key: "Human resource",
  },
  {
    value: "EMPLOYEE",
    key: "Employee",
  },
];

const UserForm = () => {
  const [image, setImage] = useState("");
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const userProfile = window?.location?.href
    .split("/")
    .includes("employee-profile-edit")
    ? true
    : false;
  useEffect(() => {
    if (id) {
      allApi(`api/users/${id}`, "", "get").then((response) => {
        setEditedData(response?.data?.status?.data);
      });
    }
  }, []);

  const onHandleSubmit = () => {
    if (id || userProfile) {
      let payload = {
        user: {
          name: values?.name,
          address: values?.address,
          image: values?.uploadImage,
        },
      };
      allApi(`api/users/${id}`, payload, "put")
        .then((response) => {
          toast.success("Profile has been updated successfully");
          navigate("/dashboard/statistics");
        })
        .cetch((error) => {
          toast.error(error);
        });
    } else {
      let payload = {
        user: {
          roll_name: values?.userType?.value,
          email: values?.email,
          password: values?.password,
        },
      };
      allApi("api/users", payload, "post")
        .then((response) => {
          if (response?.data?.status?.code === 200) {
            toast.success(response?.data?.status?.message);
            navigate("/dashboard/statistics");
          }
        })
        .cetch((error) => {
          toast.error(error);
        });
    }
  };

  const validationSchema = yup.object().shape({
    userType:
      id || userProfile ? null : yup.mixed().required("User type is required"),
    name:
      id || userProfile ? yup.string().required("User name is required") : null,
    email:
      id || userProfile
        ? null
        : yup.string().email("Invalid email").required("Email is required"),
    password:
      id || userProfile
        ? null
        : yup
            .string()
            .min(6, "Password is invalid")
            .max(20, "Password is invalid")
            .required("Password is required"),
    confirmPassword:
      id || userProfile
        ? null
        : yup
            .string()
            .min(6, "Confirm password is invalid")
            .max(20, "Confirm password is invalid")
            .required("Confirm password is required")
            .oneOf(
              [yup.ref("password")],
              "Confirm password not same as password"
            ),
    address:
      id || userProfile
        ? yup.string().max(100, "Address can't be more then 100")
        : null,
    uploadImage:
      id || userProfile
        ? yup
            .mixed()
            .test("fileType", "Invalid file", (file) =>
              file
                ? ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
                : true
            )
        : null,
  });

  const handleImageUpload = (event) => {
    const file = URL.createObjectURL(event?.target?.files[0]);
    setImage(file);
    const fileFound = event.target.type === "file" && event.target.files[0];
    setFieldValue("uploadImage", fileFound);
  };

  const formik = useFormik({
    initialValues: id ? editedData : initialData,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: true,
  });

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    touched,
  } = formik;
  console.log("errors", errors);
  return (
    <div>
      <Grid container spacing={2} className="p-4">
        {id || userProfile ? null : (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            className="custom-dropdown-outer-grid"
          >
            <label className="custom-field-heading">User Type</label>
            <Autocomplete
              noOptionsText="No Options"
              id="combo-box-demo"
              options={userTypeData}
              className="custom-dropdown"
              getOptionLabel={(options) => options?.key || ""}
              isOptionEqualToValue={(option, value) =>
                option?.value === value?.value
              }
              value={values?.userType ? values?.userType : null}
              onChange={(e, newValue) => {
                setFieldValue("userType", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ fontSize: "12px" }}
                  value={values.userType}
                  name="userType"
                  helperText={
                    errors?.userType && touched?.userType
                      ? errors?.userType
                      : ""
                  }
                  label="Select User Type"
                  onBlur={handleBlur}
                  error={errors?.userType && touched?.userType}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        )}
        {id || userProfile ? (
          <Grid item xs={12} sm={6} md={6}>
            <label className="custom-field-heading">Name</label>
            <InputTextComponent
              name="name"
              value={values?.name}
              type="string"
              className="form-control"
              placeholder="Enter user name"
              onChange={handleChange}
              error={errors?.name && touched?.name}
              helperText={errors?.name && touched?.name ? errors?.name : ""}
              onBlur={handleBlur}
            />
          </Grid>
        ) : null}
        {id || userProfile ? null : (
          <Grid item xs={12} sm={6} md={6}>
            <label className="custom-field-heading">Email</label>
            <InputTextComponent
              name="email"
              value={values?.email}
              placeholder="Enter email"
              type="string"
              className="form-control"
              onChange={handleChange}
              error={errors?.email && touched?.email}
              helperText={errors?.email && touched?.email ? errors?.email : ""}
              onBlur={handleBlur}
            />
          </Grid>
        )}
        {id || userProfile ? null : (
          <Grid item xs={12} sm={6} md={6}>
            <label className="custom-field-heading">Password</label>
            <InputTextComponent
              name="password"
              value={values?.password}
              type="string"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              error={errors?.password && touched?.password}
              helperText={
                errors?.password && touched?.password ? errors?.password : ""
              }
              onBlur={handleBlur}
            />
          </Grid>
        )}
        {id || userProfile ? null : (
          <Grid item xs={12} sm={6} md={6}>
            <label className="custom-field-heading">Confirm Password</label>
            <InputTextComponent
              name="confirmPassword"
              value={values?.confirmPassword}
              type="string"
              className="form-control"
              placeholder="Enter confirm password"
              onChange={handleChange}
              error={errors?.confirmPassword && touched?.confirmPassword}
              helperText={
                errors?.confirmPassword && touched?.confirmPassword
                  ? errors?.confirmPassword
                  : ""
              }
              onBlur={handleBlur}
            />
          </Grid>
        )}
        {id || userProfile ? (
          <Grid item xs={12} sm={6} md={6}>
            <label className="custom-field-heading">Address</label>
            <InputTextComponent
              name="address"
              value={values?.address}
              type="string"
              className="form-control"
              placeholder="Enter Address"
              onChange={handleChange}
              error={errors?.address && touched?.address}
              helperText={
                errors?.address && touched?.address ? errors?.address : ""
              }
              onBlur={handleBlur}
            />
          </Grid>
        ) : null}
        {id || userProfile ? (
          <Grid item container xs={12} sm={6} md={6} spacing={2}>
            <Grid item xs={5}>
              <label className="custom-field-heading">Upload Image</label>
              <br />
              <input
                id="contained-button-file"
                type="file"
                name="uploadImage"
                accept=".png,.jpg,.jpeg"
                onChange={(event) => handleImageUpload(event)}
                disabled={false}
                onClick={(e) => {
                  e.target.value = null;
                }}
              />
              <label htmlFor="contained-button-file ">
                <Button
                  variant="outlined"
                  color="primary"
                  className="upload-button-custom-css"
                  component="span"
                  startIcon={<FileUploadOutlinedIcon />}
                >
                  {"Upload Image"}
                </Button>
              </label>
              {errors?.uploadImage && (
                <div className="notes-custom-error">{errors?.uploadImage}</div>
              )}
            </Grid>
            {!errors?.uploadImage ? (
              <Grid
                item
                xs={6}
                style={image ? { border: "1px solid #aba6a6cc" } : null}
              >
                {image && (
                  <img src={image} style={{ height: 200, width: 360 }} />
                )}
              </Grid>
            ) : null}
          </Grid>
        ) : null}
        <Grid className="p-3 mt-4">
          <button
            className="btn btn-primary custom-create-button me-2"
            onClick={() => navigate("/dashboard/statistics")}
          >
            Back
          </button>
          <button
            className="btn btn-primary custom-create-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserForm;
