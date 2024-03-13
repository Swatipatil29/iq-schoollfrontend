import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavComponent from "./navigation/principlenavigate";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Container, Card, CardBody, CardTitle } from "reactstrap";
import { useEffect } from "react";
import { listStudentsAsync } from "../../action/studentAction";
import { listTeacherAsync } from "../../action/teacherAction";
import { asynclistClass } from "../../action/classAction";
import { listSubjectsAsync } from "../../action/subjectAction";
import { listEventsAsync } from "../../action/eventsCalenderAction";
import axios from "../../config/axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Profile from "../Profiles/PrincipleProfile";
import { faUser, faChalkboardTeacher, faBook, faCalendarAlt, faDollarSign, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';


function PrincipleDashboard() {
  const [totalFee ,setTotalFee] = useState(0)
  const students = useSelector((state) => {
    return state.students.data;
  });

  const teacher = useSelector((state) => {
    return state.teacher.data;
  });


  const classes = useSelector((state) => {
    return state.classes.data;
  });

  const subjects = useSelector((state) => state.subject.data);

  const events = useSelector((state) => state.events.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listStudentsAsync());
    dispatch(listTeacherAsync());
    dispatch(asynclistClass());
    dispatch(listSubjectsAsync());
    dispatch(listEventsAsync());
  }, [dispatch]);

  useEffect(()=>{
    (async ()=>{
      try{
        const response = await axios.get("/api/totalFee",{
          headers : {
            Authorization : localStorage.getItem('token')
          }
        })
          setTotalFee(response.data.totalFee)
      }catch(e){
        console.log(e)
      }
    })()
  },[])

  return (
    <Container fluid className="PrincipleDashboard-container">
      <Row>
        <Col xs={12} md={3}>
          <Profile/>
          <NavComponent />
          
        </Col>
        <Col xs={12} md={9}>
          <div>
            
            <h2 style={{color:"purple"}}>Principle Dashboard</h2>
            <Row>
              <Col md={3}>
                <Link to="/addStudent" className="text-decoration-none">
                  <Card   style={{ color:'orange',width: '250px', height: '120px',marginTop: "20px" }}>
                    <CardBody className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faUser} className="nav-icon mr-3 fa-6x" />{"   "}
                      <div>
                        <CardTitle tag="h5" className="mb-0">
                          <span>Students-{students.length}</span><br/>
                        </CardTitle>
                        
                        <small>Add Student</small>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>

              <Col md={3}>
                <Link to="/addteacher" className="text-decoration-none" >
                  <Card  style={{  color:'brown',width: '260px', height: '120px',marginTop: "20px" }}>
                    <CardBody className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faChalkboardTeacher} className="nav-icon mr-0 fa-6x" />{"  "} 
                      <div>
                        <CardTitle tag="h5" className="mb-0">
                        <span>Teachers-{teacher.length}</span>
                        </CardTitle>
                        <small>Add Teacher</small>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>

              <Col md={3}>
                <Link
                  to="/addSubjects"
                  className="text-decoration-none"
                >
                  <Card  style={{  color:'black',width: '250px', height: '120px',marginTop: "20px"}}>
                    <CardBody className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faBook} className="nav-icon mr-3 fa-5x" />{"   "}
                      <div>
                        <CardTitle tag="h5" className="mb-0 ">
                           Subjects- {subjects.length}
                        </CardTitle>
                        <small>Add Subject</small>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>

              

              <Col md={3}>
                <Link to="/addclasses" className="text-decoration-none" >
                  <Card  style={{  color:'green',width: '250px', height: '120px', marginTop: "20px"}}>
                    <CardBody className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faUsers} className="nav-icon mr-3 fa-4x" />
                      <div>
                        <CardTitle tag="h5" className="mb-0">
                           Classes - {classes.length}
                        </CardTitle>
                        <small>Add Class</small>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>

              <Col md={3}>
                <Link to="/feedetails" className="text-decoration-none">
                  <Card  style={{ color:'violet',backgroundColor: '	#FFFFCC',width: '250px', height: '120px', marginTop: "20px"}}>
                    <CardBody className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faDollarSign} className="nav-icon mr-3 fa-3x" />
                      <div>
                        <CardTitle tag="h5" className="mb-0">Total Fee - {totalFee}</CardTitle>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>

              <Col md={3}>
                <Link
                  to="/addEventsCalender"
                  className="text-decoration-none"
                >
                  <Card style={{ color:'skyblue',width: '250px', height: '120px', marginTop: "20px"}}>
                    <CardBody className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon mr-3 fa-5x" />
                      <div>
                        <CardTitle tag="h5" className="mb-0">
                          Calendar - {events.length}
                        </CardTitle>
                        <small>Add Events</small>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>

              <Col md={3}>
                <Link to="/register" className="text-decoration-none">
                  <Card  style={{ color:'darkslateblue',width: '250px', height: '120px', marginTop: "20px"}}>
                    <CardBody className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faUserPlus} className="nav-icon mr-3 fa-2x" />
                      <div>
                        <CardTitle tag="h5" className="mb-0">
                          Add User
                        </CardTitle>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
             
      <div className="col-md-6" style={{ color:'blue',backgroundColor: '	#E8E8E8',marginTop: "40px", width:"600px" , marginLeft:"150px"}}>
    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events = {events}
    />
</div>
              
              
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PrincipleDashboard;

