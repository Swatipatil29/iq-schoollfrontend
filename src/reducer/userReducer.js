import { SET_USER } from "../action/userAction";
let userInitialState = {data:[]}

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case(SET_USER):{
        return { ...state, data: action.payload };

    }
    default:
      return state;
  }
};

export default userReducer;