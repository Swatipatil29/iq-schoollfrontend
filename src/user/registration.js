import { useFormik } from "formik";
import * as Yup from "yup";
import "./register.css";
import { useState } from "react";
import axios from "../config/axios";
import { Row, Col } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email should be in proper format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(120, "Password must be less than 120 characters"),
  role: Yup.string().required("Role is required"),
});

export default function PrincipleRegistration() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      axios.post("/api/user", values)
        .then((response) => {
          setUser(response.data);
          notifySuccess();
          resetForm()
          setTimeout(() => {
          }, [3500])
          
        })
        .catch((error) => {
          const errors = error.response.data.errors[0].msg;
          if (error) {
            notifyError(errors);
          }
        });
      console.log(values);
    },
  });

  const handleClick = () => {
    navigate("/principle")
  }

  const handleroleChange = (e) => {
    formik.handleChange(e);
  };

  const notifySuccess = () => {
    toast.success('You are registered successfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
    });
  };

  const notifyError = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="container-fluid sm">
      <Row >
        <Col md={6} className="wrapper5">
          
        </Col>
        <Col md={6}>
          <div className=" form">
            <form onSubmit={formik.handleSubmit}>
              <h2 style={{color:"orange"}}>Register Heree!!!!</h2>
              <div className="mb">
                <label htmlFor="email" className="form-label">
                  Enter email
                </label>{" "}
                <br />
                <input
                  type="text"
                  id="email"
                  value={formik.values.email}
                  name="email"
                  className="form-control input"
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <span className="text-danger">{formik.errors.email}</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Enter Password
                </label>{" "}
                <br />
                <input
                  type="password"
                  id="password"
                  value={formik.values.password}
                  name="password"
                  onChange={formik.handleChange}
                  className="form-control input"
                />
                {formik.errors.password && (
                  <span className="text-danger">{formik.errors.password}</span>
                )}
              </div>

              <div className="form-check form-check-inline radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="Teacher"
                  value="Teacher"
                  checked={formik.values.role === "Teacher"}
                  onChange={handleroleChange}
                />
                <label className="form-check-label" htmlFor="Teacher">
                  Teacher
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="Student"
                  value="Student"
                  checked={formik.values.role === "Student"}
                  onChange={handleroleChange}
                />
                <label className="form-check-label" htmlFor="Student">
                  Student
                </label>
              </div>{" "}
              <br />
              <br />

              <button type="submit" className="btn btn-primary submit">
                Submit
              </button>
            </form>
          </div>
          <button onClick={handleClick} style={{marginLeft: "200px" , marginTop : "100px"}}>Home</button>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
}

