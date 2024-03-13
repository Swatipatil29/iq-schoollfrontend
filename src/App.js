import Home from './user/home';
import PrincipleRegistration from './user/registration';
//import StudentProfile from './components/studentcomponent/studentprofile';
import { BrowserRouter, Routes, Link, Route } from "react-router-dom"
import Login from './user/login';
import AddTeacher from './components/teacherContainer/createTeacher';
import PrincipleDashboard from './components/principleContainer/principledashboard';
import CreateStudent from './components/studentcomponent/createStudent';
import CreateClass from './components/classComponent/createClass';
//import ListTeacher from './components/teacherContainer/listTeacher';
import ForgotPassword from './user/forgetpassword';
//import ListStudent  from "./components/studentcomponent/liststudent"
import ListTeacher from './components/teacherContainer/listTeacher';
//import CreateClass from './components/classComponent/createClass';
import ListStudent from './components/studentcomponent/liststudent';
import UpdateAttendence from './components/AttendanceControl/UpdateAttendance';
import ListClass from './components/classComponent/listClass';
import CreateSubjects from './components/SubjectComponent/createSubjects';
import ListSubjects from './components/SubjectComponent/listSubjects';
// import ForgotPassword from './user/forgetpassword';
import AddEvents from './components/EventComponent/AddEvents';
  import ListOneEventCalender from './components/EventComponent/ListOneEventCalender';
import ListEventsCalender from './components/EventComponent/ListEventsCalender';
import ListOneClass from './components/classComponent/listOneClass';
import  AddMarksCard from './components/MarksCardComponent/AddMarksCard' 
import AboutComponent from './components/Aboutcomponent/AboutComponent';
import TeacherDashboard from './components/teacherContainer/teacherDashboard';
import SchoolTimings from './components/Timetable/SchoolTimings';
import ListOneSTudentMarksCard from './components/MarksCardComponent/ListOneStudentMarksCard';
import Addattendence from "./components/AttendanceControl/addattendance"
import OneClassAttendance from './components/AttendanceControl/OneClassAttendance';
import Success from './components/paymentComponents/Success';
import Failure from './components/paymentComponents/Failure';
import ListMarksCard from './components/MarksCardComponent/listMarkscard';
import FeeDetails from './components/paymentComponents/Paymentdetails';
import StudentDashboard2 from './components/studentcomponent/StudentTryDashboard2';



function App() {
  
  return (
    <BrowserRouter>
    
    
      <div style={{ backgroundColor: ' #F8F8FF', minHeight: '100vh' }}>
      <div className="App ">
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addclasses" element = {<CreateClass/>}/>
          <Route path="/register" element={<PrincipleRegistration />} />
          {/* <Route path="/studentprofile" element={<StudentProfile />} /> */}
          <Route path="/addStudent" element={<CreateStudent />} />
          <Route path='/addAttendance' element={<Addattendence/>} />
          <Route path='/addteacher' element={<AddTeacher/>} />
          <Route path='/listteacher' element = {< ListTeacher/>} />
          <Route path='/listmarkscard' element = {< ListMarksCard/>}/>
       <Route path='/principle' element={<PrincipleDashboard />} />
          <Route path='/liststudent' element={<ListStudent />} />
          <Route path='/updateattendance' element={<UpdateAttendence/>}/>
          <Route path='/listClass' element={<ListClass/>}/>
          <Route path='/listOneClass/:classid' element = {<ListOneClass/>}/>
          <Route path='/addSubjects' element={<CreateSubjects/>}/>
          <Route path='/listSubjects' element={<ListSubjects/>}/>
          <Route path='/addEventsCalender' element={<AddEvents/>}/>
          <Route path='/listEventsCalender/:id' element={<ListOneEventCalender/>}/>
          <Route path='/listEvents' element={<ListEventsCalender/>}/>
         <Route path='/addmarkscard' element={<AddMarksCard/>}/>
         <Route path='/forgot-password' element={<ForgotPassword/>} />
         <Route path='/oneclassattendance' element={ <OneClassAttendance/>}/>
          <Route path='/about' element={<AboutComponent/>}/>
          <Route path='/teacher' element={<TeacherDashboard/>} />
          <Route path='/schooltimings' element={<SchoolTimings/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='/failure' element={<Failure/>}/>
          <Route path='/feedetails' element = {<FeeDetails/>}/>
          <Route path='/studentdashboard2' element={<StudentDashboard2/>}/>
          <Route path='/listonestudentmarks/:classid/:studentid' element = {<ListOneSTudentMarksCard/>}/></Routes>
          
      </div>
      </div>
      
      
    </BrowserRouter>
  );
}

export default App;





