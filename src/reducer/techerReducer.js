import { ADD_TEACHER } from "../action/teacherAction";
import { LIST_TEACHER } from "../action/teacherAction";
import { DELETE_TEACHER,UPDATE_TEACHER, SERVER_ERROR, GET_ONE_TEACHER } from "../action/teacherAction";
let teacherInitialState = { data: [], serverError: [], oneTeacher: []}

const teacherReducer = (state = teacherInitialState, action) => {
  switch (action.type) {
    case ADD_TEACHER:{
      return {...state, data:[...state.data,action.payload], serverError: null};
    }
    case LIST_TEACHER:{
      return {...state, data: action.payload}
    } 
    case SERVER_ERROR: {
      return {...state, serverError : action.payload}
    }

    case GET_ONE_TEACHER: {
      // console.log(action.payload, "inred")
      return {...state, oneTeacher: action.payload}
    }
    case DELETE_TEACHER:{
      return {
        ...state,
        data: state.data.filter((teacher) => teacher.id !== action.payload),
      };
    }

    case GET_ONE_TEACHER : {
      return { ...state, oneTeacher: action.payload}
    }
    case UPDATE_TEACHER :{
      return {
        ...state,data:state.data.map((teacher)=>{
          if(teacher._id === action.payload._id){
            return {...teacher, ...action.payload}
        }else{
            return {...teacher}
        }
        })
      }
    }
    default:
      return state;
  }
};

export default teacherReducer;
