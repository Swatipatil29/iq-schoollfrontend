// import { LIST_CLASS } from "../action/classAction"
// import { ADD_ATTENDENCE } from "../action/attendanceAction"

// const initialAttendance = {data:[]}

//  export const AttendanceReducer = (state = initialAttendance, action) => {
//   switch(action.type){
//      case(LIST_CLASS):{
//        return {...state, data: action.payload}
//      }

//      case(ADD_ATTENDENCE) : {
//       return [...state, action.payload]; 
//      }
     
//     default:{
//         return {...state}
//     }
//   }
// }



import { GET_ATTENDANCE, 
  EDIT_STUDENT_STATUS, 
  UPDATE_STUDENT_STATUS,
  ADD_ATTENDENCE
  ,GET_ONE_STUDENT, 
  DELETE_ATTENDENCE,
  GET_ONE_ATTENDENCE, SERVER_ERROR } from "../action/attendanceAction";

const initialAttendance = { data: [] , selectedStudent:[], serverError: []};

export const AttendanceReducer = (state = initialAttendance, action) => {
  switch (action.type) {
    // case LIST_CLASS: {
      //   console.log(action.payload, "3623625")
      //   return { ...state, data: action.payload };
      // }

      case ADD_ATTENDENCE : {
        console.log(action.payload, "attendance")
       return {
        ...state,
        data: [...state.data, action.payload]}
      }
      
      case GET_ATTENDANCE: {
      return { ...state, data: action.payload };
    }

    case SERVER_ERROR : {
      return {...state, serverError: action.payload}
    }

    case GET_ONE_ATTENDENCE: {
      console.log(action.payload)
      return { ...state, data: action.payload };
    }

    case UPDATE_STUDENT_STATUS : {
      return {...state, data: action.payload}
    }

   

    // case EDIT_STUDENT_STATUS : {
    //   console.log(action.payload, "reducer")
    //   return {
    //     ...state,
    //     data: [
    //       {
    //         ...state.data[0],
    //         students: state.data[0].students.map(ele => {
    //           if (ele._id === action.payload.id) {
    //             console.log({ ...ele, status: "Absent" }, "up")
    //             return { ...ele, status: action.payload.status}
    //           } else {
    //             return { ...ele }
    //           }
    //         })
    //       }
    //     ]
    //   }
    // }

    case EDIT_STUDENT_STATUS: {
      console.log(action.payload, "reducer");
      return {
        ...state,
        data: state.data.map((classAttendance) => ({
          ...classAttendance,
          students: classAttendance.students.map((student) => {
            if (student._id === action.payload.id) {
              console.log({ ...student, status: action.payload.status }, "up");
              return { ...student, status: action.payload.status };
            } else {
              return { ...student };
            }
          }),
        })),
      };
    }
    
    case GET_ONE_STUDENT: {
      return {...state, selectedStudent: action.payload };
    }

        case DELETE_ATTENDENCE:
      console.log(action.payload, "in reducer");
      return {
        ...state,
        data: state.data.filter((attendance) => attendance._id !== action.payload),
      };

    default: {
      return state;
    }
  }
};


