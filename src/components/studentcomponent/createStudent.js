// import React, { useState , useEffect} from "react";
// import NavComponent from "../principleContainer/navigation/principlenavigate";
// import { Row, Col, Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { addStudentAsync,ServerError  } from "../../action/studentAction";
// import isEmail from 'validator/lib/isEmail';
// import { getUser } from "../../action/userAction";
// import { asynclistClass } from "../../action/classAction";
// import { UncontrolledAlert } from "reactstrap";
// import "./student.css"
// import "./createStudent"

// function CreateStudent() {
//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [parentnumber, setParentNumber] = useState("");
//   const [rollnumber, setRollnumber] = useState("");
//   const [gender, setGender] = useState("");
//   const [parentsname, setParentname] = useState("");
//   const [email, setEmail] = useState("");
//   const [classId,setClassId] = useState("");
//   const [userId, setUserId] = useState("");
//   const [selectedUser, setSelectedUser] = useState("");
//   const [formErrors, setFormErrors] = useState({});

//   const errors = {};

//   useEffect(() => {
//     dispatch(getUser())
//     dispatch(asynclistClass())
//  }, [])

//  const user = useSelector((state) => {
//   return state.user.data
// })
// // console.log(user)



// const classes = useSelector((state) => {
//   return state.classes.data
// })
// // console.log(classes)

// const serverError = useSelector(state => state.students.serverError);
// // console.log(serverError,"incop")

//   const handleChange = (e) => { 
//     let user  = e.target.value
//     // console.log(user)
//     setUserId(user)
//      setSelectedUser(user)
     
//    }

//   function runValidations() {
//     if (firstname.trim().length === 0) {
//       errors.firstname = "first name cannot be empty";
//     }
//     if (lastname.trim().length === 0) {
//       errors.lastname = "last name cannot be empty";
//     }
//     if (email.trim().length === 0) {
//       errors.email = 'Email is required';
//     } else if (!isEmail(email)) {
//       errors.email = 'Invalid email format';
//     }
//     if (parentnumber.trim().length === 0) {
//       errors.parentnumber = "parentnumber cannot be empty";
//     }
//     if (rollnumber.trim().length === 0) {
//       errors.rollnumber = "rollnumber cannot be empty";
//     }
//     if (gender.trim().length === 0) {
//       errors.gender = "gender cannot be empty";
//     }
//     if (parentsname.trim().length === 0) {
//       errors.parentsname = "parents name cannot be empty";
//     }
//     // if (classId.trim().length === 0) {
//     //   errors.classe = "classes cannot be empty";
//     // }
//     // if (profilePic && profilePic.trim().length === 0) {
//     //   errors.profilePic = "profilepic cannot be empty";
//     // }
// }
//   const dispatch = useDispatch();

//   const handleGenderChange = (e) => {
//     setGender(e.target.value);
//   };

//   // const handleProfilePicChange = (e) => {
//   //   const file = e.target.files[0];
//   //   setProfilePic(file);
//   // };

//   const getValidationStyle = (error) => {
//     if (error === "valid") {
//       return { color: 'green' };
//     } else if (error) {
//       return { color: 'red' };
//     }
//     return {};
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     runValidations();
//     try{
//     if (Object.keys(errors).length === 0) {
//       console.log("hii")
//       setFormErrors({});
//       const formData = {
//         firstname,
//         lastname,
//         parentnumber,
//         rollnumber,
//         gender,
//         parentsname,
//         email,
//         classId,
//         userId,
//       };
//       console.log(formData);

//       //build new fomrm data for sending profile pic at backend
//       const fd = new FormData
//       //looping over object
//       for(const key in formData){
//         fd.append(key,formData[key])
//       }
//       console.log(...fd)
//       dispatch(addStudentAsync(fd));
//       dispatch(addStudentAsync(formData));
//       // if(!serverError){
//       // setFirstName('');
//       // setLastName('');
//       // setParentNumber('');
//       // setRollnumber('');
//       // setGender('');
//       // setParentname('');
//       // setEmail('');
//       // setClassId('');
//       // // setProfilePic(null);
//       // setUserId('');
//       // }
//     } else {
//       setFormErrors(errors);
//     }
//   } catch(error) {
//     dispatch(addStudentAsync(error));
  
//   }
// }



 
//   return (
//     <div>
//        {serverError && <UncontrolledAlert color="danger">{serverError}</UncontrolledAlert>}
//       <Container fluid>
//         <Row>
//           <Col md={2}>
//             <NavComponent />
//           </Col>
//           <Col md={4} >
//           <div className="addstudentimage" >
           
//           </div>
//         </Col>
        
//           <Col md={6}>
//             <h2 className="header" style={{color:"rebeccapurple"}}>Add Student</h2>
//             <div style={{color:'black'}}>
//             <Form onSubmit={handleFormSubmit} className="form-group">
//               <FormGroup >
//                 <Label for="firstname" >First Name:</Label>
//                 <Input
//                   type="text"
//                   id="firstname"
//                   value={firstname}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   size="sm"
//                 />
//                 <span style={getValidationStyle(formErrors.firstname)}>
//                   {formErrors.firstname || ' '}
//                 </span>
//               </FormGroup>

//               <FormGroup>
//                 <Label for="lastname">Last Name:</Label>
//                 <Input
//                   type="text"
//                   id="lastname"
//                   value={lastname}
//                   onChange={(e) => setLastName(e.target.value)}
//                   size="sm"
//                 />
//                 <span style={getValidationStyle(formErrors.lastname)}>
//                   {formErrors.lastname || ' '}
//                 </span>
//               </FormGroup>

//               <FormGroup>
//                 <Label for="email">Enter Email:</Label>
//                 <Input
//                   type="text"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   size="sm"
//                 />
//                 <span style={getValidationStyle(formErrors.email)}>
//                   {formErrors.email || ' '}
//                 </span>
//               </FormGroup>

            

//               <label className="dropdown">Select User</label>
//               <br />
//               <select value={selectedUser} onChange={handleChange}>
//                 <option value="" disabled>Select a user</option>
//                 {user.map((ele, i) => (
//                   <option key={ele._id} value={ele._id}>
//                     {ele.email}-{ele._id}
//                   </option>
//                 ))}
//               </select>
//               <br /><br/>

//               <FormGroup>
//                 <Label for="parentnumber">Parent Mobile Number:</Label>
//                 <Input
//                   type="text"
//                   id="parentnumber"
//                   value={parentnumber}
//                   size="sm"
//                   onChange={(e) => setParentNumber(e.target.value)}
//                 />
//                 <span style={getValidationStyle(formErrors.parentnumber)}>
//                   {formErrors.parentnumber || ' '}
//                 </span>
//               </FormGroup>

//               <FormGroup>
//                 <Label for="rollnumber">Roll Number:</Label>
//                 <Input
//                   type="text"
//                   id="rollnumber"
//                   value={rollnumber}
//                   onChange={(e) => setRollnumber(e.target.value)}
//                   size="sm"
//                 />
//                 <span style={getValidationStyle(formErrors.rollnumber)}>
//                   {formErrors.rollnumber || ' '}
//                 </span>
//               </FormGroup>

//               <FormGroup>
//                 <Label for="parentsname">Parent Name:</Label>
//                 <Input
//                   type="text"
//                   id="parenstname"
//                   value={parentsname}
//                   onChange={(e) => setParentname(e.target.value)}
//                   size="sm"
//                 />
//                 <span style={getValidationStyle(formErrors.parentsname)}>
//                   {formErrors.parentsname || ' '}
//                 </span>
//               </FormGroup>

//               <label className="dropdown">Select class</label>
//               <br />
//               <select value={classId} onChange={(e) => setClassId(e.target.value)}>
//                 <option value="" disabled>Select a user</option>
//                 {classes.map((ele, i) => (
//                   <option key={i} value={ele._id}>
//                     {ele.name}-{ele.sectionname}
//                   </option>
//                 ))}
//               </select>
//               <br /><br/>


//               <FormGroup tag="fieldset">
//                 <legend>Gender:</legend>
//                 <FormGroup check>
//                   <Label check>
//                     <Input
//                       type="radio"
//                       name="gender"
//                       id="female"
//                       value="Female"
//                       checked={gender === "Female"}
//                       onChange={handleGenderChange}
                     
//                     />
//                     Female
//                   </Label>
//                 </FormGroup>
//                 <FormGroup check>
//                   <Label check>
//                     <Input
//                       type="radio"
//                       name="gender"
//                       id="male"
//                       value="Male"
//                       checked={gender === "Male"}
//                       onChange={handleGenderChange}
                    
//                     />
//                     Male
//                   </Label>
//                 </FormGroup>
//               </FormGroup>

//               <Button type="submit" color="primary">
//                 Create Student
//               </Button>
//             </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default CreateStudent;




// import React, { useState , useEffect} from "react";
// import NavComponent from "../principleContainer/navigation/principlenavigate";
// import { Row, Col, Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { addStudentAsync,ServerError  } from "../../action/studentAction";
// import isEmail from 'validator/lib/isEmail';
// import { getUser } from "../../action/userAction";
// import { asynclistClass } from "../../action/classAction";
// import { UncontrolledAlert } from "reactstrap";
// import swal from 'sweetalert'; // Import SweetAlert
// import "./student.css"
// import "./createStudent"

// function CreateStudent() {
//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [parentnumber, setParentNumber] = useState("");
//   const [rollnumber, setRollnumber] = useState("");
//   const [gender, setGender] = useState("");
//   const [parentsname, setParentname] = useState("");
//   const [email, setEmail] = useState("");
//   const [classId,setClassId] = useState("");
//   const [userId, setUserId] = useState("");
//   const [selectedUser, setSelectedUser] = useState("");
//   const [formErrors, setFormErrors] = useState({});

//   const errors = {};

//   useEffect(() => {
//     dispatch(getUser())
//     dispatch(asynclistClass())
//  }, [])

//  const user = useSelector((state) => {
//   return state.user.data
// })
// // console.log(user)



// const classes = useSelector((state) => {
//   return state.classes.data
// })
// // console.log(classes)

// const serverError = useSelector(state => state.students.serverError);
// // console.log(serverError,"incop")

//   const handleChange = (e) => { 
//     let user  = e.target.value
//     // console.log(user)
//     setUserId(user)
//      setSelectedUser(user)
     
//    }

//   function runValidations() {
//     if (firstname.trim().length === 0) {
//       errors.firstname = "first name cannot be empty";
//     }
//     if (lastname.trim().length === 0) {
//       errors.lastname = "last name cannot be empty";
//     }
//     if (email.trim().length === 0) {
//       errors.email = 'Email is required';
//     } else if (!isEmail(email)) {
//       errors.email = 'Invalid email format';
//     }
//     if (parentnumber.trim().length === 0) {
//       errors.parentnumber = "parentnumber cannot be empty";
//     }
//     if (rollnumber.trim().length === 0) {
//       errors.rollnumber = "rollnumber cannot be empty";
//     }
//     if (gender.trim().length === 0) {
//       errors.gender = "gender cannot be empty";
//     }
//     if (parentsname.trim().length === 0) {
//       errors.parentsname = "parents name cannot be empty";
//     }
//     // if (classId.trim().length === 0) {
//     //   errors.classe = "classes cannot be empty";
//     // }
//     // if (profilePic && profilePic.trim().length === 0) {
//     //   errors.profilePic = "profilepic cannot be empty";
//     // }
// }
//   const dispatch = useDispatch();

//   const handleGenderChange = (e) => {
//     setGender(e.target.value);
//   };

//   // const handleProfilePicChange = (e) => {
//   //   const file = e.target.files[0];
//   //   setProfilePic(file);
//   // };

//   const getValidationStyle = (error) => {
//     if (error === "valid") {
//       return { color: 'green' };
//     } else if (error) {
//       return { color: 'red' };
//     }
//     return {};
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     runValidations();
//     try{
//     if (Object.keys(errors).length === 0) {
//       console.log("hii")
//       setFormErrors({});
//       const formData = {
//         firstname,
//         lastname,
//         parentnumber,
//         rollnumber,
//         gender,
//         parentsname,
//         email,
//         classId,
//         userId,
//       };
//       console.log(formData);

//       //build new fomrm data for sending profile pic at backend
//       const fd = new FormData
//       //looping over object
//       for(const key in formData){
//         fd.append(key,formData[key])
//       }
//       console.log(...fd)
//       dispatch(addStudentAsync(fd));
//       dispatch(addStudentAsync(formData));
      

//       // if(!serverError){
//       // setFirstName('');
//       // setLastName('');
//       // setParentNumber('');
//       // setRollnumber('');
//       // setGender('');
//       // setParentname('');
//       // setEmail('');
//       // setClassId('');
//       // // setProfilePic(null);
//       // setUserId('');
//       // }
//     } else {
//       setFormErrors(errors);
//     }
//   } catch(error) {
//     dispatch(addStudentAsync(error));
  
//   }
// }



 
//   return (
//     <div>
//        {serverError && Object.keys(serverError).length > 0  &&  <UncontrolledAlert color="danger">{serverError}</UncontrolledAlert>}
//       <Container fluid>
//         <Row>
//           <Col md={2}>
//             <NavComponent />
//           </Col>
//           <Col md={4} >
//           <div className="addstudentimage" >
           
//           </div>
//         </Col>
        
//           <Col md={6}>
//             <h2 className="header" style={{color:"rebeccapurple"}}>Add Student</h2>
//             <div style={{color:'black'}}>
//             <Form onSubmit={handleFormSubmit} className="form-group">
//               <FormGroup >
//                 <Label for="firstname" >First Name:</Label>
//                 <Input
//                   type="text"
//                   id="firstname"
//                   value={firstname}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   size="sm"
//                 />
//                 <span style={getValidationStyle(formErrors.firstname)}>
//                   {formErrors.firstname || ' '}
//                 </span>
//               </FormGroup>

//               <FormGroup>
//                 <Label for="lastname">Last Name:</Label>
//                 <Input
//                   type="text"
//                   id="lastname"
//                   value={lastname}
//                   onChange={(e) => setLastName(e.target.value)}
//                   size="sm"
//                 />
//                 <span style={getValidationStyle(formErrors.lastname)}>
//                   {formErrors.lastname || ' '}
//                 </span>
//               </FormGroup>

//               <FormGroup>
//                 <Label for="email">Enter Email:</Label>
//                 <Input
//                   type="text"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   size="sm"
//                 />
//                 <span style={getValidationStyle(formErrors.email)}>
//                   {formErrors.email || ' '}
//                 </span>
//               </FormGroup>

            

//               <label className="dropdown">Select User</label>
//               <br />
//               <select value={selectedUser} onChange={handleChange}>
//                 <option value="" disabled>Select a user</option>
//                 {user.map((ele, i) => (
//                   <option key={ele._id} value={ele._id}>
//                     {ele.email}-{ele._id}
//                   </option>
//                 ))}
//               </select>
//               <br /><br/>

//               <FormGroup>
//                 <Label for="parentnumber">Parent Mobile Number:</Label>
//                 <Input
//                   type="text"
//                   id="parentnumber"
//                   value={parentnumber}
//                   size="sm"
//                   onChange={(e) => setParentNumber(e.target.value)}
//                 />
//                 <span style={getValidationStyle(formErrors.parentnumber)}>
//                   {formErrors.parentnumber || ' '}
//                 </span>
//               </FormGroup>

//               <FormGroup>
//                 <Label for="rollnumber">Roll Number:</Label>
//                 <Input
//                   type="text"
//                   id="rollnumber"
//                   value={rollnumber}
//                   onChange={(e) => setRollnumber(e.target.value)}
//                   size="sm"
//                 />
//                 <span style={getValidationStyle(formErrors.rollnumber)}>
//                   {formErrors.rollnumber || ' '}
//                 </span>
//               </FormGroup>

//               <FormGroup>
//                 <Label for="parentsname">Parent Name:</Label>
//                 <Input
//                   type="text"
//                   id="parenstname"
//                   value={parentsname}
//                   onChange={(e) => setParentname(e.target.value)}
//                   size="sm"
//                 />
//                 <span style={getValidationStyle(formErrors.parentsname)}>
//                   {formErrors.parentsname || ' '}
//                 </span>
//               </FormGroup>

//               <label className="dropdown">Select class</label>
//               <br />
//               <select value={classId} onChange={(e) => setClassId(e.target.value)}>
//                 <option value="" disabled>Select a user</option>
//                 {classes.map((ele, i) => (
//                   <option key={i} value={ele._id}>
//                     {ele.name}-{ele.sectionname}
//                   </option>
//                 ))}
//               </select>
//               <br /><br/>


//               <FormGroup tag="fieldset">
//                 <legend>Gender:</legend>
//                 <FormGroup check>
//                   <Label check>
//                     <Input
//                       type="radio"
//                       name="gender"
//                       id="female"
//                       value="Female"
//                       checked={gender === "Female"}
//                       onChange={handleGenderChange}
                     
//                     />
//                     Female
//                   </Label>
//                 </FormGroup>
//                 <FormGroup check>
//                   <Label check>
//                     <Input
//                       type="radio"
//                       name="gender"
//                       id="male"
//                       value="Male"
//                       checked={gender === "Male"}
//                       onChange={handleGenderChange}
                    
//                     />
//                     Male
//                   </Label>
//                 </FormGroup>
//               </FormGroup>

//               <Button type="submit" color="primary">
//                 Create Student
//               </Button>
//             </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default CreateStudent;



//
import React, { useState , useEffect} from "react";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import { Row, Col, Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { addStudentAsync,ServerError  } from "../../action/studentAction";
import isEmail from 'validator/lib/isEmail';
import { getUser } from "../../action/userAction";
import { asynclistClass } from "../../action/classAction";
import { UncontrolledAlert } from "reactstrap";
import swal from 'sweetalert'; // Import SweetAlert
import "./student.css"
import "./createStudent"

function CreateStudent() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [parentnumber, setParentNumber] = useState("");
  const [rollnumber, setRollnumber] = useState("");
  const [gender, setGender] = useState("");
  const [parentsname, setParentname] = useState("");
  const [email, setEmail] = useState("");
  const [classId,setClassId] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const errors = {};

  useEffect(() => {
    dispatch(getUser())
    dispatch(asynclistClass())
 }, [])

 const user = useSelector((state) => {
  return state.user.data
})
// console.log(user)

const classes = useSelector((state) => {
  return state.classes.data
})
// console.log(classes)

const serverError = useSelector(state => state.students.serverError);
// console.log(serverError,"incop")

const dispatch = useDispatch();

const handleChange = (e) => { 
  let user  = e.target.value
  // console.log(user)
  setUserId(user)
   setSelectedUser(user)
}

function runValidations() {
  if (firstname.trim().length === 0) {
    errors.firstname = "first name cannot be empty";
  }
  if (lastname.trim().length === 0) {
    errors.lastname = "last name cannot be empty";
  }
  if (email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!isEmail(email)) {
    errors.email = 'Invalid email format';
  }
  if (parentnumber.trim().length === 0) {
    errors.parentnumber = "parentnumber cannot be empty";
  }
  if (rollnumber.trim().length === 0) {
    errors.rollnumber = "rollnumber cannot be empty";
  }
  if (gender.trim().length === 0) {
    errors.gender = "gender cannot be empty";
  }
  if (parentsname.trim().length === 0) {
    errors.parentsname = "parents name cannot be empty";
  }
}

const handleGenderChange = (e) => {
  setGender(e.target.value);
};

const getValidationStyle = (error) => {
  if (error === "valid") {
    return { color: 'green' };
  } else if (error) {
    return { color: 'red' };
  }
  return {};
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  runValidations();
  try {
    if (Object.keys(errors).length === 0) {
      console.log("hii")
      setFormErrors({});
      const formData = {
        firstname,
        lastname,
        parentnumber,
        rollnumber,
        gender,
        parentsname,
        email,
        classId,
        userId,
      };
      console.log(formData);

      //build new form data for sending profile pic at backend
      const fd = new FormData
      //looping over object
      for(const key in formData){
        fd.append(key,formData[key])
      }
      console.log(...fd)
      dispatch(addStudentAsync(fd))
      dispatch(addStudentAsync(formData))
        .then(() => {
          swal("Success!", "Student created successfully!", "success");
          // Clear input fields after successful creation
          setFirstName('');
          setLastName('');
          setParentNumber('');
          setRollnumber('');
          setGender('');
          setParentname('');
          setEmail('');
          setClassId('');
          setUserId('');
        })
        .catch(error => console.error('Error while creating student:', error));
    } else {
      setFormErrors(errors);
    }
  } catch(error) {
    dispatch(addStudentAsync(error));
  }
};

return (
  <div>
     {serverError && Object.keys(serverError).length > 0  &&  <UncontrolledAlert color="danger">{serverError}</UncontrolledAlert>}
    <Container fluid>
      <Row>
        <Col md={2}>
          <NavComponent />
        </Col>
        <Col md={4}>
          <div className="addstudentimage"></div>
        </Col>
        
        <Col md={6}>
          <h2 className="header" style={{color:"rebeccapurple"}}>Add Student</h2>
          <div style={{color:'black'}}>
          <Form onSubmit={handleFormSubmit} className="form-group">
            <FormGroup >
              <Label for="firstname">First Name:</Label>
              <Input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                size="sm"
              />
              <span style={getValidationStyle(formErrors.firstname)}>
                {formErrors.firstname || ' '}
              </span>
            </FormGroup>

            <FormGroup>
              <Label for="lastname">Last Name:</Label>
              <Input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                size="sm"
              />
              <span style={getValidationStyle(formErrors.lastname)}>
                {formErrors.lastname || ' '}
              </span>
            </FormGroup>

            <FormGroup>
              <Label for="email">Enter Email:</Label>
              <Input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="sm"
              />
              <span style={getValidationStyle(formErrors.email)}>
                {formErrors.email || ' '}
              </span>
            </FormGroup>

            <label className="dropdown">Select User</label>
            <br />
            <select value={selectedUser} onChange={handleChange}>
              <option value="" disabled>Select a user</option>
              {user.map((ele, i) => (
                <option key={ele._id} value={ele._id}>
                  {ele.email}-{ele._id}
                </option>
              ))}
            </select>
            <br /><br/>

            <FormGroup>
              <Label for="parentnumber">Parent Mobile Number:</Label>
              <Input
                type="text"
                id="parentnumber"
                value={parentnumber}
                size="sm"
                onChange={(e) => setParentNumber(e.target.value)}
              />
              <span style={getValidationStyle(formErrors.parentnumber)}>
                {formErrors.parentnumber || ' '}
              </span>
            </FormGroup>

            <FormGroup>
              <Label for="rollnumber">Roll Number:</Label>
              <Input
                type="text"
                id="rollnumber"
                value={rollnumber}
                onChange={(e) => setRollnumber(e.target.value)}
                size="sm"
              />
              <span style={getValidationStyle(formErrors.rollnumber)}>
                {formErrors.rollnumber || ' '}
              </span>
            </FormGroup>

            <FormGroup>
              <Label for="parentsname">Parent Name:</Label>
              <Input
                type="text"
                id="parenstname"
                value={parentsname}
                onChange={(e) => setParentname(e.target.value)}
                size="sm"
              />
              <span style={getValidationStyle(formErrors.parentsname)}>
                {formErrors.parentsname || ' '}
              </span>
            </FormGroup>

            <label className="dropdown">Select class</label>
            <br />
            <select value={classId} onChange={(e) => setClassId(e.target.value)}>
              <option value="" disabled>Select a user</option>
              {classes.map((ele, i) => (
                <option key={i} value={ele._id}>
                  {ele.name}-{ele.sectionname}
                </option>
              ))}
            </select>
            <br /><br/>

            <FormGroup tag="fieldset">
              <legend>Gender:</legend>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={handleGenderChange}
                  />
                  Female
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={handleGenderChange}
                  />
                  Male
                </Label>
              </FormGroup>
            </FormGroup>

            <Button type="submit" color="primary">
              Create Student
            </Button>
          </Form>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);
}

export default CreateStudent;
