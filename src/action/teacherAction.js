import axios from "../config/axios"

export const ADD_TEACHER = 'ADD_TEACHER';
export const LIST_TEACHER ="LIST_TEACHER";
export const DELETE_TEACHER = "DELETE_TEACHER"
export const UPDATE_TEACHER = "UPDATE_TEACHER"
export const SERVER_ERROR = "SERVER_ERROR"
export const GET_ONE_TEACHER = "GET_ONE_TEACHER"

const startAddTeacher = (teacher)  => {
  console.log(teacher, "in action");
    return {
        type: "ADD_TEACHER",
        payload : teacher
    }
}

const StartGetServer = (error) => {
  // console.log(error, "in action")
  return {
    type : "SERVER_ERROR",
    payload : error
  }
}

export const addTeacherAsync = (teacher) => {
  console.log(teacher, "action 26")
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/addTeacher", teacher , {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      console.log(response.data, "in action");
      dispatch(startAddTeacher(response.data));
    } catch (err) {
      console.log(err)
      const error = err.response.data.errors[0].msg
      // console.log(error, "in action")
      dispatch(StartGetServer(error))
    }
  };
};


//LIST TEACHER
const listTeacher=(list)=>{
  return{
    type:"LIST_TEACHER",
    payload:list
  }
}


export const listTeacherAsync =()=>{
  return async(dispatch)=>{
    try{
        const response = await axios.get("/api/listallTeacher" ,{
          headers:{
            Authorization:localStorage.getItem("token")
          }
        })
         console.log(response.data)
        // dispatch(listTeacher(response.data.teacher))
        dispatch(listTeacher(response.data))
       
    }
    catch(err){
      console.log(err)
    }
  }
}


const deleteTeacher=(teacherId)=>{
  return{
    type:"DELETE_TEACHER",
    payload:teacherId
  }
}


export const deleteTeacherAsync=(id)=>{
      return async (dispatch)=>{
        try{
            const response =await axios.delete(`/api/deleteTeacher/${id}`,{
              headers:{
                Authorization:localStorage.getItem("token")
              }
            })
            console.log(response.data)
          dispatch(deleteTeacher(response.data))  
        }
        catch(err){
          console.log(err)
        }
      }
}


const updateTeacher =(editId,updatedTeacher)=>{
  return {
    type:"UPDATE_TEACHER",
    payload:editId,updatedTeacher
  }
}

export const updateTeacherAsync =(editId,updatedTeacher)=>{
  return async (dispatch)=>{
      try{
          const response = await axios.put(`/api/updateTeacher/${editId}`,updatedTeacher,{
            headers:{
              Authorization:localStorage.getItem("token")
            }
          })
          dispatch(updateTeacher(response.data))
      }
      catch(err){
        console.log(err)
      }
  }
}

export const stratGetOneTeacher = (data) => {
  // console.log(data, "inaction3")
  return {
     type : "GET_ONE_TEACHER",
     payload : data
  }
}

export const asyncGetOneTeacher  = (teacher) => {
  // console.log(teacher, "teacherinaction")
    return async(dispatch) => {
      try{
        const response = await axios.get(`/api/oneTeacher/${teacher}`, {
          headers : {
            Authorization : localStorage.getItem("token")
          }
        })
         dispatch(stratGetOneTeacher(response.data))
         console.log(response.data, "in action2")
      } catch(e) {
        console.log(e)
      }
    }
}