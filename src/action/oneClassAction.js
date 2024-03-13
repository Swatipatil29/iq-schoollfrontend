import axios from "../config/axios";

export const LIST_ONE_CLASS = "LIST_ONE_CLASS"

export const listClass = (data) => {
  // console.log(data)
    return{
        type:"LIST_ONE_CLASS",
        payload: data
    }
}

export const asynclistOneClass = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`/api/getoneclass/${id}` , {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
  
        // console.log(response.data, "hjb");
        dispatch(listClass(response.data));
      } catch (err) {
        console.log(err);
      }
    };
  };