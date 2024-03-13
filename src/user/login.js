
import { useState } from "react";
import axios from "../config/axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode} from "jwt-decode"
import isEmail from 'validator/lib/isEmail';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Row, Col} from "reactstrap"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // state to track if password should be shown
  const navigate=useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const runValidations = () => {
    const errors = {};

    if(email.trim().length===0){
      errors.email = 'Email is required';
    } else if(!isEmail(email)){
      errors.email = 'Invalid email format';
    }
    
    if(password.trim().length===0){
      errors.password = 'Password is required';
    } else if(password.trim().length < 8 || password.trim().length > 128){
      errors.password = 'Password length must be between 8-128 characters';
    }

    setFormErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    runValidations();

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post("/api/userlogin", {
          email,
          password,
        });

        localStorage.setItem("token", response.data.token);
          let token = response.data.token 
         const {role} = jwtDecode(token)
         

          switch (role) {
           case "Principle": {
           navigate("/principle");
           break; // don't forget to add break after each case
          }
           case "Teacher": {
           navigate("/teacher");
           break;
            }
           case "Student": {
          navigate("/studentdashboard2");
           break;
       }

       default: (
        navigate("/")
       )

}

        //  console.log(role)
      } catch (error) {
        const errors = error.response.data.errors;
        notifyError(errors)
      }
    }
  };

  // const notifyError = () => {
  //   toast.error(serverError, {
  //     position: "top-center",
  //     autoClose: 2500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // };

  const notifyError = (errors) => {
    toast.error(errors, {
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
    <div className="container-fluid">
      
      <Row>
        
        <Col md={6} className="wrapper">
        </Col>

        <Col md={6} className="channel d-flex align-items-center justify-content-center vh-100">
          <form onSubmit={handleSubmit} className="loginform" style={{marginTop:"40px"}} >
            <h2 style={{color:"red"}}>SignIn Here!!!!!</h2>
            <label htmlFor="email" className="form-label">Enter Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            <br />

            <label htmlFor="password" className="form-label">Enter Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary password-toggle-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
            <br />

            <button type="submit" className="btn btn-primary submit">
              Submit
            </button>
            <Link to='/forgot-password'>ForgotPassword</Link>
          </form>
        </Col>

        <ToastContainer/>
      
      </Row>
    </div>
  );
}
