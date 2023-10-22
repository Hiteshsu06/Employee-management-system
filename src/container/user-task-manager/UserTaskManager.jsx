import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import LeftNavbar from "../dashboard/LeftNavbar";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import * as yup from "yup";
import { useFormik } from "formik";
import InputTextComponent from "../common/input/InputTextComponent";
import { Grid, Button } from "@mui/material";
import "./UserTaskManager.css";
import { toast } from "react-toastify";
import { allApi } from "../common/api";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

const initialData = {
  project_id: 0,
  project_name: "",
  task_name: "",
};

const UserTaskManager = () => {
  const [visibleProject, setVisibleProject] = useState(false);
  const [visibleTask, setVisibleTask] = useState(false);
  const [loader, setLoader] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    getAllProjectsDetails();
  }, []);

  const getAllProjectsDetails = () => {
    setLoader(true);
    allApi("api/projects", "", "get")
      .then((response) => {
        if (response?.status === 200) {
          setProjectsData(response.data);
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const createProject = () => {
    let payload = {
      project: {
        project_name: values?.project_name,
        current_date: new Date(),
        project_status: "Pending",
      },
    };
    allApi(`/api/projects`, payload, "post").then((response) => {
      if (response?.data?.status?.code === 200) {
        toast.success(response?.data?.status?.message);
        setVisibleProject(false);
        getAllProjectsDetails();
      }
    });
  };

  const projectDeleteHandler = (id) => {
    allApi(`api/projects/${id}`, "", "delete").then((response) => {
      if (response?.status === 200) {
        toast.success(response?.data?.status?.message);
        getAllProjectsDetails();
      }
    });
  };

  const taskHandler = (id) => {
    setVisibleTask(true);
    setProjectId(id);
  };

  const createTask = () => {
    let payload = {
      task: {
        project_id: projectId,
        task_name: values?.task_name,
        task_status: "OPEN",
      },
    };
    allApi(`api/projects/${projectId}/tasks`, payload, "post").then(
      (response) => {
        if (response?.data?.status?.code === 200) {
          toast.success(response?.data?.status?.message);
          setVisibleTask(false);
          getAllProjectsDetails();
          formik.resetForm();
        }
      }
    );
  };

  const taskDeleteHandler = (project_id, task_id) => {
    allApi(`api/projects/${project_id}/tasks/${task_id}`, "", "delete").then(
      (response) => {
        if (response?.status === 200) {
          toast.success(response?.data?.status?.message);
          getAllProjectsDetails();
        }
      }
    );
  };

  const statusChangeHandler = (project_id, task_id, task_status, task_name) => {
    //api call here;;;;;;;
    let payload = {
      task: {
        project_id: project_id,
        task_name: task_name,
        task_status: task_status === "OPEN" ? "CLOSED" : "OPEN",
      },
    };
    allApi(`api/projects/${project_id}/tasks/${task_id}`, payload, "put").then(
      (response) => {
        if (response?.status === 200) {
          toast.success(response?.data?.status?.message);
          getAllProjectsDetails();
        }
      }
    );
  };

  const validationSchema = yup.object().shape({
    project_name: yup.string().required("Project name is required"),
    task_name: yup.string(),
  });

  const formik = useFormik({
    initialValues: initialData,
    onSubmit: createProject,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: true,
  });

  const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
    formik;

  return (
    <div className="container custom-container">
      <div className="flex justify-content-center">
        <Dialog
          header="Create Project"
          visible={visibleProject}
          modal={false}
          style={{ width: "50vw" }}
          onHide={() => setVisibleProject(false)}
        >
          <Grid container className="display-flex mb-4">
            <Grid item xs={12} sm={6} md={6}>
              <InputTextComponent
                name="project_name"
                value={values?.project_name}
                type="string"
                className="form-control"
                placeholder="Enter Project Name here..."
                onChange={handleChange}
                error={errors?.name && touched?.name}
                helperText={errors?.name && touched?.name ? errors?.name : ""}
                onBlur={handleBlur}
              />
            </Grid>
          </Grid>
          <button
            className="btn btn-primary theme-background-color"
            onClick={() => createProject()}
          >
            +Create Project
          </button>
        </Dialog>
        <Dialog
          header="Create Task"
          visible={visibleTask}
          modal={false}
          style={{ width: "50vw" }}
          onHide={() => setVisibleTask(false)}
        >
          <Grid container className="display-flex mb-4">
            <Grid item xs={12} sm={6} md={6}>
              <InputTextComponent
                name="task_name"
                value={values?.task_name}
                type="string"
                className="form-control"
                placeholder="Enter Task here..."
                onChange={handleChange}
                error={errors?.task_name && touched?.task_name}
                helperText={
                  errors?.task_name && touched?.task_name
                    ? errors?.task_name
                    : ""
                }
                onBlur={handleBlur}
              />
            </Grid>
          </Grid>
          <button
            className="btn btn-primary theme-background-color"
            onClick={() => createTask()}
          >
            +Create Task
          </button>
        </Dialog>
      </div>
      <div className="row">
        <div className="col-md-3 dashboard-left-menu">
          <LeftNavbar />
        </div>
        <div className="col-md-9 dashboard-right-menu">
          <div className="dashboard-right-heading">
            Employee Task Management
          </div>
          <div>
            <button
              className="btn btn-primary custom-create-button me-2"
              onClick={() => setVisibleProject(true)}
            >
              +Add Project
            </button>
          </div>
          <div className="display-flex project-cards-div">
            {loader ? (
              <div className="circular-loader">
                <CircularProgress />
              </div>
            ) : null}
            {projectsData?.map((project) => {
              return (
                <div
                  className="margin-left-20px margin-top-20px"
                  key={project?.id}
                >
                  <Card className="custom-card-design">
                    <div className="display-flex justify-content-space-between">
                      <div>
                        <h4>{project?.project_name}</h4>
                      </div>
                      <div>
                        <DeleteIcon
                          fontSize="small"
                          onClick={() => projectDeleteHandler(project?.id)}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => taskHandler(project?.id)}
                      >
                        +Add Task
                      </button>
                    </div>
                    <div className="custom-table">
                      {project?.tasks?.map((task, index) => {
                        return (
                          <div key={index}>
                            <div className="flex align-items-center justify-content-space-between custom-h-40">
                              <div className="display-flex">
                                <div className="margin-right-20px">
                                  <Checkbox
                                    id={index}
                                    name="task"
                                    onChange={(e) =>
                                      statusChangeHandler(
                                        project?.project_id,
                                        task?.id,
                                        task?.task_status,
                                        task?.task_name
                                      )
                                    }
                                    checked={
                                      task?.task_status === "OPEN"
                                        ? false
                                        : true
                                    }
                                  />
                                </div>
                                <div className="task-label">
                                  <label className="ml-2">
                                    {task?.task_name}
                                  </label>
                                </div>
                                <div>
                                  <DeleteIcon
                                    fontSize="small"
                                    onClick={() =>
                                      taskDeleteHandler(project?.id, task?.id)
                                    }
                                    className="cursor-pointer"
                                  />
                                </div>
                              </div>
                              <div className="buttons-grid">
                                <div>
                                  <Button
                                    icon="pi pi-trash"
                                    size="small"
                                    className="task-custom-button"
                                  />
                                </div>
                                <div>
                                  <Button
                                    icon="pi pi-credit-card"
                                    size="small"
                                    className="task-custom-button"
                                  />
                                </div>
                                <div>
                                  <Button
                                    icon="pi pi-bookmark"
                                    size="small"
                                    className="task-custom-button"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTaskManager;
