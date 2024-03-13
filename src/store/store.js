import { createStore, combineReducers} from "redux"
import { thunk } from "redux-thunk"
import { applyMiddleware } from "redux"
import teacherReducer from "../reducer/techerReducer"
//import CreateStudent from "../components/studentcomponent/createStudent"
import studentReducer from "../reducer/studentReducer"
import userReducer from "../reducer/userReducer"
import classReducer from "../reducer/classReducer";
import { AttendanceReducer } from "../reducer/attendanceReducer"
import subjectReducer from "../reducer/subjectReducer"
import oneClassStudentReducer from "../reducer/oneClassStudentReducer"

import EventsReducer from "../reducer/eventReducer"

import MarksCardReducer from "../reducer/marksCardReducer"
const configureStore = () => {
    const store= createStore(combineReducers({
      teacher : teacherReducer,
      students :studentReducer,
      user : userReducer,
      classes: classReducer,
      subject:subjectReducer,
      user : userReducer,
      attendance: AttendanceReducer,
      events : EventsReducer,
      marksCard:MarksCardReducer,
      oneclassStudents : oneClassStudentReducer
    }), applyMiddleware(thunk))
    return store

}

export default configureStore
