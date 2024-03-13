

import { useDispatch, useSelector } from "react-redux";
import { listStudentsAsync } from "../../action/studentAction";
import { asynclistClass } from "../../action/classAction";
import { useEffect } from "react";
function ViewMarksCard(){

    const students = useSelector((state)=>{
        return state.students.data
    })

    const classData = useSelector((state)=>{
        return state.classes.data
    })
     const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(asynclistClass())
        dispatch(listStudentsAsync())
    },[])
    return (
        <div>
            <h2>view</h2>
            <ul>
                {students.map((ele)=>{
                    return <li key={ele._id}>{ele.firstname}</li>
                })}
            </ul>
            <ul>
                {classData.map((ele)=>{
                    return <li key={ele._id}>{ele.classname}</li>
                })}
            </ul>
        </div>
    )
}

export default ViewMarksCard;