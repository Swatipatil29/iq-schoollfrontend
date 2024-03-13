import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStudentsAsync, deleteStudentAsync, startUpdateStudent } from "../../action/studentAction";
import { asynclistClass } from "../../action/classAction";
import { Button, Form, FormGroup, Label, Input, Row, Col, Modal, ModalHeader, ModalBody, Container } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FadeLoader } from "react-spinners"
import "./ListStudent.css"; 
import { jwtDecode } from "jwt-decode";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";
import { useNavigate} from "react-router-dom";
import StudentProfile from "../Profiles/studentPofile";

function ListStudent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [modal, setModal] = useState(false);
    const [viewModal, setViewModal] = useState(false)
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([])
    const [parentnumber, setParentNumber] = useState("");
    const [rollnumber, setRollnumber] = useState("");
    const [gender, setGender] = useState("");
    const [parentsname, setParentname] = useState("");
    const [email, setEmail] = useState("");
    const [classes, setClasses] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [userId, setUserId] = useState("");
    const [editId, setEditId] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);
    const [selectedStudent, setSelectedStudent] = useState("")

    const students = useSelector((state) => state.students.data);
    console.log(students)
    const classess = useSelector((state) => state.classes.data);

    useEffect(() => {
        const token = localStorage.getItem("token")
        const {role} = jwtDecode(token)
        console.log(role)
        setRole(role);
        dispatch(listStudentsAsync());
        dispatch(asynclistClass());
        setLoading(false);
    }, [dispatch]);

    const toggleModal = () => {
        setModal(!modal);
    };

    const toggleView = () => {

        setViewModal(!viewModal)
    }
    const handleDelete = (studentId) => {
        const confirm = window.confirm('Are you sure??');
        if (confirm) {
            dispatch(deleteStudentAsync(studentId));
        }
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
    };
    

    const handleUpdate = (studentId) => {
        setEditId(studentId);
        const selectedUser = students.find((student) => student._id === studentId);
        setFirstName(selectedUser.firstname);
        setLastName(selectedUser.lastname);
        setParentNumber(selectedUser.parentnumber);
        setParentname(selectedUser.parentsname);
        setRollnumber(selectedUser.rollnumber);
        setEmail(selectedUser.email);
        setClasses(selectedUser.classes);
        setGender(selectedUser.gender);
        toggleModal();
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedStudent = {
            firstname,
            lastname,
            parentnumber,
            rollnumber,
            gender,
            parentsname,
            email,
            classes,
            profilePic,
            userId,
            gender
        };
        dispatch(startUpdateStudent(updatedStudent, editId));
        toggleModal();
    };

    const handleView = (id) => {
        const selectedStudent = students.filter((ele) => {
             if(ele._id === id){
                 return ele
             }
         })
         setSelectedStudent(selectedStudent)
        toggleView()
    }

    const handleSortChange = (value) => {
        const sortedStudents = [...filteredStudents];
        if (value === 'ascending') {
            sortedStudents.sort((a, b) => a.firstname.localeCompare(b.firstname));
        } else if (value === 'descending') {
            sortedStudents.sort((a, b) => b.firstname.localeCompare(a.firstname));
        }
        // Update the local variable instead of setting state directly
        setFilteredStudents(sortedStudents);
    };

    useEffect(() => {
        // Filter students based on the search query
        const query = searchQuery.toLowerCase();
        const filteredStudents = students.filter(student => 
            student.firstname.toLowerCase().includes(query) || 
            student.lastname.toLowerCase().includes(query)
        );
        setFilteredStudents(filteredStudents);
    }, [searchQuery, students]);

    // Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={5}>
                    {role === "Principle"? (<NavComponent />) : (<TeacherNavComponent/>)}
                </Col>
                

                <Col xs={12} md={7}>
                    <div>
                        {loading ? (
                            <div className="spinner-container">
                                <FadeLoader color={"#36D7B7"} loading={loading} size={150} />
                            </div>
                        ) : (
                            <div style={{color:"#330000"}}>
                                <h2 style={{color:"brown"}}>Listing Students</h2>
                                <FormGroup>
                                    <Label for="search">Search Student:</Label>
                                    <Input
                                        type="text"
                                        id="search"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="sort">Sort by Name:</Label>
                                    <Input
                                        type="select"
                                        id="sort"
                                        onChange={(e) => handleSortChange(e.target.value)}
                                    >
                                        <option value="ascending">A-Z</option>
                                        <option value="descending">Z-A</option>
                                    </Input>
                                </FormGroup>
                                <ul>
                                    {currentStudents.map((student, i) => (
                                        <li key={i}>
                                            <div className="student-info">
                                                <span>{student.firstname} - {student.lastname}</span>
                                                {role === "Principle" ? (
                                                    <div className="edit-delete-buttons">
                                            
                                                    <button className="btn btn-primary" onClick={() => handleView(student._id)}>view</button>
                                                    <button className="btn btn-primary" onClick={() => handleUpdate(student._id)}>Edit</button>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>Delete</button>
                                                    <button onClick={()=>navigate(`/listonestudentmarks/${student.classId._id}/${student._id}`)}>MarksCard</button>
                                                
                                                </div>
                                                ) : (
                                                    <button onClick={()=>navigate(`/listonestudentmarks/${student.classId._id}/${student._id}`)}>MarksCard</button>
                                                )}
                                               
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {/* Pagination */}
                                <nav>
                                    <ul className='pagination'>
                                        {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }, (_, i) => (
                                            <li key={i} className='page-item'>
                                                <a onClick={() => paginate(i + 1)} className='page-link'>
                                                    {i + 1}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        )}
                        <Modal isOpen={modal} toggle={toggleModal} >
                            <ModalHeader toggle={toggleModal} style={{color:"pink"}}>Edit Student</ModalHeader>
                            <div style={{color:"green"}} >
                            <ModalBody  style={{backgroundColor:"skyblue"}}>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="firstname">First Name:</Label>
                                        <Input
                                            type="text"
                                            id="firstname"
                                            value={firstname}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                           
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastname">Last Name:</Label>
                            <Input
                                type="text"
                                id="lastname"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="parentnumber">Parent Mobile Number:</Label>
                            <Input
                                type="text"
                                id="parentnumber"
                                value={parentnumber}
                                onChange={(e) => setParentNumber(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="rollnumber">Roll Number:</Label>
                            <Input
                                type="text"
                                id="rollnumber"
                                value={rollnumber}
                                onChange={(e) => setRollnumber(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="parentsname">Parent Name:</Label>
                            <Input
                                type="text"
                                id="parentsname"
                                value={parentsname}
                                onChange={(e) => setParentname(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="classes">Student Class:</Label>
                            <select
                                id="classes"
                                value={classes}
                                onChange={(e) => setClasses(e.target.value)}
                            >
                                <option value="">Select a class</option>
                                {classess.map((ele) => (
                                    <option key={ele._id} value={ele._id}>
                                        {ele.name} - {ele.sectionname}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <legend>Gender:</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={gender === "Male"}
                                        onChange={() => setGender("Male")}
                                    />
                                    Male
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={gender === "Female"}
                                        onChange={() => setGender("Female")}
                                    />
                                    Female
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="profilePic">Profile Picture:</Label>
                            <Input
                                type="file"
                                id="profilePic"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                            />
                        </FormGroup>

                                    <Button type="submit" color="primary">Save Changes</Button>
                                </Form>
                            </ModalBody>
                            </div>
                        </Modal>

                        <Modal isOpen={viewModal} toggle={toggleView}>
                        <ModalHeader toggle={toggleView} style={{ color: "pink" }}>Student details</ModalHeader>
                        <div style={{ color: "green" }}>
                            <ModalBody style={{ backgroundColor: "#FFFFCC" }}>
            <div>
                {console.log(selectedStudent)}
                {selectedStudent && selectedStudent.length > 0 && (
                    <>
                        {selectedStudent[0].profilePic ? (
                            <div>
                                <img
                                    src={`http://localhost:3050/images/${selectedStudent[0].profilePic}`}
                                    alt="Profile Pic"
                                    style={{ width: "60px", height: "auto" }}
                                />
                            </div>
                        ): (
    <div>
        <img
            src={process.env.PUBLIC_URL + "/images/dumyimage.jpg"}
            alt="Dummy Image"
            style={{ width: "60px", height: "auto" }}
        />
    </div>
)}
                        <p>First Name - {selectedStudent[0].firstname}</p>
                        <p>Last Name - {selectedStudent[0].lastname}</p>
                        <p>Class- {selectedStudent[0].classId.name}</p>
                        <p>Roll Number- {selectedStudent[0].rollnumber}</p>
                        <p>Email- {selectedStudent[0].email}</p>
                        <p>Parent Name - {selectedStudent[0].parentsname}</p>
                        <p>Parent Number - {selectedStudent[0].parentnumber}</p>
                    </>
                )}
            </div>
        </ModalBody>
    </div>
</Modal>


                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ListStudent;
