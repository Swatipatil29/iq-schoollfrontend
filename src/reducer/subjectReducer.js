import { ADD_SUBJECTS,LIST_SUBJECTS,DELETE_SUBJECT,UPDATE_SUBJECTS } from "../action/subjectAction";



const subjectInitialState = {
  data: [], 
};

const subjectReducer = (state = subjectInitialState, action) => {
  switch (action.type) {
    case ADD_SUBJECTS:
      return {
        ...state,
        data: [...state.data, action.payload], 
      };
      case LIST_SUBJECTS:
        return{
            ...state, data: action.payload
        };
        case DELETE_SUBJECT:{
            return{
                ...state,data:state.data.filter((subjects)=>subjects.id!==action.payload)
            }
        };
        case UPDATE_SUBJECTS:{
          return{
             ...state, data: state.data.map((subject)=>{
              if(subject._id === action.payload._id){
                  return {...subject, ...action.payload}
              }else{
                  return {...subject}
              }
          })}
        }
     default:
      return state; 
  }
};

export default subjectReducer;


