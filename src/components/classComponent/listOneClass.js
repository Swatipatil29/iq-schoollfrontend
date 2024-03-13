import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asynclistOneClass } from "../../action/oneClassAction";
import {Row, Col} from "reactstrap"
import NavComponent from "../principleContainer/navigation/principlenavigate";
import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";
import { jwtDecode } from "jwt-decode";

export default function ListOneClass() {
  const { classid } = useParams();
  const dispatch = useDispatch();
  const oneClass = useSelector((state) => state.oneclassStudents.data);
  console.log(oneClass)
  const [showStudents, setShowStudents] = useState(true);
  const [showClass, setShowClass] = useState(true)

   const token = localStorage.getItem("token")
   const {role} = jwtDecode(token)
   console.log(role)
  useEffect(() => {
    dispatch(asynclistOneClass(classid)); 
  }, [classid, dispatch]); // Dispatch when classid changes or on component mount

  const handleClick = () => {
    setShowStudents(!showStudents); // Set showStudents to true when the button is clicked
  };

  const handleShow = () => {
    setShowClass(!showClass)
  }

  return (
    <div container-fluid>
    <Row>
    <Col xs={12} md={6}>
    {role === 'Principle' && <NavComponent />}
     {role === 'Teacher' && <TeacherNavComponent />}
    </Col>
    
    <Col xs={12} md={6}>
      <h2>Class name - {oneClass.name}</h2> <br/>
      <h3>Fees- {oneClass.fee}</h3><br/>
      <h3>Total Students - {oneClass.students ? oneClass.students.length : 0} -
      <button onClick={handleClick}>Students</button></h3>
      {showStudents && (
        <ul>
          {oneClass?.students?.map((student) => (
            <li key={student._id}>{student.firstname}</li>
          ))}
        </ul>
      )}

      <h3>Total Subject- {oneClass.subjects ? oneClass.subjects.length : 0} -
      <button onClick={handleShow}>
        Subject
      </button></h3>

      {showClass && (
        <ul>
          {oneClass?.subjects?.map((subject) => (
            <li key={subject._id}>{subject.subject}</li>
          ))}
        </ul>
      )}
      </Col>
      </Row>
    </div>
  );
}
