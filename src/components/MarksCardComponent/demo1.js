
// correct code just i put hereee!
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asynclistClass } from '../../action/classAction';
import { listStudentsAsync } from '../../action/studentAction';
import { Container, Row, Col } from 'react-bootstrap';
import { listSubjectsAsync } from '../../action/subjectAction';
import { marksAddingAsync } from '../../action/marksCardAction';
import NavComponent from '../../navigation/navigate';
import axios from '../../config/axios';

function AddMarksCard() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [results, setResults] = useState([]);

    const classes = useSelector((state) => state.classes.data);
    const students = useSelector((state) => state.students.data);
    const subjects = useSelector((state) => state.subject.data);

    const [studentsList, setStudentsList] = useState({});

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
    const handleAddMarks = () => {
                // console.log(results)
                 dispatch(marksAddingAsync({
                    title,
                    class: selectedClass,
                    results
                 }));
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
                <Col xs={12} md={4}>
                    <div>
                        <NavComponent/>
                    </div>
                </Col>
                <Col xs={12} md={8}>
                    <div>
                        <h2>Add Marks</h2>
                        <div>
                            <label>Title:</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <label>Class:</label>
                            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                                <option value="">Select Class</option>
                                {classes.map((classItem) => (
                                    <option key={classItem._id} value={classItem._id}>{classItem.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Student:</label>
                            <ol>
                                {studentsList?.students?.map((student) => (
                                    <li key={student._id}>
                                        <p>{student.firstname} - <button onClick={() => { handleStudent(student._id) }}>+</button></p>
                                        <ul>
                                            {subjects.map((subject) => (
                                                <li key={subject._id}>
                                                    <label>{subject.subject} - <button onClick={() => { handleSubject(student._id, subject._id) }}>+</button></label>
                                                    <input
                                                        type='Number'
                                                        placeholder='marks'
                                                        value={results.find(item => item.studentId === student._id)?.subjects.find(sub => sub.subjectId === subject._id)?.marks || ""}
                                                        onChange={(e) => handleMarksChange(student._id, subject._id, e.target.value)}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
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











