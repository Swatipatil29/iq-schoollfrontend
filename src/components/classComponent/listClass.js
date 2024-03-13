// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { asynclistClass, deleteClassAsync, updatedClassAsync } from "../../action/classAction";
// import { listTeacherAsync } from "../../action/teacherAction";
// import { listStudentsAsync } from "../../action/studentAction";
// import { listSubjectsAsync } from "../../action/subjectAction";
// import { jwtDecode } from "jwt-decode";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Container } from 'reactstrap';
// import { useNavigate } from "react-router-dom";
// import "./listClass.css";
// import NavComponent from "../principleContainer/navigation/principlenavigate";
// import ListOneClass from "./listOneClass";
// import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";



// function ListClass() {
//     const navigate = useNavigate();
//     const [name, setName] = useState("");
//     const [sectionname, setSectionName] = useState("");
//     const [teacherId, setTeacherId] = useState("");
//     const [students, setStudents] = useState([]);
//     const [subjects, setSubjects] = useState([]);
//     const [fee, setFee] = useState("");
//     const [editId, setEditId] = useState(null);
//     const [modal, setModal] = useState(false);
//     const [studentCount, setStudentCount] = useState(0)
//     const [viewModal, setViewModal] = useState(false)
//     const [editModal, setEditModal] = useState(false)

//     const toggleEditModal = () => setEditModal(!editModal)
   

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(asynclistClass());
//         dispatch(listTeacherAsync());
//         dispatch(listStudentsAsync());
//         dispatch(listSubjectsAsync());
//     }, []);

//     const classes = useSelector((state) => state.classes.data);
//     console.log(classes, "classes")
//     const teachers = useSelector((state) => state.teacher.data);
//     const studentsData = useSelector((state) => state.students.data);
//     const subjectss = useSelector((state) => state.subject.data);

//     const token = localStorage.getItem("token")
//     const { role } = jwtDecode(token)

//     const handleDelete = async (id) => {
//         const confirm = window.confirm('Are you sure??');
//         if (confirm) {
//             await dispatch(deleteClassAsync(id));
//             dispatch(asynclistClass()); 
//         }
//     };


//     const handleEdit = (id) => {
//         setEditId(id);
//         const selectedClass = classes.find((ele) => ele._id == id)
//         console.log(selectedClass)
//         setName(selectedClass.name)
//         setSectionName(selectedClass.sectionname);
//         setTeacherId(selectedClass.teacherId)
//         setStudents(selectedClass.students)
//         setSubjects(selectedClass.subject)
//         setFee(selectedClass.fee)
//         toggleEditModal();
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = {
//             name,
//             sectionname,
//             teacherId,
//             students,
//             subjects,
//             fee,
//         };
//         console.log(formData)
//         dispatch(updatedClassAsync(formData, editId));
//         dispatch(asynclistClass());
//         toggleEditModal(); 
//         setEditId(null);
//         setName("");
//         setSectionName("");
//         setTeacherId("");
//         setStudents("");
//         setSubjects("");
//         setFee("");
//     };

//     const handleView = (id) => {
//         navigate(`/listOneClass/${id}`)

//         // const classToView = classes.find((ele) => ele._id === id);
//         // // const classStudents = studentsData.filter((student) => student.classId === id);
//         // const studentCount = classToView.students.length;
//         // console.log(studentCount)

//         // // const teacher = teachers.find((ele) => ele.id == classToView.teacherId  )
        
//         // const teacher = teachers.find((teacher) => teacher._id === classToView.teacherId);
        
//         // setStudentCount(studentCount)
//         // setName(classToView.name);
//         // setSectionName(classToView.sectionname);
//         // setTeacherId(teacher ? teacher.firstName : '')
//         // setSubjects(classToView.subjects);
//         // setFee(classToView.fee);
        
//     }

    

//     return (
//         <Container fluid>
//         <h1 style={{marginLeft: "300px"}}>Listing Class</h1>
//         <Row>
//         <Col xs={12} md={6}>
//         { role === "principle" && <NavComponent/>}
//         { role === "Teacher" && <TeacherNavComponent/>}
//         </Col>

       
        

//         <Col xs={12} md={7}>
//             <h2 style={{color:'orangered'}}> Listing Classes</h2>
//         <div style={{color:'#993366'}}>
//             {classes.map((ele) => (
//     <div key={ele._id} className="list-container">
//         <div className="class-info">
//             {ele.name} 
//         </div>
//         { role === "Principle" ? (
//             <div className="button-container">
//             <button className="edit-btn" onClick={() => handleEdit(ele._id)}>Edit</button>
//             <button className="delete-btn" onClick={() => handleDelete(ele._id)}>Delete</button>
//             <button className="view-btn" onClick={() => handleView(ele._id)}>View</button>
//         </div>
//         ) : (
//             <button className="view-btn" onClick={() => handleView(ele._id)}>View</button> 
//         )}
        
//     </div>
// ))}

//       <Modal isOpen={viewModal} toggle={toggleViewModal}>
//                 <ModalHeader toggle={toggleViewModal} style={{color:'blue'}}>Class Information</ModalHeader>
//                 <ModalBody style={{backgroundColor:'#99CCFF'}}>
//                     <p>Class Name: {name}</p>
//                     <p>Teacher: {teacherId}</p>
//                     <p>Number of Students: {studentCount}</p>
//                 </ModalBody>
//                 <ModalFooter></ModalFooter>
//                 </Modal>



//             <Modal isOpen={editModal} toggle={toggleEditModal}>
//                 <ModalHeader toggle={toggleEditModal} style={{color:'brown'}}>Edit Class</ModalHeader>
//                 <div style={{color:'#FF33FF'}}>
//                 <ModalBody style={{backgroundColor:'#99CCFF'}}>
//                     <form onSubmit={handleSubmit}>
//                         <label>Enter className</label>
//                         <input
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName([e.target.value])}
//                         />
//                         <br />
//                         <label>Enter Fee</label>
//                         <input
//                             type="text"
//                             value={fee}
//                             onChange={(e) => setFee(e.target.value)}
//                         />
//                         <br />
//                         <label className="dropdown">Select TeacherId</label>
//                         <br />
//                         <select
//                             value={teacherId}
//                             onChange={(e) => setTeacherId(e.target.value)}
//                         >
//                             <option value="" disabled>Select a Teacher</option>
//                             {teachers.map((teacher, i) => (
//                                 <option key={i} value={teacher._id}>
//                                     {teacher.firstName}
//                                 </option>
//                             ))}
//                         </select>
//                         <br /><br/>
//                         <br />
//                         <label className="dropdown">Select students</label>
//                         <br />
//                         <select
//                             value={students}
//                             onChange={(e) => setStudents([e.target.value])}
//                         >
//                             <option value="" disabled>Select a student</option>
//                             {studentsData.map((student, i) => (
//                                 <option key={i} value={student._id}>
//                                     {student.firstname}
//                                 </option>
//                             ))}
//                         </select>
//                         <br /><br/>
//                         <br />
                       
//                         <label className="dropdown">Select SubjectId</label>
//                         <br />
//                         <select
//                             value={subjects}
//                             onChange={(e) => setSubjects(e.target.value)}
//                         >
//                             <option value="" disabled>Select a Subject</option>
//                             {subjectss.map((subject, i) => (
//                                 <option key={i} value={subject._id}>
//                                     {subject.subject}
//                                 </option>
//                             ))}
//                         </select>
//                         <br /><br/>
//                     </form>
//                 </ModalBody>
//                 </div>
//                 <ModalFooter>
//                     <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
//                     <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
//                 </ModalFooter>
//             </Modal>

           
            
//         </div>
//         </Col>
//         </Row>
//         </Container>
//     );
// }

// export default ListClass;



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynclistClass, deleteClassAsync, updatedClassAsync } from "../../action/classAction";
import { listTeacherAsync } from "../../action/teacherAction";
import { listStudentsAsync } from "../../action/studentAction";
import { listSubjectsAsync } from "../../action/subjectAction";
import { jwtDecode } from "jwt-decode";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Container } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import "./listClass.css";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import ListOneClass from "./listOneClass";
import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";



function ListClass() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [sectionname, setSectionName] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [fee, setFee] = useState("");
    const [editId, setEditId] = useState(null);
    const [modal, setModal] = useState(false);
    const [studentCount, setStudentCount] = useState(0)
    const [viewModal, setViewModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const toggleEditModal = () => setEditModal(!editModal)
    const toggleViewModal = () => setViewModal(!viewModal)
    
   

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asynclistClass());
        dispatch(listTeacherAsync());
        dispatch(listStudentsAsync());
        dispatch(listSubjectsAsync());
    }, []);

    const classes = useSelector((state) => state.classes.data);
    console.log(classes, "classes")
    const teachers = useSelector((state) => state.teacher.data);
    const studentsData = useSelector((state) => state.students.data);
    const subjectss = useSelector((state) => state.subject.data);

    const token = localStorage.getItem("token")
    const { role } = jwtDecode(token)

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure??');
        if (confirm) {
            await dispatch(deleteClassAsync(id));
            dispatch(asynclistClass()); 
        }
    };


    const handleEdit = (id) => {
        setEditId(id);
        const selectedClass = classes.find((ele) => ele._id == id)
        console.log(selectedClass)
        setName(selectedClass.name)
        setSectionName(selectedClass.sectionname);
        setTeacherId(selectedClass.teacherId)
        setStudents(selectedClass.students)
        setSubjects(selectedClass.subject)
        setFee(selectedClass.fee)
        toggleEditModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            sectionname,
            teacherId,
            students,
            subjects,
            fee,
        };
        console.log(formData)
        dispatch(updatedClassAsync(formData, editId));
        dispatch(asynclistClass());
        toggleEditModal(); 
        setEditId(null);
        setName("");
        setSectionName("");
        setTeacherId("");
        setStudents("");
        setSubjects("");
        setFee("");
    };

    const handleView = (id) => {
        navigate(`/listOneClass/${id}`)

        // const classToView = classes.find((ele) => ele._id === id);
        // // const classStudents = studentsData.filter((student) => student.classId === id);
        // const studentCount = classToView.students.length;
        // console.log(studentCount)

        // // const teacher = teachers.find((ele) => ele.id == classToView.teacherId  )
        
        // const teacher = teachers.find((teacher) => teacher._id === classToView.teacherId);
        
        // setStudentCount(studentCount)
        // setName(classToView.name);
        // setSectionName(classToView.sectionname);
        // setTeacherId(teacher ? teacher.firstName : '')
        // setSubjects(classToView.subjects);
        // setFee(classToView.fee);
        
    }

    

    return (
        <Container fluid>
        <Row>
        <Col xs={12} md={6}>
    {role === 'Principle' && <NavComponent />}
     {role === 'Teacher' && <TeacherNavComponent />}
    </Col>

        <Col xs={12} md={6}>
            <h2 style={{color:'orangered'}}> Listing Classes</h2>
        <div style={{color:'#993366'}}>
            {classes.map((ele) => (
    <div key={ele._id} className="list-container">
        <div className="class-info">
            {ele.name} 
        </div>
        { role === "Principle" ? (
            <div className="button-container">
            <button className="edit-btn" onClick={() => handleEdit(ele._id)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(ele._id)}>Delete</button>
            <button className="view-btn" onClick={() => handleView(ele._id)}>View</button>
        </div>
        ) : (
            <button className="view-btn" onClick={() => handleView(ele._id)}>View</button> 
        )}
        
    </div>
))}


      <Modal isOpen={viewModal} toggle={toggleViewModal}>
                <ModalHeader toggle={toggleViewModal} style={{color:'blue'}}>Class Information</ModalHeader>
                <ModalBody style={{backgroundColor:'#99CCFF'}}>
                    <p>Class Name: {name}</p>
                    <p>Teacher: {teacherId}</p>
                    <p>Number of Students: {studentCount}</p>
                </ModalBody>
                <ModalFooter></ModalFooter>
                </Modal>



            <Modal isOpen={editModal} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal} style={{color:'brown'}}>Edit Class</ModalHeader>
                <div style={{color:'blue'}}>
                <ModalBody style={{backgroundColor:'#99CCFF'}}>
                    <form onSubmit={handleSubmit}>
                        <label>Enter className</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName([e.target.value])}
                        />
                        <br />
                        <label>Enter Fee</label>
                        <input
                            type="text"
                            value={fee}
                            onChange={(e) => setFee(e.target.value)}
                        />
                        <br />
                        <label className="dropdown">Select TeacherId</label>
                        <br />
                        <select
                            value={teacherId}
                            onChange={(e) => setTeacherId(e.target.value)}
                        >
                            <option value="" disabled>Select a Teacher</option>
                            {teachers.map((teacher, i) => (
                                <option key={i} value={teacher._id}>
                                    {teacher.firstName}
                                </option>
                            ))}
                        </select>
                        <br /><br/>
                        <br />
                        <label className="dropdown">Select students</label>
                        <br />
                        <select
                            value={students}
                            onChange={(e) => setStudents([e.target.value])}
                        >
                            <option value="" disabled>Select a student</option>
                            {studentsData.map((student, i) => (
                                <option key={i} value={student._id}>
                                    {student.firstname}
                                </option>
                            ))}
                        </select>
                        <br /><br/>
                        <br />
                       
                        <label className="dropdown">Select SubjectId</label>
                        <br />
                        <select
                            value={subjects}
                            onChange={(e) => setSubjects(e.target.value)}
                        >
                            <option value="" disabled>Select a Subject</option>
                            {subjectss.map((subject, i) => (
                                <option key={i} value={subject._id}>
                                    {subject.subject}
                                </option>
                            ))}
                        </select>
                        <br /><br/>
                    </form>
                </ModalBody>
                </div>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

           
            
        </div>
        </Col>
        </Row>
        </Container>
    );
}

export default ListClass;