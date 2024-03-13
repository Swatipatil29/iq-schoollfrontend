

import { ADD_CLASSES, DELETE_CLASS, LIST_CLASS, UPDATE_CLASS, SERVER_ERROR} from "../action/classAction";

const classInitialState = { data: [], serverError: [] };

const classReducer = (state = classInitialState, action) => {
  switch (action.type) {
    
    case ADD_CLASSES:
      console.log(action.payload,"in reducer")
      return {
        ...state,
        data: [...state.data, action.payload],
      };

      case SERVER_ERROR : 
      // console.log(action.payload, "reducer")
      return {
       ...state, serverError: [...state.data, action.payload ]
      }

      // case LIST_ONE_CLASS : 
      // return {
      //   ...state,
      //   oneClassdata: [...state.data, action.paylod]
      // }
    case LIST_CLASS:
      // console.log(action.payload, "vbn")
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_CLASS:
      return {
        ...state,
        data: state.data.filter((classes) => classes._id !== action.payload),
      };
    case UPDATE_CLASS:
      return {
        ...state,
        data: state.data.map((classes) => {
          if (classes._id === action.payload.id) {
            return { ...classes, ...action.payload.classes };
          } else {
            return { ...classes };
          }
        }),
      };
    default:
      return state;
  }
};

export default classReducer;
