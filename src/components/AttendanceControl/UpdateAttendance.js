import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { asynclistClass } from "../../action/classAction";
import { asyncGetAtendance, asyncUpdateAtendance, editStudentStatus } from "../../action/attendanceAction"; // Make sure to import asyncUpdateAtendance
import { listStudentsAsync } from "../../action/studentAction";
import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";
import { Row, Col} from "reactstrap"

function UpdateAttendance() {
  const [classId, setClassId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [formErrors, setFormErrors] = useState("")
  const errors = {}
  const dispatch = useDispatch();

  function formValidation() {
    if(classId.trim().length === 0) {
       errors.classId = "classId cannot be empty"
     }
     if(selectedDate.trim().length === 0 ){
       errors.attendaceData = "attendance Date cannot be empty"
     }
     }

  useEffect(() => {
    dispatch(asynclistClass());
    dispatch(listStudentsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (classId && selectedDate) {
      {console.log(classId ,selectedDate, "class")}
      dispatch(asyncGetAtendance({ classId, attendanceDate: selectedDate }));
    }
  }, [dispatch, classId, selectedDate]);

  const attendance = useSelector((state) => state.attendance.data);

  const handleCheck = (e, id) => {
    const status = e.target.checked ? "Present" : "Absent";
    dispatch(editStudentStatus({ id, status }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    formValidation()
    try{
    if(Object.keys(errors).length === 0 ){
      setFormErrors("")
      if (classId && selectedDate && attendance && attendance.length > 0) {
        dispatch(asyncUpdateAtendance(attendance[0]._id, { classId, attendanceDate: selectedDate, students: attendance[0].students }));
      } else{
        setFormErrors(errors)
      }
    }
    } catch(e) {
      console.log(e)
    }
   };


  const classes = useSelector((state) => state.classes.data);

  return (
    <>
    <Row>

    <Col xs={12} md={6}>
      <TeacherNavComponent/>
    </Col>
    {/* { console.log(classId, "id")} */}

    <Col xs={12} md={6}>
      <form onSubmit={handleSubmit}>
        <select value={classId} onChange={(e) => setClassId(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map((ele) => (
             <option key={ele._id} value={ele._id}>
              {ele.name}
            </option>
          ))}
        </select> <br />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form><br/><br/>

      {attendance && attendance.length > 0 ? (
        <div>
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
            
              {attendance[0].students.map((element) => (
                <tr key={element._id}>
                  <td>{element.studentId?.rollnumber}</td>
                  <td>{element.studentId?.firstname}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={element.status === "Present"}
                      onChange={(e) => handleCheck(e, element._id)}
                    />
                  </td>
                  <td>{new Date(selectedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : ( <h3>No attendance for this date</h3>)}
      </Col>
      </Row>
    </>
  );
}


export default UpdateAttendance;
