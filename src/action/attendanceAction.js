
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


// export const ADD_ATTENDENCE = "ADD_ATTENDENCE" 
export const GET_ATTENDANCE = "GET_ATTENDANCE"
export const EDIT_STUDENT_STATUS = "EDIT_STUDENT_STATUS"
export const ADD_ATTENDENCE = "ADD_ATTENDENCE"
export const UPDATE_STUDENT_STATUS = "UPDATE_STUDENT_STATUS"
export const GET_ONE_STUDENT = "GET_ONE_STUDENT"
export const DELETE_ATTENDENCE = "DELETE_ATTENDENCE"
export const GET_ONE_ATTENDENCE = "GET_ONE_ATTENDENCE"
export const SERVER_ERROR = "SERVER_ERROR"

const navigate = useNavigate


export const AddAttendance = (attendance) => {
  return {
    type : "ADD_ATTENDENCE",
    payload: attendance
  }
}

export const serverError = (errors) => {
  return  {
   type : "SERVER_ERROR",
   payload : errors
  }
}
export const syncAddAttendance = (attendance) => {
  console.log(attendance, "attendance")
    return async (dispatch) => {
      try{
        const response = await axios.post("/api/addAttendence", attendance, {
            headers : {
                Authorization: localStorage.getItem("token")  
            }
            })

        dispatch(AddAttendance(response.data))
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Attendance has been added successfully!",
          showConfirmButton: false,
          timer: 2000 
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            // Handle forbidden error
            dispatch(serverError("You are not authorized to take attendance for this class."));
          } else {
            // Handle other error status codes
            dispatch(serverError(error.response.data.errors[0].msg));
          }
      }
    }
  }
}


export const startGetAttendance = (attendace) => {
  return{
    type : "GET_ATTENDANCE",
    payload: attendace
  }
}

export const asyncGetAtendance = (attendance) => {
  console.log(attendance, "in action")
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/oneclassattendance/${attendance.classId}?attendanceDate=${attendance.attendanceDate}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      dispatch(startGetAttendance(response.data));
      console.log(response.data, "checking");
    } catch (e) {
      console.log(e.message);
    }
  };
};


export const editStudentStatus = (id)=>{
  return{
    type: "EDIT_STUDENT_STATUS",
    payload: id
  }
}

export const updateStudentStatus = (data)=>{
  return{
    type: "UPDATE_STUDENT_STATUS",
    payload: data
  }
}

export const asyncUpdateAtendance = (id, formData) => {
  return async (dispatch) => {
    try{
      const {data} = await axios.put(`/api/updateAttendence/${id}`, formData, {
        headers : {
            Authorization: localStorage.getItem("token")  
        }
      }
      )
      console.log(data)
      dispatch(updateStudentStatus(data))
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Updated Attendance successfully!",
        showConfirmButton: false,
        timer: 2000 
      });
      } catch(e) {
      console.log(e)
    }
  }
}

export const getOneStudentAttendance = (data) => {
  // console.log(data,"ina2")
  return {
    type : "GET_ONE_STUDENT",
    payload: data
  }
}

export const asyncGetOneAtendance = (id, month, year) => {
  // console.log(id, year, month,"ina1")
  return async (dispatch) => {
    try{
      const response = await axios.get(`/api/getStudentAttendance/${id}?month=${month}&&year=${year}`, {
        headers : {
            Authorization: localStorage.getItem("token")  
        }
      }
      )
      // console.log(response.data, "ina3")
      dispatch(getOneStudentAttendance(response.data))
      
      } catch(e) {
      console.log(e)
    }
  }
}

export const deleteAttendance = (classId,studentId) => {
  return {
    type : "DELETE_ATTENDENCE",
    payload: classId,studentId
  }
}

export const asyncDeleteAttendance = (studentId, classId) => {
    return async (dispatch) => {
      try{
        const response = await axios.delete(`/api/deleteAttendence/${classId}/${studentId}`, {
            headers : {
                Authorization: localStorage.getItem("token")  
            }
            })

        dispatch(deleteAttendance(response.data))
        console.log(response.data, "hiii")
      } catch(e) {
        console.log(e)
      } 
    }
}


export const classAttendance = (data) => {
  console.log(data, "in action")
  return {
    type : "GET_ONE_ATTENDENCE",
    payload: data
  }
}

export const asyncGetOneClassAttendance = (classId) => {
    return async (dispatch) => {
      try{
        const response = await axios.get(`/api/classAttendance/${classId}`, {
            headers : {
                Authorization: localStorage.getItem("token")  
            }
            })

        dispatch(classAttendance(response.data))
        // console.log(response.data)
      } catch(e) {
        console.log(e)
      } 
    }
}

