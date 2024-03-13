import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { asynclistClass } from "../../action/classAction";
import { asynclistOneClass } from "../../action/oneClassAction";
import { listOneStudentMarksAsync } from "../../action/marksCardAction";
import { asyncUpdateMarks, asyncDeleteMarks} from "../../action/marksCardAction";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";
import { Col, Row } from "react-bootstrap";

function ListMarksCard() {
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [isEditMarks, setIsEditMarks] = useState(false);
    const [studentMarks, setStudentMarks] = useState([]);
    const [editedMarks, setEditedMarks] = useState({});
    const [classId, setClassId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [currentStudentId, setCurrentStudentId] = useState(null);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        dispatch(asynclistClass());
    }, [dispatch]);

    useEffect(() => {
        if (classId) {
            dispatch(asynclistOneClass(classId));
        } 
    }, [classId, dispatch]);

    useEffect(() => {
        if (classId && currentStudentId) {
            dispatch(listOneStudentMarksAsync(classId, currentStudentId));
        }
    }, [classId, currentStudentId, dispatch]);

    const handleClick = (classId) => {
        setClassId(classId);
        // setCurrentStudentId(null);
        setIsEditMarks(false);
        dispatch(serverError)
    };

    const handleView = (classId, studentId) => {
        setClassId(classId);
        setCurrentStudentId(studentId);
        setModal(true);
        setIsEditMarks(false);
    };

    const handleEditToggle = () => {
        setIsEditMarks(!isEditMarks);
    };

    const handleAddMarks = (id) => {
        // const student = markscard?.result?.subjects.find(ele => ele.subjectId._id == id);
        console.log(id, "mine")
         const student = markscard.studentMarks?.subjects.find((ele => ele.subjectId._id == id))
         console.log(student, "student")
        if (student) {
            setStudentMarks([...studentMarks, { _id: student._id, marks: student.marks }]);
            {console.log(studentMarks, "dgss")}
        }
    };

    const handleEditMarks = (e, id) => {
        const updatedMarks = { ...editedMarks, [id]: Number(e.target.value) }; 
        setEditedMarks(updatedMarks);
    };

    const handleSave = () => {
        {console.log(studentMarks, "dg")}
        const updatedMarksData = studentMarks.map(mark => ({
            _id: mark._id,
            marks: editedMarks[mark._id] !== undefined ? editedMarks[mark._id] : mark.marks
        }));

        console.log(updatedMarksData, "incomp")
        dispatch(asyncUpdateMarks(markscard.marksCardId, currentStudentId, updatedMarksData))
        
        setModal(false);
    };

    const handleDelete = () => {
         const input  = window.confirm("are you sure")
         if(input){
            console.log(markscard.marksCardId)
            
          dispatch(asyncDeleteMarks(markscard.marksCardId))
         }
    };

    const classes = useSelector((state) => state.classes.data);
    const students = useSelector((state) => state.oneclassStudents.data);
    const markscard = useSelector((state) => state.marksCard.studentMarksCard);
    // const serverError = useSelector((state) => state.marksCard.serverError)
    const serverError = useSelector((state) => state.marksCard.serverError);
    


    if (!markscard) {
        return null; // Render nothing if markscard is not initialized yet
    }

    return (
        <div>
        <Row>
        <Col md = {6}>
        <TeacherNavComponent/>
        </Col>

        <Col md = {6}>
        <b style={{color:"red"}}>{serverError}</b>
            {classes.map((ele) => (
                <div key={ele._id} className="list-container">
                    <div className="class-info">
                        {ele.name} - {ele.sectionname}
                        <button onClick={() => {
                            setClassId(ele._id);
                            handleClick(ele._id);
                        }}>Click</button>
                    </div>
                </div>
            ))}

            {students &&  (
                <ul>
                    {students?.students?.map((student) => (
                        <li key={student._id}>
                            {student.rollnumber}-{student.firstname}
                            <button onClick={() => handleView(classId, student._id)}>View MarksCard</button>{"  "}
                        </li>
                    ))}
                </ul>
            )}

            {markscard && markscard.studentMarks && markscard.studentMarks.subjects && (
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <ol>
                            {markscard.studentMarks.subjects.map(result => (
                                <div key={result._id}>
                                    <ul>
                                        <li>
                                            <h4>{result.subjectId.subject}</h4>
                                            {!isEditMarks ? (
                                                <>
                                                    <p>Marks - {result.marks}</p>
                                                    <span>
                                                        <button onClick={() => {
                                                            setSubjectId(result.subjectId._id);
                                                            handleAddMarks(result.subjectId._id);
                                                            handleEditToggle(result);
                                                        }}>Edit</button>
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <input 
                                                        type="number"
                                                        value={editedMarks[result._id] !== undefined ? editedMarks[result._id] : result.marks}
                                                        onChange={(e) => handleEditMarks(e, result._id)}
                                                    />
                                                    <button onClick={handleEditToggle}>Cancel</button>
                                                </>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </ol>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </ModalFooter>
                </Modal>
            )}

            <button onClick={handleDelete}>Delete</button>
            </Col>
            </Row>
        </div>
    );
}

export default ListMarksCard;


