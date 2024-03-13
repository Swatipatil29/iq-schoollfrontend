import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { asynclistClass } from "../../action/classAction";
import { asyncGetAtendance, asyncGetOneAtendance, asyncDeleteAttendance, asyncGetOneClassAttendance } from "../../action/attendanceAction";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Chart} from "react-google-charts"
import { jwtDecode } from "jwt-decode";
import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import { Row, Col} from "reactstrap"
import { useNavigate } from "react-router-dom"; 


function OneClassAttendance() {
  const [classId, setClassId] = useState('');
  const [attendaceId, setAttendanceId] = useState("")
  const [isTrue, setIsTrue] = useState(true)
  // const [selectedStudentAttendance, setSelectedStudentAttendance] = useState(null); // State for selected student's attendance
  const newdate  = new Date()
  const year = newdate.getFullYear();
  const month = newdate.getMonth() + 1 
  const dispatch = useDispatch();
  const navigate = useNavigate()
 

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(false);

  const token = localStorage.getItem("token")
  const { role } = jwtDecode(token)

  useEffect(() => {
    dispatch(asynclistClass());
  }, [dispatch]);

  

  useEffect(() => {
    if (classId) {
      // console.log(classId, "hudfjuh")
      dispatch(asyncGetOneClassAttendance(classId));
    }
  }, [classId, dispatch]);

  const attendance = useSelector((state) => state.attendance.data) || [];
  console.log(attendance)

  // const sStudent = useSelector((state) => state.attendance.selectedStudent)
  // console.log(sStudent)

  
  useEffect(() => {
      setAttendanceId(attendance[0]?._id)
  },[classId,dispatch]) 
 
  
  
  const classes = useSelector((state) => state.classes.data);

  const selectedStudent = useSelector((state) => {
    return state.attendance.selectedStudent
  })
  // console.log(selectedStudent) 

  const getDateColumn = (date) => (
    <td key={date}>
      {date ? new Date(date).toLocaleDateString() : "No Date"}
    </td>
  );

  const handleClick = async (id) => {
     dispatch(asyncGetOneAtendance(id, year, month));
     setModal(true)
    //  setIsTrue(!isTrue)
  };

  const handleupdate = () => {
    navigate("/updateattendance")
  }

  const handleDelete = (id) => {
    console.log(id, "in component")
    const input = window.confirm("Are you sure?")
    if(input){
    dispatch( asyncDeleteAttendance(classId,id))
    
    }
  }

  return (
    <div>
    <Row>
     <Col xs={12} md={6}>
      { role === "Principle" ?  <NavComponent/> : <TeacherNavComponent/>}
     </Col>
     <Col xs={12} md={6}>
      <form>
        <select value={classId} onChange={(e) => setClassId(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map((ele) => (
            <option key={ele._id} value={ele._id}>
              {ele.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <br />
      </form>
      {console.log(attendance.length > 0, "234")}
      { attendance.length > 0 === true && modal === false && (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              
              {attendance?.map((ele) => getDateColumn(ele.attendanceDate))}
            </tr>
          </thead>
            <tbody>
            {attendance[0]?.students?.map((student) => (
              <tr key={student.studentId._id}>
               { console.log(student)}
                <td onClick={() => handleClick(student.studentId._id)}>
                  {student.studentId.firstname}
                </td>
                {attendance?.map((ele) => (
                  <td key={`${ele._id}_${student.studentId._id}`}>
                    {ele.students.find(
                      (s) => s.studentId._id === student.studentId._id
                    ).status}
                  </td>
                ))}
                <td>
                  <button onClick={() => handleDelete(student.studentId._id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) }
  
        <Button onClick={handleupdate}>UpdateAttendance</Button>
      
        {selectedStudent && 
        <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Attendance</ModalHeader>
        <ModalBody>
         TotalDays : {selectedStudent.totaldays} <br/>
         presentDays : {selectedStudent.presentDays}<br/>
         absentDays : {selectedStudent.absentDays}<br/>
         percentage : {selectedStudent.percentage}<br/>


         <Chart
      chartType="PieChart"
      data={[
        ["attendaden", "no of days"],
        ["Present Days", Number(selectedStudent.presentDays)],
        ["Absent Days",Number(selectedStudent.absentDays) ]
      ]}
      width={"100%"}
      height={"300px"}
    />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
        </Modal>
        }
       </Col>
       </Row>
    </div>
  );
}

export default OneClassAttendance;


