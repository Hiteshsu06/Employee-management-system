import React from "react";
import { Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import InputTextComponent from "../common/input/InputTextComponent";
import "./UserForm.css";
import { allApi } from "../common/api";
import { toast } from "react-toastify";

const initialData = {
  annual_package: "",
  amount: "",
  start_date: "",
  end_date: "",
};

const SalaryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const onHandleSubmit = () => {
    let payload = {
      salary: {
        user_id: id,
        annual_package: values?.annual_package,
        amount: values?.annual_package / 12,
        start_date: values?.start_date,
        end_date: values?.end_date,
      },
    };
    allApi(`api/users/${id}/salaries`, payload, "post")
      .then((response) => {
        if (response?.data?.status?.code === 200) {
          toast.success(response?.data?.status?.message);
          navigate("/dashboard/statistics");
        }
      })
      .cetch((error) => {
        toast.error(error);
      });
  };

  const validationSchema = yup.object().shape({
    annual_package: yup.number().required("Annual package is required"),
    amount: yup.number(),
    start_date: yup.date().required("Start date is required"),
    end_date: yup.date(),
  });

  const formik = useFormik({
    initialValues: initialData,
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
    touched,
  } = formik;

  return (
    <div>
      <Grid container spacing={2} className="p-4">
        <Grid item xs={12} sm={6} md={6} className="custom-dropdown-outer-grid">
          <label className="custom-field-heading">Annual package</label>
          <InputTextComponent
            name="annual_package"
            value={values?.annual_package}
            type="number"
            className="form-control"
            placeholder="Enter annual package"
            onChange={handleChange}
            error={errors?.annual_package && touched?.annual_package}
            helperText={
              errors?.annual_package && touched?.annual_package
                ? errors?.annual_package
                : ""
            }
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <label className="custom-field-heading">Amount</label>
          <InputTextComponent
            name="amount"
            value={values?.annual_package / 12}
            type="number"
            className="form-control"
            placeholder="Enter amount"
            onChange={handleChange}
            error={errors?.amount && touched?.amount}
            helperText={errors?.amount && touched?.amount ? errors?.amount : ""}
            onBlur={handleBlur}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <label className="custom-field-heading">Start date</label>
          <InputTextComponent
            name="start_date"
            value={values?.start_date}
            placeholder="Enter start date"
            type="date"
            className="form-control"
            onChange={handleChange}
            error={errors?.start_date && touched?.start_date}
            helperText={
              errors?.start_date && touched?.start_date
                ? errors?.start_date
                : ""
            }
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <label className="custom-field-heading">End date</label>
          <InputTextComponent
            name="end_date"
            value={values?.end_date}
            type="date"
            className="form-control"
            placeholder="Enter end date"
            onChange={handleChange}
            error={errors?.end_date && touched?.end_date}
            helperText={
              errors?.end_date && touched?.end_date ? errors?.end_date : ""
            }
            onBlur={handleBlur}
          />
        </Grid>
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

export default SalaryForm;
