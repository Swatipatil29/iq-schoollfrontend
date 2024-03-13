import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTeacherAsync, deleteTeacherAsync, addTeacherAsync, updateTeacherAsync } from "../../action/teacherAction";
import { Button, Form, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import "./listTeacher.css";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import { listSubjectsAsync } from "../../action/subjectAction";

function ListTeacher() {
    const dispatch = useDispatch();
    const teacherList = useSelector((state) => state.teacher.data);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        firstName: "",
        lastName: "",
        mobile: "",
        gender: "",
        editId: "",
        subjects: "",
    });

    const [editModal, setEditModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    useEffect(() => {
        dispatch(listTeacherAsync());
        dispatch(listSubjectsAsync());
    }, [dispatch]);

    const edittoggleModal = () => {
        setEditModal(!editModal);
    };

    const showtoggleModal = () => {
        setShowModal(!showModal);
    };

    const subject = useSelector((state) => {
        return state.subject.data;
    });

    const teachers = useSelector((state) => {
        return state.teacher.data;
    });

    const formValidation = () => {
        const errors = {};

        if (formData.title.trim().length === 0) {
            errors.title = "Title cannot be empty";
        }
        if (formData.firstName.trim().length === 0) {
            errors.firstName = "First Name cannot be empty";
        }
        if (formData.lastName.trim().length === 0) {
            errors.lastName = "Last Name cannot be empty";
        }
        if (formData.email.trim().length === 0) {
            errors.email = "Email cannot be empty";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure?');
        if (confirm) {
            await dispatch(deleteTeacherAsync(id));
            dispatch(listTeacherAsync());
        }
    };

    const handleShow = (teacherId) => {
        const selectedTeacher = teacherList.find((teacher) => teacher._id === teacherId);
        setSelectedTeacher(selectedTeacher);
        showtoggleModal();
    };

    const handleUpdate = async (teacherId) => {
        const selectedTeacher = teacherList.find((teacher) => teacher._id === teacherId);
        setFormData({
            title: selectedTeacher.title,
            firstName: selectedTeacher.firstName,
            email: selectedTeacher.email,
            lastName: selectedTeacher.lastName,
            mobile: selectedTeacher.mobile,
            gender: selectedTeacher.gender,
            editId: selectedTeacher._id,
            subjects: selectedTeacher.subjects,
        });
        edittoggleModal();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = formValidation();

        if (isFormValid) {
            if (formData.editId) {
                dispatch(updateTeacherAsync(formData.editId, formData));
            } else {
                dispatch(addTeacherAsync(formData));
            }
            setFormData({
                title: "",
                firstName: "",
                lastName: "",
                mobile: "",
                gender: "",
                editId: null,
                subjects: "",
            });
            edittoggleModal();
            dispatch(listTeacherAsync());
        }
    };

    return (
        <div container fluid>
            <Row>
                <Col xs={12} md={6}>
                    <NavComponent />
                </Col>

                <Col xs={12} md={6}>
                    <div>
                        <h2 style={{ color: 'blueviolet' }}>Listing Teachers</h2>
                        <ul style={{ color: '#666600' }}>
                            {teacherList.map((teacher) => (
                                <li key={teacher._id} className="teacher-list-item">
                                    {teacher.title} - {teacher.firstName} - {teacher.lastName}
                                    <div className="button-container">
                                        <button onClick={() => handleShow(teacher._id)}>Show</button>
                                        <button className="edit-button" onClick={() => handleUpdate(teacher._id)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(teacher._id)}>Delete Teacher</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>

                <Modal isOpen={editModal} toggle={edittoggleModal}>
                    <ModalHeader toggle={edittoggleModal}>Edit Teacher</ModalHeader>
                    <div style={{ color: '#660066' }}>
                        <ModalBody style={{ backgroundColor: "#FFFFCC" }}>
                            <Form onSubmit={handleSubmit}>
                                <label htmlFor="title" className="form-label">Enter title</label> <br />
                                <Input type="text" id="title" value={formData.title} onChange={handleChange} />
                                {formErrors.title && <span>{formErrors.title}</span>}
                                <br />
                                <label htmlFor="firstName" className="form-label">Enter First Name</label><br />
                                <Input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
                                {formErrors.firstName && <span>{formErrors.firstName}</span>}
                                <br />
                                <label htmlFor="lastName" className="form-label">Enter Last Name</label><br />
                                <Input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />
                                {formErrors.lastName && <span>{formErrors.lastName}</span>}
                                <br />
                                <label htmlFor="email" className="form-label">Enter Email</label><br />
                                <Input type="text" id="email" value={formData.email} onChange={handleChange} />
                                {formErrors.email && <span>{formErrors.email}</span>}
                                <label htmlFor="mobile" className="form-label">Enter Mobile Number</label><br />
                                <Input type="number" id="mobile" value={formData.mobile} onChange={handleChange} />
                                {formErrors.mobile && <span>{formErrors.mobile}</span>}
                                <br />
                                <select value={formData.subjects} id="subjects" onChange={handleChange}>
                                    <option value="">Select Class</option>
                                    {
                                        subject.map((ele, i) => {
                                            return <option key={i} value={ele._id}>{ele.subject}</option>;
                                        })
                                    }
                                </select>
                                <label htmlFor="gender" className="form-label">Select Gender</label><br />
                                <Input type="select" id="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Input>
                           
                                <br /><br />
                                <Button type="submit" color="primary">Submit</Button>
                                <Button color="danger" onClick={edittoggleModal}>Cancel</Button>
                            </Form>
                        </ModalBody>
                    </div>
                </Modal>

                {/* Show modal */}

                <Modal isOpen={showModal} toggle={showtoggleModal}>
                    <ModalHeader toggle={showtoggleModal}>Teacher details</ModalHeader>
                    <ModalBody style={{ backgroundColor: "#FFFFCC" }}>
                        {selectedTeacher && (
                            <div>
                            {selectedTeacher.profilePic ? (
    <div>
        <img
            src={`http://localhost:3050/images/${selectedTeacher.profilePic}`}
            alt="Profile Pic"
            style={{ width: "100px", height: "auto" }}
        />
    </div>
) : (
    <div>
        <img
            src={process.env.PUBLIC_URL + "/images/dumyimage.jpg"}
            alt="Dummy Image"
            style={{ width: "60px", height: "auto" }}
        />
    </div>
)} <br></br>


                            {console.log(selectedTeacher, "teacher")}
                                <p>Title: {selectedTeacher.title}</p>
                                <p>Class : {selectedTeacher.classId.map((ele) => ele.name)}</p>
                                <p>First Name: {selectedTeacher.firstName}</p>
                                <p>Last Name: {selectedTeacher.lastName}</p>
                                <p>Email: {selectedTeacher.email}</p>
                                <p>Mobile: {selectedTeacher.mobile}</p>
                                <p>Gender: {selectedTeacher.gender}</p>
                            </div>
                        )}
                    </ModalBody>
                </Modal>
            </Row>
        </div>
    );
}

export default ListTeacher;
