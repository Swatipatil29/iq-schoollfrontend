import axios from "../config/axios"


export const ADD_STUDENT ="ADD_STUDENT"
export const DELETE_STUDENT="DELETE_STUDENT"
export const UPDATE_STUDENT = "UPDATE_STUDENT"
export const LIST_STUDENT = "LIST_STUDENT"
export const ADD_STUDENT_ERROR = "ADD_STUDENT_ERROR"
export const LIST_ONE_STUDENT = "LIST_ONE_STUDENT"


const startAddStudent =(student)=>{
    return{
        type :"ADD_STUDENT",
        payload:student
    }
}

const addStudentError = (error) => {
    // console.log(error,"SEinaction2")
    return{
    type: ADD_STUDENT_ERROR,
    payload: error
  }
};

 export const addStudentAsync=(student)=>{
    return async (dispatch)=>{
            try{
                const response = await axios.post("/api/addStudent", student ,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                })
                // console.log(response.data)
                dispatch(startAddStudent(response.data))
            }
            catch (error) {
                if (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0]) {
                  const errors = error.response.data.errors[0].msg
                  console.log(errors,"SEinaction")
                  dispatch(addStudentError(errors))
                } else {
                  console.log(error);
                }
              }
}
 }

const deleteStudent = (studentId)=>{
    return {
        type:"DELETE_STUDENT",
        payload: studentId
    }
}

export const deleteStudentAsync=(studentId)=>{
    return async (dispatch)=>{
        try{
            const responce = await axios.delete(`/api/deleteStudent/${studentId}`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            // console.log(responce.data)
            dispatch(deleteStudent(studentId))
        }
        catch(err){
                console.log(err)
        }
    }
}

 export const listStudents = (student)=>{
    return {
        type:"LIST_STUDENT",
        payload:student
    }
}

export const listStudentsAsync =()=>{
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/liststudent', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            dispatch(listStudents(response.data))
            // console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }
}

const updateStudent = (editId, updatedStudent)=>{
    return {
        type :"UPDATE_STUDENT",
        payload : editId, updateStudent
    }
}

export const startUpdateStudent = (updatedStudent, editId) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`/api/updatestudent/${editId}`, updatedStudent, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        dispatch(updateStudent(response.data));
      } catch (err) {
        console.log(err);
      }
    };
  };
  

  export const listOneStudents = (student)=>{
    return {
        type:"LIST_ONE_STUDENT",
        payload:student
    }
}

export const asynclistOneStudents =(id)=>{
    // console.log(id, "inaction")
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/liststudent/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            dispatch(listOneStudents(response.data))
            // console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }
}

