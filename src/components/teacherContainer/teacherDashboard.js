import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Container, Card, CardBody, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faCalendarAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';
import TeachrProfile from "../Profiles/teacherProfile";
import { asyncGetOneTeacher } from "../../action/teacherAction";
import { jwtDecode } from "jwt-decode";
import { Modal, Form, Button } from "react-bootstrap";


import TeacherNavComponent from "./navigation/teachernavigation";
import { listStudentsAsync } from "../../action/studentAction";
import { asynclistClass } from "../../action/classAction";
import { listSubjectsAsync } from "../../action/subjectAction";
import { listEventsAsync } from "../../action/eventsCalenderAction";

function TeacherDashboard() {
  const students = useSelector((state) => state.students.data);
  const subjects = useSelector((state) => state.subject.data);
  const marksCard = useSelector((state) => state.marksCard.data);
  const classData = useSelector((state) => state.classes.data);
  const event = useSelector((state) => state.events.data);
  const teachers = useSelector((state) => state.teacher.oneTeacher)
  const [viewModel, setViewModel] = useState(false)
  console.log(teachers, "teacher")

  
  const dispatch = useDispatch();

  const token = localStorage.getItem("token")

  const { teacher } = jwtDecode(token)

  const viewToggle = () => {
    setViewModel(!viewModel)
  }

  const handleClick = () => {
    viewToggle()
  }
  

  useEffect(() => {
    dispatch(listStudentsAsync());
    dispatch(asynclistClass());
    dispatch(listEventsAsync());
    dispatch(listSubjectsAsync());
    dispatch(asyncGetOneTeacher(teacher))
  }, [dispatch]);

  return (
    <div>
      <Container
        fluid
        style={{
          backgroundColor: "#F0F0F0",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <Row>
          <Col xs={12} md={4}>
          <TeachrProfile/>
          <h3 onClick={handleClick}>{teachers.firstName}</h3>
            <TeacherNavComponent />
          </Col>
          <Col xs={12} md={8}>
            <div>
              <h2>Teacher Dashboard</h2>
              <Row>
                <Col md={5}>
                  <Link to="/liststudent">
                    <Card
                      style={{
                        marginBottom: "20px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        transition: "box-shadow 0.3s, transform 0.3s",
                        backgroundColor: "#ffcc80",
                        width: '250px', 
                        height: '120px',
                        marginTop: "20px"
                      }}
                    >
                      <CardBody>
                        <CardTitle tag="h5">
                          <FontAwesomeIcon icon={faUser} ml="10px"   className="nav-icon fa-2x" /> Students - {students.length}
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>

                <Col md={5}>
                  <Link to="/addmarkscard">
                    <Card
                      style={{
                        width: '250px', 
                        height: '120px',
                        marginTop: "20px",
                        marginBottom: "20px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        transition: "box-shadow 0.3s, transform 0.3s",
                        backgroundColor: "#ffcc80",
                      }}
                    >
                      <CardBody>
                        <CardTitle tag="h5">
                          <FontAwesomeIcon icon={faClipboard}  className="nav-icon fa-2x" />   Marks Card
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>

                <Col md={5}>
                  <Link to="/listSubjects">
                    <Card
                      style={{
                        width: '250px', 
                        height: '120px',
                        marginTop: "20px",
                        marginBottom: "20px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        transition: "box-shadow 0.3s, transform 0.3s",
                        backgroundColor: "#ef9a9a",
                      }}
                    >
                      <CardBody>
                        <CardTitle tag="h5">
                          <FontAwesomeIcon icon={faBook} className="nav-icon fa-2x"/>    Subjects - {subjects.length}
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>

                <Col md={5}>
                  <Link to="/addAttendance">
                    <Card
                      style={{
                        width: '250px', 
                        height: '120px',
                        marginTop: "20px",
                        marginBottom: "20px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        transition: "box-shadow 0.3s, transform 0.3s",
                        backgroundColor: "#ffcc80",
                      }}
                    >
                      <CardBody>
                        <CardTitle tag="h5">
                          <FontAwesomeIcon icon={faClipboard} className="nav-icon fa-2x"/> Attendance
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>

                <Col md={5}>
                  <Link to="/listClass">
                    <Card
                      style={{
                        width: '250px', 
                        height: '120px',
                        marginTop: "20px",
                        marginBottom: "20px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        transition: "box-shadow 0.3s, transform 0.3s",
                        backgroundColor: "#b39ddb",
                      }}
                    >
                      <CardBody>
                        <CardTitle tag="h5">
                          <FontAwesomeIcon icon={faClipboard} className="nav-icon fa-2x"/>  Classes - {classData.length}
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>

                <Col md={5}>
                  <Link to="/listevents">
                    <Card
                      style={{
                        width: '250px', 
                        height: '120px',
                        marginTop: "20px",
                        marginBottom: "20px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        transition: "box-shadow 0.3s, transform 0.3s",
                        backgroundColor: "#90caf9",
                      }}
                    >
                      <CardBody>
                        <CardTitle tag="h5">
                          <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon fa-2x"/> Calendar - {event.length}
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>


          <Modal show={viewModel} onHide={() => setViewModel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Teacher Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>FirstName : {teachers.firstName}</p>
          <p>LastName : {teachers.lastName}</p>
          <p>Class: {teachers?.classId?.map((ele) => ele.name)}</p>
          <p>Subject : {teachers?.subjects?.map((ele) => ele.subject)}</p>
          <p>Email : {teachers?.email}</p>
          <p>mobile  : {teachers?.mobile}</p>
        </Modal.Body>
      </Modal>
        </Row>
      </Container>
    </div>
  );
}

export default TeacherDashboard;
