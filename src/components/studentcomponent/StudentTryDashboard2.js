import { useEffect, useState } from "react";
import { Modal, Spinner, Row, Col, Card, CardBody, CardTitle, Button } from "react-bootstrap";
import axios from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { asyncGetOneAtendance } from "../../action/attendanceAction";
import { asynclistOneStudents } from "../../action/studentAction";
import { listStudentsAsync } from "../../action/studentAction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import {  faBook,  faDollarSign} from '@fortawesome/free-solid-svg-icons';
import { Chart } from "react-google-charts"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listOneStudentMarksAsync } from "../../action/marksCardAction"
import { listEventsAsync } from "../../action/eventsCalenderAction";
import StudentProfile from "../Profiles/studentPofile";



function StudentDashboard2() {
    const [student, setStudent] = useState(null);
    const [sId, setSid] = useState(null);
    const [classId, setClassId] = useState(null)
    const [modal, setModal] = useState(false);
    const [feeStatus, setFeeStatus] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState("");
    const [spinner, setSpinner] = useState(false);
    const events = useSelector((state) => state.events.data);
    console.log(events, "events")
    const attendance = useSelector((state) => state.attendance.selectedStudent);
    const [viewModel, setViewModel] = useState(false)
    const [eventModel, setEventModel] = useState(false)
    const [marksCardModal, setMarksCardModal] = useState(false)
    const [subjectModel, setSubjectModel] = useState(false)
    const dispatch = useDispatch();
    const newDate = new Date();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    const navigate = useNavigate()

    const students = useSelector((state) => state.students.data)
    // console.log(students, "students")

    const marks = useSelector((state) => state.marksCard.studentMarksCard)
    // console.log(marks)
    console.log(feeStatus, "fee")

    const viewToggle = () => {
        setViewModel(!viewModel)
    }

    const subjectToggle = () => {
     setSubjectModel(!subjectModel)
    }

    const eventToggle = () => {
        setEventModel(!eventModel)
    }

    const marksCardToggle = () => {
        setMarksCardModal(!marksCardModal)
    }

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const { id } = decodedToken;
    dispatch(asynclistOneStudents(id));

    const handleClick = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    useEffect(() => {
        const filteredStudent = students.find((student) => student.userId === id);
        if (filteredStudent) {
            setSelectedStudents(filteredStudent)
            setSid(filteredStudent._id);
            setClassId(filteredStudent.classId._id)
            // console.log(classId, "class")
        }
    }, [students, id]);

    useEffect(() => {
        dispatch(listStudentsAsync());
        if (sId) {
            dispatch(asyncGetOneAtendance(sId, month, year));
            dispatch(asynclistOneStudents(id));
        }
    }, [dispatch, sId, month, year, id]);

    useEffect(() => {
     dispatch(listEventsAsync())
    }, [])

    
    useEffect(() => {
        dispatch(listOneStudentMarksAsync(classId, sId))
    }, [dispatch, classId, sId])
    
    useEffect(() => {
        deletePendingPayment();
        loadStudentData()
    }, []);

    const loadStudentData = async () => {
        try {
            const tokendata = jwtDecode(localStorage.getItem("token"));
            const response = await axios.get(`/api/liststudent/${tokendata.id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log(response.data, "hii")
            setStudent(response.data);
        } catch (error) {
            console.error("Error loading student data:", error);
        }
    };

    useEffect(() => {
        if (student) {
            checkPaymentStatus();
        }
    }, [student]);
    
    const checkPaymentStatus = async () => {
        try {
            const response = await axios.get(
                `/api/payment-details/${student._id}/${student.classId._id}`
            );
            // console.log(response.data, "response.data")
            setFeeStatus([ ...feeStatus,response.data]);
           
        } catch (error) {
            console.error("Error checking payment status:", error);
        }
    };

    const handleDetails = () => {
        
        viewToggle()
    }

    const handleSubject = () => {
        subjectToggle()
    }

    const handleMarkscard = () => {
        marksCardToggle()
    }

    const deletePendingPayment = async () => {
        try {
            const stripeid = localStorage.getItem("stripeid");
            if (stripeid) {
                const response = await axios.delete(`/api/payment-delete/${stripeid}`);
                if (response.data) {
                    localStorage.removeItem("stripeid");
                }
            }
        } catch (error) {
            console.error("Error deleting pending payment:", error);
        }
    };

    console.log(student, "student")
    const makePayment = async () => {
        setSpinner(true);
        const body = {
            studentid: student._id,
            name: student.firstname,
            classid: student.classId._id,
            amount: Number(student.classId.fee),
        };
        try {
            const response = await axios.post("/api/payment-checkout", body);
            
            window.location.href = response.data.url;
            localStorage.setItem("stripeid", response.data.id);
            
        } catch (error) {
            console.error("Error making payment:", error);
        } finally {
            setSpinner(false);
        }
    };

    // const makePayment = async () => {
    //     setSpinner(true);
    //     const body = {
    //         studentid: student._id,
    //         name: student.firstname,
    //         classid: student.classId._id,
    //         amount: Number(student.classId.fee),
    //     };
    //     try {
    //         const response = await axios.post("/api/payment-checkout", body);
    //         // Show sweet alert when payment is successful
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Payment Successful',
    //             text: 'Thank you for your payment!',
    //         });
    //         localStorage.setItem("stripeid", response.data.id);
    //     } catch (error) {
    //         console.error("Error making payment:", error);
    //         // Show error message with sweet alert
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Payment Error',
    //             text: 'An error occurred while processing your payment. Please try again later.',
    //         });
    //     } finally {
    //         setSpinner(false);
    //     }
    // };
    
    

    const handleEvent = () => {
        eventToggle()
    }

    return (
        <div>
            <h2>Student Dashboard</h2>

            <Row>
            <Col xs={12} md={2}>
            {console.log(selectedStudents, "selectedStudents")}
                    <StudentProfile/>
                    <h3 onClick={handleDetails}>{selectedStudents?.firstname}</h3>

                </Col>
                <Col md={3}>
                    <b style={{ color: "#3D0C02", marginTop: "30px", marginLeft: "40px" }}>Attendance</b>
                    <Card style={{ height: "250px", width: "350px", backgroundColor: "#F5F5DC" }}>
                        {attendance && (
                            <Chart
                                chartType="PieChart"
                                data={[
                                    ["Attendance", "Days"],
                                    ["Present Days", attendance.presentDays],
                                    ["Absent Days", attendance.absentDays]
                                ]}
                                options={{
                                    backgroundColor: "#F5F5DC",

                                }}
                                width={"100%"}
                                height={"300px"}

                            />
                        )}
                    </Card>
                </Col>

                <Col md={3}>
                    <b style={{ color: "#3D0C02" }} onClick={handleMarkscard}>Marks Card</b>
                    <Card style={{ height: "300px", width: "350px", backgroundColor: "#F5F5DC", marginRight: "50px", marginTop: "0px" }}>
                        <Chart
                            chartType="Bar"
                            width="480px"
                            height="300px"
                            data={[
                                ["Subject", "Marks"],
                                ...(marks?.studentMarks?.subjects?.reduce((acc, subject) => {
                                    acc.push([subject.subjectId.subject, subject.marks]);
                                    return acc;
                                }, []) || [])
                            ]}
                            options={{
                                chart: {
                                    title: "Student's Performance",
                                    backgroundColor: "#F5F5DC" // Set background color here
                                }
                            }}
                        />
                    </Card>
                </Col>

                 <Col xs={12} md={2}>
                  <Card style={{background:"#F5F5DC", height:"120px", width: "250px", marginTop:"35px",marginLeft:"130px"}}>
                  <CardBody>
                  <FontAwesomeIcon icon={faBook} style={{ fontSize: "5em" }}/>{"        "}
                  <b style={{ fontWeight: "bolder", fontSize: "1.5em",  marginBottom: "-30px", color:"#000080" }} onClick={() => {
                    handleSubject()
                  }}>Subjects</b>
                  </CardBody>
                  </Card>
                  </Col>

                  <Col xs={12} md={2}>
                    <Card style={{ background:"#F5F5DC", color: '#000080', width: '250px', height: '120px',marginTop: "200px",marginLeft: "-120px"}}>
                        <CardBody className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faDollarSign} className="nav-icon mr-3 fa-3x" />
                            <CardTitle tag="h5">Fee Details</CardTitle>
                            <button
                                onClick={() => setModal(true)}
                                style={{ width: "100%" , color:"#000080" }}
                            >
                                View Details
                            </button>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs={12} md={4} style={{marginLeft: "500px", maxWidth: "800px", marginTop:"20px"}}>
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        events={events} 
                        eventClick={handleEvent}
                        eventTextColor="#ffffff" 
                        eventColor="#007bff" 
                        eventBorderColor="#007bff" 
                        eventsBackgroundColor="black" 
                    />
                </Col>

                  <Col md={3}>
                <Button onClick={handleClick} style={{marginLeft:"-950px", marginTop:"300px"}}>Logout</Button>
                </Col>
               

                <Modal show={modal} onHide={() => setModal(false)}>
                    <Modal.Header closeButton>
                        {console.log(feeStatus, "fs")}
                        {feeStatus && feeStatus[0]?.status === "success" ? (
                            <h2>Fees Paid</h2>
                        ) : (
                            <h2>Pending Fees - {student && student.classId?.fee}</h2>
                        )}
                    </Modal.Header>
                    <Modal.Footer>
                        {spinner ? (
                            <Spinner />
                        ) : (
                            !(feeStatus && feeStatus[0]?.status === "success") && (
                                <button onClick={makePayment}>Pay</button>
                            )
                        )}
                    </Modal.Footer>
                </Modal>



                <Modal show={viewModel} onHide={viewToggle}>
                     <Modal.Header closeButton>
                        <b>Student Details</b>
                     </Modal.Header>
                     { selectedStudents && (
                     <Modal.Body>
                   
                          <p>First Name: {selectedStudents.firstname}</p><br/>
                         <p>Last Name: {selectedStudents.lastname}</p><br/>
                         <p>Roll Number: {selectedStudents.rollnumber}</p><br/>
                         <p>Class : {selectedStudents.classId.name}</p> <br/>
                        <p>Email : {selectedStudents.email}</p><br/>
                        <p>Parents Name: {selectedStudents.parentsname}</p><br/>
                        <p>Parents Number: {selectedStudents.parentnumber}</p><br/>
                     
                      
                      </Modal.Body>
                      )}
                     <Modal.Footer>
                         <Button variant="secondary" onClick={viewToggle}>
                             Cancel
                         </Button>
                        
                      </Modal.Footer>
                  </Modal>

                
                    <Modal show={eventModel} onHide={eventToggle}>
                    <Modal.Header closeButton>
                        <b>Event Details</b>
                    </Modal.Header>
                     { events && (
                         <Modal.Body>
                    {events.map(event => (
                        <div key={event._id}>
                        <p>Event Type :{event.eventType}</p>
                        <p>Event Description: {event.description}</p>
                        </div>
                    ))}
                      </Modal.Body>

                      )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={eventToggle}>
                              Cancel
                          </Button>
                        
                     </Modal.Footer>
                 </Modal>
                


                 <Modal show={subjectModel} onHide={subjectToggle}>
                     <Modal.Header closeButton>
                          <b>SubjectDetails</b>
                      </Modal.Header>
                     {marks && (
                         <Modal.Body>
                    {marks?.studentMarks?.subjects.map(subject => (
                    <div key={subject.subjectId._id}>
                        <p>{subject.subjectId.subject}</p>
                    </div>
                 ))}
                     </Modal.Body>
                     )}
                   
                    
                    <Modal.Footer>
                         <Button variant="secondary" onClick={subjectToggle}>
                             Cancel
                        </Button>
                        
                     </Modal.Footer>
                 </Modal>

                 <Modal show={marksCardModal} onHide={marksCardToggle}>
                     <Modal.Header closeButton>
                        <b>MarksCard</b>
                     </Modal.Header>
                     <Modal.Body>
                    {marks?.studentMarks?.subjects.map(subject => (
                    <div key={subject.subjectId._id}>
                        <p>{subject.subjectId.subject} :{subject.marks}</p>
                    </div>
                 ))}
                     </Modal.Body>
                     <Modal.Footer>
                         <Button variant="secondary" onClick={marksCardToggle}>
                             Cancel
                         </Button>
                        
                      </Modal.Footer>
                  </Modal>

              
            </Row>
            
        </div>
    );
}

export default StudentDashboard2;
