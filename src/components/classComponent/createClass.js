// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addClassesAsync } from "../../action/classAction";
// import NavComponent from "../principleContainer/navigation/principlenavigate";
// import { Row, Col, Container, UncontrolledAccordion, UncontrolledAlert } from "reactstrap";
// import { listTeacherAsync } from "../../action/teacherAction";
// import { listStudentsAsync } from "../../action/studentAction";
// import Multiselect from 'multiselect-react-dropdown';
// import { listSubjectsAsync } from "../../action/subjectAction";
// import "./createClass.css";


// function CreateClass() {
//     const [name, setName] = useState("");
//     const [teacherId, setTeacherId] = useState("");
//     const [studentsId, setStudentsId] = useState([]);
//     const [subjects, setSubjects] = useState([])
//     // const [selectedSubject, setSelectedSubject] = useState("");
//     const [fee, setFee] = useState("");
//     const [formErrors, setFormErrors] = useState({});

//     const errors = {};

//     const dispatch = useDispatch();
//     const teachers = useSelector((state) => state.teacher.data);
//     const studentsData = useSelector((state) => state.students.data);
//     const subjectss = useSelector((state) => state.subject.data);
//     const serverError = useSelector((state) => state.classes.serverError)
   

//     useEffect(() => {
//         dispatch(listTeacherAsync());
//         dispatch(listStudentsAsync());
//         dispatch(listSubjectsAsync());
//     }, [dispatch]);

//     function runValidations() {
//         if (name.trim().length === 0) {
//             errors.name = "ClassName is required";
//         }
//         if (fee.trim().length === 0) {
//             errors.fee = "Fee is required";
//         }
//         if (subjects.length === 0) {
//             errors.subjects = "Subject cannot be Empty"
//         }

//         setFormErrors(errors);
//         return errors;
//     }


    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         runValidations();

//         if (Object.keys(errors).length === 0) {
//             setFormErrors("")
//             const formData = {
//                 name,
//                 // teacherId,
//                 students: studentsId,
//                 subjects,
//                 fee,
//             };
//             console.log(formData)
//             dispatch(addClassesAsync(formData));
//         } else{
//             setFormErrors(errors)
//         }
//     };

//     return (
//         <Container fluid>
//         { serverError.length > 0 && <UncontrolledAlert color="danger">{serverError}</UncontrolledAlert>}
//             <Row>
//                 <Col xs={12} md={2}>
//                     <div>
//                         <NavComponent />
//                     </div>
//                 </Col>
//                 <Col xs={12} md={5}>
//                     <div className="addclassimage"></div>
//                 </Col>
//                 <Col xs={12} md={5}>
//                     <div style={{color:'black'}}>
//                         <h2 style={{color:'blue'}}>Add classes</h2>
//                         <form onSubmit={handleSubmit}>
//                             <label>Enter className</label>
//                             <input
//                                 type="text"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                             />
//                            { formErrors.name && <span style={{color: "red"}}>{formErrors.name}</span>}
                        
//                             <br />
//                             <label>Enter Fee</label>
//                             <input
//                                 type="text"
//                                 value={fee}
//                                 onChange={(e) => setFee(e.target.value)}
//                             />
//                             {formErrors.fee && <span  style={{color: "red"}}>{formErrors.fee}</span>}
//                             <br />
//                             <label className="dropdown">Select TeacherId</label>
//                             <br />
//                             <select
//                                 value={teacherId}
//                                 onChange={(e) => setTeacherId(e.target.value)}
//                             >
//                                 <option value="" disabled>Select a Teacher</option>
//                                 {teachers.map((teacher, i) => (
//                                     <option key={i} value={teacher._id}>
//                                        {teacher.firstName}
//                                     </option>
//                                 ))}
//                             </select>
//                             {formErrors.teacherId && <span>{formErrors.teacherId}</span>}
//                             <br /><br/>
//                             <br />
//                             <label className="dropdown">Select a Student</label>
//                             <br />

                            
//                  <Multiselect
//               options={studentsData.map(ele => ({ key: ele.firstname, cat: ele._id }))}
//                displayValue="key"
//               onSelect={(selectedItems) => setStudentsId(selectedItems.map(item => item.cat))}
//                onRemove={(selectedItems) => setStudentsId(selectedItems.map(item => item.cat))}
//                />
//                             {formErrors.student && <span>{formErrors.student}</span>}
//                             <br /><br/>
//                             <br />

//                             <label className="dropdown">Select a Subject</label>
//                             <br />
                            
//                             <Multiselect
//               options={subjectss.map(ele => ({ key: ele.subject, cat: ele._id }))}
//                displayValue="key"
//               onSelect={(selectedItems) => setSubjects(selectedItems.map(item => item.cat))}
//                onRemove={(selectedItems) => setSubjects(selectedItems.map(item => item.cat))}
//                />
//                             {formErrors.subjects && <span style={{color : "red"}}>{formErrors.subjects}</span>}
//                             <br /><br/>
//                             <button type="submit" className="btn btn-primary">
//                                 Submit
//                             </button>
//                         </form>
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default CreateClass;





import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClassesAsync } from "../../action/classAction";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import { Row, Col, Container, UncontrolledAccordion, UncontrolledAlert } from "reactstrap";
import { listTeacherAsync } from "../../action/teacherAction";
import { listStudentsAsync } from "../../action/studentAction";
import Multiselect from 'multiselect-react-dropdown';
import { listSubjectsAsync } from "../../action/subjectAction";
import swal from 'sweetalert'; // Import SweetAlert
import "./createClass.css";

function CreateClass() {
    const [name, setName] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [studentsId, setStudentsId] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [fee, setFee] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const errors = {};
    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.teacher.data);
    const studentsData = useSelector((state) => state.students.data);
    const subjectss = useSelector((state) => state.subject.data);
    const serverError = useSelector((state) => state.classes.serverError);

    useEffect(() => {
        dispatch(listTeacherAsync());
        dispatch(listStudentsAsync());
        dispatch(listSubjectsAsync());
    }, [dispatch]);

    function runValidations() {
        if (name.trim().length === 0) {
            errors.name = "ClassName is required";
        }
        if (fee.trim().length === 0) {
            errors.fee = "Fee is required";
        }
        if (subjects.length === 0) {
            errors.subjects = "Subject cannot be Empty"
        }

        setFormErrors(errors);
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        runValidations();

        if (Object.keys(errors).length === 0) {
            const formData = {
                name,
                students: studentsId,
                subjects,
                fee,
            };

            dispatch(addClassesAsync(formData))
                .then(() => {
                    swal("Success!", "Class added successfully!", "success");
                    setName("");
                    setTeacherId("");
                    setStudentsId([]);
                    setSubjects([]);
                    setFee("");
                })
                .catch(error => console.error('Error while adding class:', error));
        } else {
            setFormErrors(errors)
        }
    };

    return (
        <Container fluid>
            { serverError.length > 0 && <UncontrolledAlert color="danger">{serverError}</UncontrolledAlert>}
            <Row>
                <Col xs={12} md={2}>
                    <div>
                        <NavComponent />
                    </div>
                </Col>
                <Col xs={12} md={5}>
                    <div className="addclassimage"></div>
                </Col>
                <Col xs={12} md={5}>
                    <div style={{ color: 'black' }}>
                        <h2 style={{ color: 'blue' }}>Add classes</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Enter className</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {formErrors.name && <span style={{ color: "red" }}>{formErrors.name}</span>}

                            <br />
                            <label>Enter Fee</label>
                            <input
                                type="text"
                                value={fee}
                                onChange={(e) => setFee(e.target.value)}
                            />
                            {formErrors.fee && <span style={{ color: "red" }}>{formErrors.fee}</span>}
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
                            {formErrors.teacherId && <span>{formErrors.teacherId}</span>}
                            <br /><br/>
                            <br />
                            <label className="dropdown">Select a Student</label>
                            <br />

                            <Multiselect
                                options={studentsData.map(ele => ({ key: ele.firstname, cat: ele._id }))}
                                displayValue="key"
                                onSelect={(selectedItems) => setStudentsId(selectedItems.map(item => item.cat))}
                                onRemove={(selectedItems) => setStudentsId(selectedItems.map(item => item.cat))}
                            />
                            {formErrors.student && <span>{formErrors.student}</span>}
                            <br /><br/>
                            <br />

                            <label className="dropdown">Select a Subject</label>
                            <br />

                            <Multiselect
                                options={subjectss.map(ele => ({ key: ele.subject, cat: ele._id }))}
                                displayValue="key"
                                onSelect={(selectedItems) => setSubjects(selectedItems.map(item => item.cat))}
                                onRemove={(selectedItems) => setSubjects(selectedItems.map(item => item.cat))}
                            />
                            {formErrors.subjects && <span style={{ color: "red" }}>{formErrors.subjects}</span>}
                            <br /><br/>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateClass;
