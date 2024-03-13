import axios from "../config/axios";

export const ADD_CLASSES = "ADD_CLASSES"; // Corrected action type definition
export const LIST_CLASS= "LIST_CLASS";
export const DELETE_CLASS = "DELETE_CLASS"
export const UPDATE_CLASS ="UPDATE_CLASS"
export const SERVER_ERROR = "SERVER_ERROR"
// export const LIST_ONE_CLASS = "LIST_ONE_CLASS"

const addClasses = (classes) => {
  console.log(classes,"in action")
  return {
    type: ADD_CLASSES, 
    payload: classes,
  };
};

const serverError = (error) => {
  console.log(error, "action2")
  return{
    type: SERVER_ERROR,
    payload : error
  }
}

export const addClassesAsync = (classes) => {
  // console.log(classes,"in action2")
    return async (dispatch) => {
      try {
        const response = await axios.post("/api/addClass", classes , {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
  
        console.log(response.data);
        dispatch(addClasses(response.data));
      } catch (err) {
        const error = err.response.data.errors[0].msg
        // console.log(error, "inaction1")
        dispatch(serverError(error))
      }
    };
  };



export const asynclistClass = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("/api/getClasses" , {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
  
        // console.log(response.data);
        dispatch(listClass(response.data));
      } catch (err) {
        console.log(err);
      }
    };
  };

  const listClass = (classes) => {
    return {
      type: LIST_CLASS,
      payload: classes
    };
  };

  
 
  

  const deleteClass=(id)=>{
    return {
      type:"DELETE_CLASS",
      payload:id
    }
  }

  export const deleteClassAsync =(id)=>{
    
    return async (dispatch)=>{
      try{
          const response = await axios.delete(`/api/deleteClass/${id}`,{
            headers: {
              Authorization : localStorage.getItem("token")
            }
          })
          console.log(response.data)
          dispatch(deleteClass(response.data))
      }
      catch(err){
        console.log(err)
      }
    }
  }


  const updateClass=(classes,id)=>{
    return {
      type:"UPDATE_CLASS",
      payload:{classes:classes , id:id }
    }
  }


  export const updatedClassAsync=(updatedClass,editId)=>{
        return async(dispatch)=>{
          try{
            const response = await axios.put(`/api/updateClass/${editId}`,updatedClass,{
              headers:{
                Authorization:localStorage.getItem("token")
              }
            })
            dispatch(updateClass(response.data))
          }
          catch(err){
            console.log(err)
          }
        }
  }

  
  // const listoneclass=(data)=>{
    
  //   return {
  //     type:"LIST_ONE_CLASS",
  //     payload:data
  //   }
  // }

  // export const asynclistOneClass=(id)=>{
  //   console.log(id)
  //   return async (dispatch)=>{
  //     try{
  //         const response = await axios.get(`/api/getoneclass/${id}`,{
  //           headers: {
  //             Authorization : localStorage.getItem("token")
  //           }
  //         })
  //         console.log(response.data)
  //         dispatch(listoneclass(response.data))
  //     }
  //     catch(err){
  //       console.log(err)
  //     }
  //   }
  // }