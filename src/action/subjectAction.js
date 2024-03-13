import axios from "../config/axios"

export const ADD_SUBJECTS="ADD_SUBJECTS"

const addSubjects=(subject)=>{
    return{
        type:"ADD_SUBJECTS",
        payload:subject
    }
}


export const addSubjectsAsync=(subject)=>{
    console.log(subject)
    return async (dispatch)=>{
        try{
            
            const response = await axios.post("/api/addSubject",subject, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
                
            });
            console.log(response.data);
            dispatch(addSubjects(response.data));
        }
        catch(err){
            console.log(err)
        }
    }
}

export const LIST_SUBJECTS = "LIST_SUBJECTS"


const listSubjects =(list)=>{
    return {
        type:"LIST_SUBJECTS",
        payload:list
    }
}

export const listSubjectsAsync = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/api/listallSubjects", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch(listSubjects(response.data));
        } catch (err) {
            console.log(err);
        }
    }
}


export const DELETE_SUBJECT ="DELETE_SUBJECT"


const deleteSubject=(subjectId)=>{
    return {
        type:"DELETE_SUBJECT",
        payload:subjectId
    }
}


export const deleteSubjectAsync=(id)=>{
        return async (dispatch)=>{
            try{
                const response = await axios.delete(`/api/deleteSubject/${id}`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                })
                dispatch(deleteSubject(response.data))
            }
            catch(err){
                console.log(err)
            }
        }
}


  export const UPDATE_SUBJECTS="UPDATE_SUBJECTS"

const updateSubjects=(editId,updatedSubject)=>{
    return{
        type:"UPDATE_SUBJECTS",
        payload:editId,updatedSubject
    }
}


export const updateSubjectsAsync=(updatedSubject, id)=>{
    console.log(updatedSubject)
    return async (dispatch)=>{
        try{
            const response = await axios.put(`/api/updateSubject/${id}`,updatedSubject,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            console.log(response.data)
            dispatch(updateSubjects(response.data))
        }
        catch(err){
            console.log(err)
        }
    }
}