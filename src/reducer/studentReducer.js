import { ADD_STUDENT, ADD_STUDENT_ERROR } from "../action/studentAction"
import { DELETE_STUDENT } from "../action/studentAction"
import { UPDATE_STUDENT } from "../action/studentAction"
import { LIST_STUDENT, LIST_ONE_STUDENT } from "../action/studentAction"

let studentInitialState = {
  data: [],
  serverError: null ,
  oneStudent : []
}

const studentReducer = (state = studentInitialState, action) => {
  switch(action.type) {
    case ADD_STUDENT: {
      return {
        ...state,
        data: [...state.data, action.payload],
        serverError: null // Clear server error when adding a student
      }
    }
    case DELETE_STUDENT: {
      const newData = state.data.filter(student => student._id !== action.payload)
      return {
        ...state,
        data: newData,
    
      }
    }

    case LIST_ONE_STUDENT : {
      return {
        ...state, oneStudent : action.payload
      }
    }
    case UPDATE_STUDENT: {
      return {
        ...state,
        data: state.data.map((student) => {
          if(student._id === action.payload._id) {
            return { ...student, ...action.payload }
          } else {
            return { ...student }
          }
        }),
        serverError: null 
      }
    }
    case LIST_STUDENT: {
      return {
        ...state,
        data: action.payload,
        serverError: null 
      }
    }
    case ADD_STUDENT_ERROR: {
      // console.log(action.payload,"inreducer")
      return {
        ...state,
        serverError: action.payload // Set server error when adding a student fails
      }
    }
    default:
      return state
  }
}

export default studentReducer
