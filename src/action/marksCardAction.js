
import axios from "../config/axios"
export const ADD_MARKS = "ADD_MARKS"
export const UPDATE_MARKS = "UPDATE_MARKS"
export const UPDATE_MARKS_SUCCESS = "UPDATE_MARKS_SUCCESS"
export const DELETE_MARKS = "DELETE_MARKS"
export const SERVER_ERROR = "SERVER_ERROR"
export const  GET_ALL_MARKS = " GET_ALL_MARKS"

const addMarks=(marksData)=>{
        return{
            type:"ADD_MARKS",
            payload:marksData
        }
}


export const marksAddingAsync=(marksData)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post("/api/addMarks",marksData,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            console.log(response.data)
            dispatch(addMarks(response.data))
           
        }
        catch(err){
            console.log(err)
        }
    }
}



export const LIST_MARKS = "LIST_MARKS";

const listMarks = (list) => {
    
    return {
        type: LIST_MARKS,
        payload: list
    }
}

export const serverError = (error) => {
    return {
        type: SERVER_ERROR,
        payload : error
    }

}

export const listOneStudentMarksAsync = (classid,studentid) => {
    // console.log(classid,studentid, "hiii")
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/markofOneStudent/${classid}/${studentid}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch(listMarks(response.data));
            // console.log(response.data)
        } catch (e) {
            console.log(e)
           const error = e.response.data.error;
           dispatch(serverError(error))
        }
    }
} 


export default listOneStudentMarksAsync;

export const asyncUpdateMarks = (id, sId, updatedMarks) => {
    console.log(id, sId, updatedMarks, "inaction1")
    return async (dispatch) => {
        try {
            const response = await axios.put(`/api/updateMarks/${id}/${sId}`, updatedMarks, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            
            console.log(response.data, "inaction2")
            dispatch(updateMarksSuccess(response.data));
        } catch (error) {
            // Handle error
            console.error('Error updating marks:', error);
        }
    };
};




export const updateMarksSuccess = (updatedMarks) => {
    console.log(updatedMarks, "inaction3")
    return {
        type: 'UPDATE_MARKS_SUCCESS',
        payload: updatedMarks
    };
};


export const deleteMarks = (id) => {
    return {
        type : DELETE_MARKS,
        payload : id
    }
}

export const asyncDeleteMarks = (id) => {
    console.log(id, "inaction1")
    return async (dispatch) => {
        try {
            const response = await axios.delete(`/api/deleteMarks/${id}/`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            
            console.log(response.data, "inaction2")
            dispatch(deleteMarks(response.data));
        } catch (error) {
            const errors = error.response.data.err
            console.log(errors)
            dispatch(serverError(errors))
            console.error('Error updating marks:', error);
        }
    }
}


export const getOneStudentMarks = (id) => {
    console.log(id)
    return {
        type : GET_ALL_MARKS,
        payload : id
    }
}

export const asyncgetOneStudentMarks = (id) => {
    console.log(id, "inaction1")
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/getAllMarksStudent/${id}/`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            
            console.log(response.data, "inaction2")
            dispatch(getOneStudentMarks(response.data));
        } catch (error) {
            const errors = error.response.data.err
            console.log(errors)
            dispatch(serverError(errors))
            console.error('Error updating marks:', error);
        }
    }
}
