import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asynclistClass } from '../../action/classAction';
import { listStudentsAsync } from '../../action/studentAction';
import { Container, Row, Col } from 'react-bootstrap';
import { listSubjectsAsync } from '../../action/subjectAction';
import { marksAddingAsync } from '../../action/marksCardAction';
import TeacherNavComponent from '../teacherContainer/navigation/teachernavigation';
import axios from '../../config/axios';
import Swal from 'sweetalert2';
import  './markscard.css'
import { ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import {asynclistOneClass} from "../../action/oneClassAction"

function AddMarksCard() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [student, setStudent] = useState("")
    const [formErrors, setFormError] = useState("")
    const [selectedStudent, setSelectedStudent] = useState("")
    const [results, setResults] = useState([]);
    const errors = {}
    const classes = useSelector((state) => state.classes.data);
    const students = useSelector((state) => state.students.data);
    const subjects = useSelector((state) => state.subject.data);

    const [studentsList, setStudentsList] = useState({});

    function formValidation(){
       if(title.trim().length === 0){
        errors.title = ("title cannot be empty")
       } 
       if(selectedClass.trim().length === 0 ){
        errors.selectedClass = ("class cannot be empty")
       }
    }

    const oneClassStudent =  useSelector((state) => state.oneclassStudents.data)
    console.log(oneClassStudent)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(asynclistClass());
        dispatch(listStudentsAsync());
        dispatch(listSubjectsAsync());
    }, [dispatch]);

    useEffect(() => {
        if (selectedClass.length > 0) {
            (async () => {
                try {
                    const { data } = await axios.get(`/api/getoneclass/${selectedClass}`, {
                        headers: {
                            "Authorization": localStorage.getItem('token')
                        }
                    });
                    setStudentsList(data,"studentList");
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [selectedClass]);


    const handleStudent = (id) => {
        setResults(prevResults => [...prevResults, { studentId: id, subjects: [] }]);
    }

    const handleSubject = (studentId, subjectId) => {
        setResults(prevResults => {
            return prevResults.map(student => {
                if (student.studentId === studentId) {
                    const updatedSubjects = [...student.subjects, { subjectId: subjectId, marks: "" }];
                    return { ...student, subjects: updatedSubjects };
                }
                return student;
            });
        });
    }

    const handleClick = (id) => {
     dispatch(asynclistOneClass(id))
     }

     const handleChange = (id) => {
        const filteredStudent = students.find((student) => student._id === id);
        setSelectedStudent(filteredStudent);
    };
    

    const handleAddMarks = () => {
        formValidation();
        if (Object.keys(errors).length === 0) {
            setFormError("");
            try {
                dispatch(marksAddingAsync({
                    title,
                    class: selectedClass,
                    results
                })).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Marks Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
                
            } catch (e) {
                
            }
        } else {
            setFormError(errors);
        }
    };
    const handleMarksChange = (studentId, subjectId, value) => {
        setResults(prevResults => {
            return prevResults.map(student => {
                if (student.studentId === studentId) {
                    const updatedSubjects = student.subjects.map(subject => {
                        if (subject.subjectId === subjectId) {
                            return { ...subject, marks: value };
                        }
                        return subject;
                    });
                    return { ...student, subjects: updatedSubjects };
                }
                return student;
            });
        });
    };
console.log(results,"results")
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={2}>
                    <div>
                        <TeacherNavComponent/>
                    </div>
                </Col>
                <Col md={4} >
          <div className="addmarkscard" ></div>
                     </Col>
                <Col xs={12} md={6}>
                    <div >
                        <h2 style={{color:"red"}}>Add Marks</h2>
                        <div style={{color:"brown"}}>
                            <label >Title:</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            { formErrors.title && <span>{formErrors.title}</span>}
                        </div>
                        <div style={{color:"green"}}>
                            <label>Class:</label>
                            <select value={selectedClass} onChange={(e) => { setSelectedClass(e.target.value); handleClick(e.target.value); }}>

                                <option value="">Select Class</option>
                                {classes.map((classItem) => (
                                    <option key={classItem._id} value={classItem._id}>{classItem.name}</option>
                                ))}
                                { formErrors.selectedClass && <span>{formErrors.selectedClass}</span>}
                            </select>
                        </div>
   
                        <div>
        <label>Student:</label>
        <select value={student} onChange={(e) => {setStudent(e.target.value) ;  handleChange(e.target.value)}}>
            <option value="">Select Student</option>
            {selectedClass &&
            classes
                .find((classItem) => classItem._id === selectedClass)
                .students.map((studentItem) => (
                <option key={studentItem._id} value={studentItem._id}>
                    {studentItem.firstname}
                </option>
                ))}
        </select>
        {formErrors.selectedClass && <span>{formErrors.selectedClass}</span>}
        </div>

        <div> 
            <label style={{color:'blue'}}>Student:</label>
            <ol style={{color:'#ffc107'}}>
                {selectedStudent && (
                    <li key={selectedStudent._id}>
                        <p>{selectedStudent.firstname} - <button onClick={() => { handleStudent(selectedStudent._id) }}>+</button></p>
                        <ul>
                            {subjects.map((subject) => (
                                <li key={subject._id}>
                                    <label>{subject.subject} - <button onClick={() => { handleSubject(selectedStudent._id, subject._id) }}>+</button></label>
                                    <input
                                        type='Number'
                                        placeholder='marks'
                                        value={results?.find(item => item.studentId === selectedStudent._id)?.subjects.find(sub => sub.subjectId === subject._id)?.marks || ""}
                                        onChange={(e) => handleMarksChange(selectedStudent._id, subject._id, e.target.value)}
                                />
                                </li>
                            ))}
                            </ul>
                            </li>
                            )}
                        </ol>
                    </div>

                        <button onClick={handleAddMarks}>Add Marks</button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AddMarksCard;



