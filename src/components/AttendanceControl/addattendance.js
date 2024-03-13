import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { asynclistClass } from "../../action/classAction";
import { listTeacherAsync } from "../../action/teacherAction";
import { asynclistOneClass } from "../../action/oneClassAction";
import { syncAddAttendance } from "../../action/attendanceAction";
import { useNavigate } from "react-router-dom";
import { Container, UncontrolledAlert } from "reactstrap";
import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";
import { Row, Col } from "reactstrap";
import { listStudentsAsync } from "../../action/studentAction";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function Addattendance() {
  const [teacherId, setTeacherId] = useState('');
  const [classId, setClassId] = useState('');
  const [formErrors, setFormErrors] = useState("");
  const [attendanceDate, setAttendanceDate] = useState('');
  const [checkedStudents, setCheckedStudents] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = {};

  useEffect(() => {
    const token = localStorage.getItem("token")
    const { teacher } = jwtDecode(token)
    console.log(teacher,"Tid")
    setTeacherId(teacher)
  }, [])
 

  function formValidation() {
    if (classId.trim().length === 0) {
      error.classId = "Class ID cannot be empty";
    }
    if (attendanceDate.trim().length === 0) {
      error.attendanceDate = "Attendance Date cannot be empty";
    }
  }

  useEffect(() => {
    dispatch(asynclistClass());
    dispatch(listTeacherAsync());
    dispatch(listStudentsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(asynclistOneClass(classId));
  }, [attendanceDate, dispatch]);

 

  const student = useSelector((state) => state.oneclassStudents.data);
  const serverError = useSelector((state) => state.attendance.serverError);
  const classes = useSelector((state) => state.classes.data);
  console.log(classes, "class")
  const teacher = useSelector((state) => state.teacher.data);

  useEffect(() => {
    if (student && student.students) {
      const initialChecked = {};
      student.students.forEach((element) => {
        initialChecked[element._id] = true;
      });
      setCheckedStudents(initialChecked);
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formValidation();
    try {
      if (Object.keys(error).length === 0) {
        setFormErrors("");
        const attendanceData = {
          teacherId,
          classId,
          attendanceDate,
          students: student.students.map((ele) => ({
            studentId: ele._id,
            status: checkedStudents[ele._id] ? "Present" : "Absent",
          })),
        };
        console.log(attendanceData, "addattendance");
        dispatch(syncAddAttendance(attendanceData, "attend"));
        
      } else {
        setFormErrors(error);
      }
    } catch (e) {
      dispatch(syncAddAttendance(e));
    }
  };

  const handleCheck = (e, id) => {
    const newCheckedStudents = { ...checkedStudents };
    newCheckedStudents[id] = e.target.checked;
    setCheckedStudents(newCheckedStudents);
  };


  return (
    <>
      <Row>
        <Col xs={12} md={6}>
          <TeacherNavComponent />
        </Col>

        <Col xs={12} md={6}>
          {Object.keys(serverError).length > 0 && (
            <UncontrolledAlert color="danger">
              {serverError}
            </UncontrolledAlert>
          )}

        

          <form onSubmit={handleSubmit}>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((ele) => (
                <option key={ele._id} value={ele._id}>
                  {ele.name}
                </option>
              ))}
            </select>
            {formErrors && <span style={{color : "red"}}>{formErrors.classId}</span>}
            <br />

            {/* <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
            >
              <option>Select Teacher</option>
              {teacher.map((ele) => (
                <option key={ele._id} value={ele._id}>
                  {ele.firstName}
                </option>
              ))}
            </select> */}


            {formErrors && <span style={{color: "red"}}>{formErrors.teacherId}</span>}
            <br />
            <br />

            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
            />
            {formErrors && <span  style={{color: "red"}}>{formErrors.attendanceDate}</span>}<br/>

              { console.log(student, "hii")}
            {student  && Object.keys(student).length > 0 &&(
              <table border={1}>
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Action</th>
                    <th>Attendance Date</th>
                  </tr>
                </thead>
                <tbody>
                  {student?.students?.map((element) => (
                    <tr key={element._id}>
                      <td>{element.rollnumber}</td>
                      <td>{element.firstname}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={checkedStudents[element._id]}
                          onChange={(e) => handleCheck(e, element._id)}
                        />
                      </td>
                      <td>{attendanceDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button type="submit">Submit</button>
          </form>
        </Col>
      </Row>
    </>
  );
}

export default Addattendance;
