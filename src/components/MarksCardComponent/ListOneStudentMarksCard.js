// import { useParams } from "react-router-dom";
// import listOneStudentMarksAsync from "../../action/marksCardAction";
// import { useSelector ,useDispatch} from "react-redux";
// import { useEffect } from "react";
// import {Chart} from "react-google-charts"
// import { Row, Col} from "reactstrap"
// import { jwtDecode } from "jwt-decode";
// import { listStudentsAsync } from "../../action/studentAction";
// import NavComponent from "../principleContainer/navigation/principlenavigate";
// import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";
// function ListOneSTudentMarksCard(){

//     const {classid,studentid} = useParams()
//     // console.log(classid,studentid)
//     const dispatch = useDispatch()
//     const marks = useSelector((state=>{
//         return state.marksCard.studentMarksCard
//     }))
  
//     const students = useSelector((state) => {
//       return state.students.data
//     })
    
//     let selectedStudent = students.filter((ele) => {
//       // {console.log(ele._id,studentid, "fgvb")}
//        if(ele._id === studentid){
//         return ele
//        }
//     }) 
    
  
//     useEffect(()=>{
//         dispatch(listOneStudentMarksAsync(classid,studentid))
//         dispatch(listStudentsAsync())
//     },[dispatch])

//     const token = localStorage.getItem("token")
//     const {role} = jwtDecode(token)
    
//     return (
//         <div>
//             <Row>
//             <Col xs={12} md={6}>
            
//             { role === "Principle" && <NavComponent/>}
//             {role === "Teacher" && <TeacherNavComponent/>}

//             </Col>

//             <Col xs={12} md={6}>
//             {Object.keys(marks).length > 0 ? (
//                 <div>
//                 <h3 style={{marginTop: "25px"}}>Name - {selectedStudent[0].firstname}
//                 </h3>
//         { console.log(marks)}
//                 <Chart
//           chartType="Bar"
//           width="500px"
//           height="400px"
//           data={[
//           ["Subject", "Marks"],
//           ...marks?.studentMarks.subjects.reduce((acc, subject) => {
//             acc.push([subject.subjectId.subject, subject.marks]);
//             return acc;
//           }, []),
//         ]}
//         options={{
//           chart: {
//             title: "Student's Performance"
//           }
//         }}

// />

//         </div>
//             ) : (<h2>No marks Associated to student</h2>)}
//             </Col>
//             </Row>
//         </div>
//     )
// }


// export default ListOneSTudentMarksCard;

import { useParams } from "react-router-dom";
import { asyncgetOneStudentMarks } from "../../action/marksCardAction";
import { useSelector , useDispatch} from "react-redux";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { Row, Col } from "reactstrap";
import { jwtDecode } from "jwt-decode";
import { listStudentsAsync } from "../../action/studentAction";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import TeacherNavComponent from "../teacherContainer/navigation/teachernavigation";

function ListOneSTudentMarksCard() {
    const { classid, studentid } = useParams();
    const dispatch = useDispatch();
    const marks = useSelector(state => state.marksCard.studentMarksCard);
    console.log(marks, "mark")
    const students = useSelector(state => state.students.data);

    useEffect(() => {
        dispatch(asyncgetOneStudentMarks(studentid));
        dispatch(listStudentsAsync());
    }, [dispatch]);

    const token = localStorage.getItem("token");
    const { role } = jwtDecode(token);

    // Find the selected student
    const selectedStudent = students.find(student => student._id === studentid);

    return (
      <div>
      <Row>
          <Col xs={12} md={6}>
              { role === "Principle" && <NavComponent/> }
              { role === "Teacher" && <TeacherNavComponent/> }
          </Col>
      
          <Col xs={12} md={6}>
    {console.log(marks)}
    {selectedStudent ? (  // Check if selectedStudent is defined
        Object.keys(marks).length > 0 ? (
            <div>
                {marks.map((mark, index) => (
                    <div key={index}>
                        <h3 style={{ marginTop: "25px" }}>Name - {selectedStudent ? selectedStudent.firstname : 'Unknown'}</h3>
                        <h3>title - {mark.title}</h3> 
                        <Chart
                            chartType="Bar"
                            width="500px"
                            height="400px"
                            data={[
                                ["Subject", "Marks"],
                                ...mark.results[0].subjects.map(subject => [
                                    subject.subjectId.subject,
                                    subject.marks
                                ]),
                            ]}
                            options={{
                                chart: {
                                    title: "Student's Performance"
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        ) : (
            <h2>No marks associated with the student</h2>
        )
    ) : (
        <h2>Loading...</h2>  // Render loading indicator while selectedStudent is undefined
    )}
</Col>

      </Row>
  </div>
    );
}

export default ListOneSTudentMarksCard;



