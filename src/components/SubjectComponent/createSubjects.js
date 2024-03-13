// import React, { useState } from "react";
// import { useDispatch, useSelector} from "react-redux";
// import { addSubjectsAsync } from "../../action/subjectAction";
// import NavComponent from "../principleContainer/navigation/principlenavigate";
// import { Container, Row, Col, Label, Input, Button } from "reactstrap";
// import "./createSubject.css" 


// function CreateSubjects() {
//     const [subjectName, setSubjectName] = useState("");
//     const [formErrors,setFormErrors] = useState({})
//     const dispatch = useDispatch();

//     const errors={}

    

//     function  runValidations(){
//         if(subjectName.trim().length===0){
//             errors.subjectName = "subjectName is required"
//         }
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         runValidations()

//         if(Object.keys(errors).length===0){
//             setFormErrors({})
//             const newSubject = {
//                 subject: subjectName
//             };
//             dispatch(addSubjectsAsync(newSubject));
//             // Clear input field after submission
//             setSubjectName("");
//         }
//         else{
//             setFormErrors(errors)
//         }
//     };

    

//     return (
//         <div>
//             <Container fluid>
//                 <Row>
//                     <Col xs={12} md={2}>
//                         <div>
//                             <NavComponent />
//                         </div>
//                     </Col>
//                     <Col md={6} >
//           <div className="addsubjectimage" ></div>
//                      </Col>
//                     <Col xs={12} md={4}>
//                     <div style={{color:'green'}}>
//                             <h1 style={{color:'red'}}>Adding Subjects</h1>
//                             <div className="input-container">
//                                 <Label for="subjectName">Subject Name</Label>
//                                 <Input type="text" name="subjectName" id="subjectName" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
//                                 {formErrors.subjectName && <span className="error-message">{formErrors.subjectName}</span>}
//                             </div>

                            

//                             <Button color="primary" className="submit-button" onClick={handleSubmit}>Submit</Button>
//                         </div>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default CreateSubjects;



import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSubjectsAsync } from "../../action/subjectAction";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import { Container, Row, Col, Label, Input, Button } from "reactstrap";
import swal from 'sweetalert'; // Import SweetAlert
import "./createSubject.css" 

function CreateSubjects() {
    const [subjectName, setSubjectName] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();

    const errors = {};

    function runValidations() {
        if (subjectName.trim().length === 0) {
            errors.subjectName = "Subject Name is required";
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        runValidations();

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            const newSubject = {
                subject: subjectName
            };

            dispatch(addSubjectsAsync(newSubject))
                .then(() => {
                    swal("Success!", "Subject added successfully!", "success");
                    // Clear input field after submission
                    setSubjectName("");
                })
                .catch(error => console.error('Error while adding subject:', error));
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={12} md={2}>
                        <div>
                            <NavComponent />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="addsubjectimage"></div>
                    </Col>
                    <Col xs={12} md={4}>
                        <div style={{ color: 'green' }}>
                            <h1 style={{ color: 'red' }}>Adding Subjects</h1>
                            <div className="input-container">
                                <Label for="subjectName">Subject Name</Label>
                                <Input type="text" name="subjectName" id="subjectName" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
                                {formErrors.subjectName && <span className="error-message">{formErrors.subjectName}</span>}
                            </div>
                            <Button color="primary" className="submit-button" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateSubjects;
