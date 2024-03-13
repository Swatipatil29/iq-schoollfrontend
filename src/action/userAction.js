import axios  from "../config/axios";

 export const SET_USER = "SET_USER"

export const setUser = (user) => {
    return{
      type : "SET_USER",
      payload: user
    }
  }
  
export const getUser = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("/api/getUserList", {
            headers: {
                Authorization: localStorage.getItem("token")
              }
        })
       
        console.log(response.data);
        const user = response.data
        dispatch(setUser(user))
      } catch (error) {
        console.error(error);
      }
    };
  };
  

  
 