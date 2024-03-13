

// import { ADD_EVENTCALENDER ,LIST_EVENTS,DELETE_EVENTS,UPDATE_EVENTS} from "../action/eventsCalenderAction";


// let eventInitialState = {data:[]};
// function EventsReducer(state=eventInitialState,action){
//     switch (action.type){
//         case ADD_EVENTCALENDER:{
//             return {
//                 ...state,data:[...state.data,action.payload]
//             }
//         }
//         case LIST_EVENTS:{
//             return{
//                 ...state, data: action.payload
//             };
//         }
//         case DELETE_EVENTS:{
//             return {
//                 ...state,data:state.data.filter((event)=>{
//                     return event._id!==action.payload
//                 })
//             }
//         }
//         case UPDATE_EVENTS:{
//             return{
//                 ...state,data:state.data.map((event)=>{
//                     if(event._id === action.payload.id){
//                         console.log(action.payload)
//                         return {...event, ...action.payload.event}
//                     }else{
//                         return{...event}
//                     }
//                 })
//             }
//         }
//         default:{
//             return state
//         }
//     }
// }


// export default EventsReducer;



// eventsReducer.js
import { ADD_EVENTCALENDER, LIST_EVENTS, DELETE_EVENTS, UPDATE_EVENTS } from "../action/eventsCalenderAction";

const eventInitialState = { data: [] };

function eventsReducer(state = eventInitialState, action) {
    switch (action.type) {
        case ADD_EVENTCALENDER:
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case LIST_EVENTS:
            return {
                ...state,
                data: action.payload
            };
        case DELETE_EVENTS:
            return {
                ...state,
                data: state.data.filter((event) => event._id !== action.payload)
            };
        case UPDATE_EVENTS:
            return {
                ...state,
                data: state.data.map((event) => {
                    if (event._id === action.payload.id) {
                        return { ...event, ...action.payload.event };
                    } else {
                        return event;
                    }
                })
            };
        default:
            return state;
    }
}

export default eventsReducer;
