// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { listSubjectsAsync, deleteSubjectAsync, updateSubjectsAsync } from "../../action/subjectAction";
// import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Row, Col } from "reactstrap";
// import { jwtDecode } from "jwt-decode";
// import NavComponent from "../principleContainer/navigation/principlenavigate";
// import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";
// import "./listSubjects.css";

// function ListSubjects() {
//     const [subjectName, setSubjectName] = useState("");
//     const [editId, setEditId] = useState(null);
//     const [modal, setModal] = useState(false);
//     const [formErrors, setFormErrors] = useState({});
//     const [searchQuery, setSearchQuery] = useState("");
//     const [sortOrder, setSortOrder] = useState("asc"); 

//     const errors = {};

//     const token = localStorage.getItem("token");
//     const { role } = jwtDecode(token);

//     function runValidations() {
//         if (subjectName.trim().length === 0) {
//             errors.subjectName = "Subject name is required";
//         }
//     }

//     const toggleModal = () => {
//         setModal(!modal);
//     };

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(listSubjectsAsync());
//     }, [dispatch]);

//     const subjects = useSelector((state) => state.subject.data);

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this subject?');
//         if (confirmDelete) {
//             await dispatch(deleteSubjectAsync(id));
//             dispatch(listSubjectsAsync());
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         runValidations();

//         if (Object.keys(errors).length === 0) {
//             setFormErrors({});

//             const formData = {
//                 subject: subjectName
//             };
//             dispatch(updateSubjectsAsync(formData, editId));

//             setSubjectName("");
//             setEditId(null);
//             toggleModal();
//         } else {
//             setFormErrors(errors);
//         }
//     };

//     const handleEdit = (subjectId, subjectName) => {
//         setEditId(subjectId);
//         setSubjectName(subjectName);
//         toggleModal();
//     };

//     const handleCancelEdit = () => {
//         setSubjectName("");
//         setEditId(null);
//         toggleModal();
//     };

//     const handleSearchInputChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const handleSortOrderChange = (e) => {
//         setSortOrder(e.target.value);
//     };

//     const sortedSubjects = [...subjects].sort((a, b) => {
//         if (sortOrder === "asc") {
//             return a.subject.localeCompare(b.subject);
//         } else {
//             return b.subject.localeCompare(a.subject);
//         }
//     });

//     const filteredSubjects = sortedSubjects.filter((subject) =>
//         subject.subject.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div>
//             <h2 style={{ marginLeft: "300px" }}>List subjects</h2>
//             <Row>
//                 <Col xs={12} md={6}>
//                     {role === "Principle" && <NavComponent />}
//                     {role === "Teacher" && <TeacherNavComponent />}
//                 </Col>

//                 <Col xs={12} md={6}>
//                     <Input
//                         type="text"
//                         value={searchQuery}
//                         onChange={handleSearchInputChange}
//                         placeholder="Search by subject name"
//                     />
//                     <Form>
//             <h2 style={{color:'goldenrod'}}>Showing subjects</h2>
//             <ul style={{color:'green'}}>
//             {subjects.map((subject) => (
//     <li key={subject._id} className="subject-list-item">
//         <div className="subject-info">
//             {subject.subject}
//             {formErrors.subjectName && <span className="error-message">{formErrors.subjectName}</span>}
//         </div>
//         <div className="button-container">
//             <button className="edit-button" onClick={() => handleEdit(subject._id, subject.subject)}>Edit</button>
//             <button className="delete-button" onClick={() => handleDelete(subject._id)}>Delete</button>
//         </div>
//     </li>
// ))}

//             </ul>
//             <Modal isOpen={modal} toggle={toggleModal}>
//                 <ModalHeader toggle={toggleModal } style={{color:'greenyellow'}}>Edit Subject</ModalHeader>
//                 <ModalBody style={{backgroundColor:'#99CCFF'}}>
//                     <Form onSubmit={handleSubmit}>
//                         <FormGroup>
//                             <Label for="sortOrder">Sort Order:</Label>
//                             <Input type="select" name="sortOrder" id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
//                                 <option value="asc">A-Z</option>
//                                 <option value="desc">Z-A</option>
//                             </Input>
//                         </FormGroup>
//                     </Form>
//                     <ul>
//                         {filteredSubjects.map((subject) => (
//                             <li key={subject._id} className="subject-list-item">
//                                 <div className="subject-info">
//                                     {subject.subject}
//                                     {formErrors.subjectName && <span className="error-message">{formErrors.subjectName}</span>}
//                                 </div>
//                                 { role === "Principle" &&  (
//                                     <div className="button-container">
//                                     <button className="edit-button" onClick={() => handleEdit(subject._id, subject.subject)}>Edit</button>
//                                     <button className="delete-button" onClick={() => handleDelete(subject._id)}>Delete</button>
//                                 </div>
//                                 )}
                               
//                             </li>
//                         ))}
//                     </ul>
//                     <Modal isOpen={modal} toggle={toggleModal}>
//                         <ModalHeader toggle={toggleModal}>Edit Subject</ModalHeader>
//                         <ModalBody>
//                             <Form onSubmit={handleSubmit}>
//                                 <FormGroup>
//                                     <Label for="subjectName">Subject Name:</Label>
//                                     <Input
//                                         type="text"
//                                         id="subjectName"
//                                         value={subjectName}
//                                         onChange={(e) => setSubjectName(e.target.value)}
//                                     />
//                                 </FormGroup>
//                             </Form>
//                         </ModalBody>
//                         <ModalFooter>
//                             <Button color="primary" onClick={handleSubmit}>Submit</Button>
//                             <Button color="danger" onClick={handleCancelEdit}>Cancel</Button>
//                         </ModalFooter>
//                     </Modal>
//                 </Col>
//             </Row>
//         </div>
//     );
// }

// export default ListSubjects;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSubjectsAsync, deleteSubjectAsync, updateSubjectsAsync } from "../../action/subjectAction";
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Row, Col } from "reactstrap";
import { jwtDecode } from "jwt-decode";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";
import "./listSubjects.css";

function ListSubjects() {
    const [subjectName, setSubjectName] = useState("");
    const [editId, setEditId] = useState(null);
    const [modal, setModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); 

    const token = localStorage.getItem("token");
    const { role } = jwtDecode(token);

    function runValidations() {
        const errors = {};
        if (subjectName.trim().length === 0) {
            errors.subjectName = "Subject name is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listSubjectsAsync());
    }, [dispatch]);

    const subjects = useSelector((state) => state.subject.data);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this subject?');
        if (confirmDelete) {
            await dispatch(deleteSubjectAsync(id));
            dispatch(listSubjectsAsync());
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (runValidations()) {
            const formData = {
                subject: subjectName
            };
            if(editId){
            dispatch(updateSubjectsAsync(formData, editId));
            }

            setSubjectName("");
            setEditId(null);
            toggleModal();
        }
    };

    const handleEdit = (subjectId, subjectName) => {
        toggleModal();
        setEditId(subjectId);
        setSubjectName(subjectName);
        
    };

    const handleCancelEdit = () => {
        setSubjectName("");
        setEditId(null);
        toggleModal();
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortedSubjects = [...subjects].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.subject.localeCompare(b.subject);
        } else {
            return b.subject.localeCompare(a.subject);
        }
    });

    const filteredSubjects = sortedSubjects.filter((subject) =>
        subject.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            
            <Row>
                <Col xs={12} md={6}>
                    {role === "Principle" && <NavComponent />}
                    {role === "Teacher" && <TeacherNavComponent />}
                </Col>

                <Col xs={12} md={6}>
                <h2 style={{ marginLeft: "100px" }}>List subjects</h2>
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        placeholder="Search by subject name"
                    />
                    <Form>
                        <ul style={{color:'green'}}>
                            {filteredSubjects.map((subject) => (
                                <li key={subject._id} className="subject-list-item">
                                    <div className="subject-info">
                                        {subject.subject}
                                        {formErrors.subjectName && <span className="error-message">{formErrors.subjectName}</span>}
                                    </div>
                                    { role === "Principle" && (
                                        <div className="button-container">
                                        <button type="button" className="edit-button" onClick={() => handleEdit(subject._id, subject.subject)}>Edit</button>
                                            <button className="delete-button" onClick={() => handleDelete(subject._id)}>Delete</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </Form>
                </Col>
            </Row>
            {/* <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal } style={{color:'greenyellow'}}>Edit Subject</ModalHeader>
                <ModalBody style={{backgroundColor:'#99CCFF'}}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="subjectName">Subject Name:</Label>
                            <Input
                                type="text"
                                id="subjectName"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                            />
                            {formErrors.subjectName && <span className="error-message">{formErrors.subjectName}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="sortOrder">Sort Order:</Label>
                            <Input type="select" name="sortOrder" id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Submit</Button>
                    <Button color="danger" onClick={handleCancelEdit}>Cancel</Button>
                </ModalFooter>
            </Modal> */}

            <Modal isOpen={modal} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal} style={{ color: "greenyellow" }}>Edit Subject</ModalHeader>
    <ModalBody style={{ backgroundColor: '#99CCFF' }}>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="subjectName">Subject Name:</Label>
                <Input
                    type="text"
                    id="subjectName"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                />
                {formErrors.subjectName && <span className="error-message">{formErrors.subjectName}</span>}
            </FormGroup>
            
        </Form>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={handleSubmit} type="button">Submit</Button>
        <Button color="danger" onClick={handleCancelEdit} type="button">Cancel</Button>
    </ModalFooter>
</Modal>

        </div>
    );
}

export default ListSubjects;