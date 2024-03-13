import { ADD_MARKS } from "../action/marksCardAction";
import { LIST_MARKS, UPDATE_MARKS_SUCCESS, DELETE_MARKS, SERVER_ERROR,  GET_ALL_MARKS} from "../action/marksCardAction";

let marksInitialValue={ data:[], studentMarksCard: {}, serverError : []};
 const MarksCardReducer=(state=marksInitialValue,action)=>{
    switch(action.type){
        case ADD_MARKS:{
            return {
                ...state,data:[state, action.payload]
            }
        }
        case LIST_MARKS:{
            // console.log(action.payload, "hgv")
            return {...state , studentMarksCard : action.payload}

        }

         case GET_ALL_MARKS:{
            console.log(action.payload, "hgv")
            return {...state , studentMarksCard : action.payload}

        }
    
        case SERVER_ERROR : {
            console.log(action.payload, "reducer")
            return {...state, serverError: action.payload}
        }

        case UPDATE_MARKS_SUCCESS:
            console.log(action.payload,"reducer")
            return {
                ...state,
                // Update marks data with the payload received from the action
                // marks: action.payload
                data : action.payload

            }

            case DELETE_MARKS : 
            const newData = state.data.filter(marksCard => marksCard._id !== action.payload)
      return {
        ...state,
        data: newData,
    
      }

        default:{
            return state;
        }
    }
    }

    export default MarksCardReducer


