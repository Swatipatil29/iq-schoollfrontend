import { LIST_ONE_CLASS } from "../action/oneClassAction";


const initialState = { data: [], selectedStudent: [] };

const oneClassStudentReducer = (state = initialState, action) => {
    switch(action.type) {
        case LIST_ONE_CLASS:
            // console.log(action.payload, "dhus")
            return {
                ...state,
                data: action.payload 
            };

            
        default:
            return state;
    }
};

export default oneClassStudentReducer;
