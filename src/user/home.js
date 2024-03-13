


import React, { useEffect, useState } from "react";
import './homeImg.css';
import Logo from '../images/iqlogo.jpg';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../action/userAction";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);
  console.log(users, "user")
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser());
  }, []);

  // const handleSignInClick = () => {
  //   if (users.length === 0) {
  //     navigate("/register")
  //   } else {
  //     alert("You are not authorized");
  //   }
  // };

  return (
    <div>
      {/* Left Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-lg navbar-colum " >
        <div className="container">
          <Link className="navbar-brand"   to="/" style={{ color: 'black' }}>
            <img height={100}  src={Logo} alt='logo' className="rounded float-left" />
          </Link>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link"  style={{ color: 'black' }} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  style={{ color: 'black' }} to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  style={{color: "black" }} to="/login">Sign In</Link>
              </li>
              <li className="nav-item">
                {users.length === 0 ? (
                  <Link className="nav-link"  to="/register">Sign Up</Link>
                ) : (
                  <span onClick={() => alert("You are not authorized")}>Sign Up</span>
                )}
              </li>
              <li className="nav-item">
                <Link className="nav-link"  style={{ color: 'black' }} to="/listEvents">Event Calendar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{ color: 'black' }} to="/schooltimings">School Timings</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid text-center wrapper_custom">
        <h2 className="display-4" style={{ color: '#d32f2f' }}>Welcome to IQSKOOL</h2>
        <br />
      </div>

      {/* Sign Up Section */}
      <div className="container-fluid text-center">
        <div className="button">
          <span>Don't have an account?</span>
          <Link className="btn btn-primary" to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
