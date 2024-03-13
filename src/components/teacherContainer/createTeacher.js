// import React, { useState, useEffect } from "react";
// import { Row, Col, Container } from "reactstrap";
// import NavComponent from "../principleContainer/navigation/principlenavigate";
// import { useDispatch, useSelector } from "react-redux";
// import { addTeacherAsync } from "../../action/teacherAction";
// import { getUser } from "../../action/userAction";
// import Multiselect from 'multiselect-react-dropdown';
// import { listTeacherAsync } from "../../action/teacherAction";
// import { listSubjectsAsync } from "../../action/subjectAction";
// import { asynclistClass } from "../../action/classAction";
// import { UncontrolledAlert } from "reactstrap";
// import { isEmail } from "validator"
// import './createTeacher.css'

// function AddTeacher() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.data);
//   const [title, setTitle] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [gender, setGender] = useState("");
//   const [userId, setUserId] = useState("")
//   const [formErrors, setFormErrors] = useState({})
//   const [subjects, setSubjects] = useState("")
//   const [classId, setClassId] = useState([])
//   const [selectedUser, setSelectedUser] = useState("");
  
//   const errors = {}

//   useEffect(() => {
//    dispatch(listTeacherAsync())
//    dispatch(listSubjectsAsync())
//    dispatch(getUser())
//    dispatch(asynclistClass())
//   },[dispatch])

//   const subject = useSelector((state) => {
//     return state.subject.data
//   })


//   const serverError = useSelector((state) => {
//     return state.teacher.serverError
//   })
//   console.log(serverError,"in comp")

//   const classes = useSelector((state) => {
//     return state.classes.data
//   })
//   // console.log(classes)
 

//   const formValidation = () => {
//     if (title.trim().length === 0) {
//       errors.title = "Title cannot be empty";
//     }
//     if (firstName.trim().length === 0) {
//       errors.firstName = "First Name cannot be empty";
//     }
//     if (lastName.trim().length === 0) {
//       errors.lastName = "Last Name cannot be empty";
//     }
//     if (mobile.trim().length === 0) {
//       errors.mobile = "Mobile Number cannot be empty";
//     }
//     if(subjects.length === 0 ){
//       errors.subject = " Subject cannot be empty"
//     }
//     if (email.trim().length === 0) {
//       errors.email = "Email cannot be empty";
//     } else if (!isEmail(email)) {
//       errors.email = "Invalid email format";
//     }
//   }
//   const handleSubmit =  (e) => {
//     e.preventDefault();
//     formValidation();
//     try{
//     if (Object.keys(errors).length === 0) {
//       setFormErrors({})
//       const teacher = {
//         title,
//         firstName,
//         lastName,
//         email,
//         mobile,
//         gender,
//         userId,
//         classId,
//         subjects : subjects?.map((ele) => ele.cat)
//       };
//       console.log(teacher)

//       dispatch(addTeacherAsync(teacher));

//       if(serverError.length === 0){
//       setTitle("");
//       setFirstName("");
//       setLastName("");
//       setMobile("");
//       setGender("");
//       setUserId("");
//       }
    
//   } else{
//     setFormErrors(errors)
//   }
// } catch (error){
//   dispatch(addTeacherAsync(error))
// }
// }

//   const handleGenderChange = (e) => {
//     setGender(e.target.value);
//   };

 

//   // const handleChange = (e) => { 
//   //  let user  = e.target.value.split("-")[1]
//   //   setSelectedUser(user)
//   //   setUserId(user)
//   // }
  
  

//   return (
//     <div>
//     <Container fluid>
//     { serverError && Object.keys(serverError).length > 0 &&  <UncontrolledAlert color="danger">{serverError}</UncontrolledAlert>}
//       <Row>
//         <Col xs={12} md={2} >
//           <div  >
//             <NavComponent />
//           </div>
//         </Col>
//         <Col xs={12} md={4} >
//           <div className="addteacherimage" >
           
//           </div>
//         </Col>
//         <Col xs={12} md={6}>
//           <div style={{color:'black'}}>
//             <h2 style={{color:'violet'}}>Add Teacher</h2>

//             <form onSubmit={handleSubmit} className="form-group">
//               <label htmlFor="title" className="form-label">
//                 Enter title
//               </label>{" "}
//               <br />
//               <input
//                 type="text"
//                 id="title"
//                 value={title}
//                 className="form-control"
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//               {formErrors.title && <span style={{color: "red"}}>{formErrors.title}</span>}
//               <br />
              

//               <label htmlFor="firstName" className="form-label">
//                 Enter FirstName
//               </label>
//               <br />
//               <input
//                 id="firstName"
//                 type="text"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="form-control"
//               />
//               {formErrors.firstName && <span  style={{color: "red"}}>{formErrors.firstName}</span>}
//               <br />

//               <label htmlFor="lastName" className="form-label">
//                 Enter lastName
//               </label>
//               <br />
//               <input
//                 type="text"
//                 id="lastName"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="form-control"
//               />
//               {formErrors.lastName && <span  style={{color: "red"}}>{formErrors.lastName}</span>}
//               <br />

//               <label htmlFor="email" className="form-label">
//                 Enter Email
//               </label>
//               <br />
//               <input
//                 id="email"
//                 type="text"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-control"
//               />
//               {formErrors.email && <span  style={{color: "red"}}>{formErrors.email}</span>}
//               <br />

//               <label htmlFor="number" className="form-label">
//                 Enter MobileNumber
//               </label>
//               <br />
//               <input
//                 id="number"
//                 type="number"
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 className="form-control"
//               />
//               {formErrors.mobile && <span  style={{color: "red"}}>{formErrors.mobile}</span>}
//               <br />

//               <div className="form-check form-check-inline radio">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="gender"
//                   id="Female"
//                   value="Female"
//                   checked={gender === "Female"}
//                   onChange={handleGenderChange}
//                 />

//                 <label className="form-check-label" htmlFor="Teacher">
//                   Female
//                 </label>
//               </div>
//               <div className="form-check form-check-inline">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="gender"
//                   id="Male"
//                   value="Male"
//                   checked={gender === "Male"}
//                   onChange={handleGenderChange}
//                 />
//                 <label className="form-check-label" htmlFor="Student">
//                   Male
//                 </label>
//               </div>
//               <br />
//               <br />

//               <label>Select Class</label>
//               <select value={classId} onChange={(e) => setClassId(e.target.value)}>
//               <option value=""> Select Class</option>
//               {
//                 classes.map((ele) => {
//                 const classValue = `${ele.name}`
//              if (!classId.includes(classValue)) {
//              return <option key={ele._id} value={ele._id}>{classValue}</option>;
//           }
//                 })
//               }
//               </select>


//         <label>Select Subject</label>
//         <Multiselect
//         options={subject.map(ele => ({ key: ele.subject, cat: ele._id }))}
//         displayValue="key"
//         onSelect={(selectedList) => setSubjects(selectedList)}
//         onRemove={(selectedList) => setSubjects(selectedList)}
//       />
//         {formErrors.subject && <span style={{color: "red"}}>{formErrors.subject}</span>}
//       <br/>

    

//               <label className="dropdown">Select User</label>
//               <br />
//               <select value={userId} onChange={(e) => setUserId(e.target.value)}>
//                 <option value="" >
//                   Select a class
//                 </option>
//                 {user.map((user, i) => (
//                   <option key={i} value={user._id}>
//                     {user.email}-{user._id}
//                   </option>
//                 ))}
//               </select>
//               <br />
//               <br />
              

//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//     </div>
//   );
// }


// export default AddTeacher;


// //test


import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import { useDispatch, useSelector } from "react-redux";
import { addTeacherAsync } from "../../action/teacherAction";
import { getUser } from "../../action/userAction";
import Multiselect from 'multiselect-react-dropdown';
import { listTeacherAsync } from "../../action/teacherAction";
import { listSubjectsAsync } from "../../action/subjectAction";
import { asynclistClass } from "../../action/classAction";
import { UncontrolledAlert } from "reactstrap";
import { isEmail } from "validator";
import swal from 'sweetalert'; // Import SweetAlert
import './createTeacher.css';

function AddTeacher() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [userId, setUserId] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [subjects, setSubjects] = useState("")
  const [classId, setClassId] = useState([])
  const [selectedUser, setSelectedUser] = useState("");
  const [serverError, setServerError] = useState(""); // State to hold server error message
  
  const errors = {}

  useEffect(() => {
   dispatch(listTeacherAsync())
   dispatch(listSubjectsAsync())
   dispatch(getUser())
   dispatch(asynclistClass())
  },[dispatch])

  const subject = useSelector((state) => {
    return state.subject.data
  })

  const classes = useSelector((state) => {
    return state.classes.data
  })
 
  const formValidation = () => {
    if (title.trim().length === 0) {
      errors.title = "Title cannot be empty";
    }
    if (firstName.trim().length === 0) {
      errors.firstName = "First Name cannot be empty";
    }
    if (lastName.trim().length === 0) {
      errors.lastName = "Last Name cannot be empty";
    }
    if (mobile.trim().length === 0) {
      errors.mobile = "Mobile Number cannot be empty";
    }
    if(subjects.length === 0 ){
      errors.subject = " Subject cannot be empty"
    }
    if (email.trim().length === 0) {
      errors.email = "Email cannot be empty";
    } else if (!isEmail(email)) {
      errors.email = "Invalid email format";
    }
  }
  
  const handleSubmit =  (e) => {
    e.preventDefault();
    formValidation();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      const teacher = {
        title,
        firstName,
        lastName,
        email,
        mobile,
        gender,
        userId,
        classId,
        subjects: subjects?.map((ele) => ele.cat)
      };
      
      dispatch(addTeacherAsync(teacher))
        .then(() => {
          swal("Success!", "Teacher added successfully!", "success"); // Show SweetAlert on success
          setTitle("");
          setFirstName("");
          setLastName("");
          setMobile("");
          setGender("");
          setUserId("");
        })
        .catch(error => setServerError(error.message)); // Set server error message if request fails
    } else {
      setFormErrors(errors);
    }
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div>
      <Container fluid>
        {serverError && <UncontrolledAlert color="danger">{serverError}</UncontrolledAlert>}
        <Row>
          <Col xs={12} md={2} >
            <div>
              <NavComponent />
            </div>
          </Col>
          <Col xs={12} md={4} >
            <div className="addteacherimage" ></div>
          </Col>
          <Col xs={12} md={6}>
            <div style={{color:'black'}}>
              <h2 style={{color:'violet'}}>Add Teacher</h2>
              <form onSubmit={handleSubmit} className="form-group">
                {/* Your form inputs */}
                <label htmlFor="title" className="form-label">
                Enter title
              </label>{" "}
              <br />
              <input
                type="text"
                id="title"
                value={title}
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
              />
              {formErrors.title && <span style={{color: "red"}}>{formErrors.title}</span>}
              <br />
              

              <label htmlFor="firstName" className="form-label">
                Enter FirstName
              </label>
              <br />
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
              />
              {formErrors.firstName && <span  style={{color: "red"}}>{formErrors.firstName}</span>}
              <br />

              <label htmlFor="lastName" className="form-label">
                Enter lastName
              </label>
              <br />
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
              />
              {formErrors.lastName && <span  style={{color: "red"}}>{formErrors.lastName}</span>}
              <br />

              <label htmlFor="email" className="form-label">
                Enter Email
              </label>
              <br />
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
              {formErrors.email && <span  style={{color: "red"}}>{formErrors.email}</span>}
              <br />

              <label htmlFor="number" className="form-label">
                Enter MobileNumber
              </label>
              <br />
              <input
                id="number"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="form-control"
              />
              {formErrors.mobile && <span  style={{color: "red"}}>{formErrors.mobile}</span>}
              <br />

              <div className="form-check form-check-inline radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Female"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={handleGenderChange}
                />

                <label className="form-check-label" htmlFor="Teacher">
                  Female
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Male"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={handleGenderChange}
                />
                <label className="form-check-label" htmlFor="Student">
                  Male
                </label>
              </div>
              <br />
              <br />

              <label>Select Class</label>
              <select value={classId} onChange={(e) => setClassId(e.target.value)}>
              <option value=""> Select Class</option>
              {
                classes.map((ele) => {
                const classValue = `${ele.name}`
             if (!classId.includes(classValue)) {
             return <option key={ele._id} value={ele._id}>{classValue}</option>;
          }
                })
              }
              </select>


        <label>Select Subject</label>
        <Multiselect
        options={subject.map(ele => ({ key: ele.subject, cat: ele._id }))}
        displayValue="key"
        onSelect={(selectedList) => setSubjects(selectedList)}
        onRemove={(selectedList) => setSubjects(selectedList)}
      />
        {formErrors.subject && <span style={{color: "red"}}>{formErrors.subject}</span>}
      <br/>

    

              <label className="dropdown">Select User</label>
              <br />
              <select value={userId} onChange={(e) => setUserId(e.target.value)}>
                <option value="" >
                  Select a class
                </option>
                {user.map((user, i) => (
                  <option key={i} value={user._id}>
                    {user.email}-{user._id}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddTeacher;
