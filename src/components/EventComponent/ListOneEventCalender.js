
// import { listEventsAsync } from "../../action/eventsCalenderAction";
// import { UseSelector,useDispatch, useSelector } from "react-redux";
// function ListEventsCalender(){

//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(listEventsAsync());
//     }, [dispatch]);

//     const events = useSelector ((state)=>state.events.data)
//     return (
//         <div>
//             <h2>ListEvents</h2>

//             <ul>
//                 {events.map((event) => (
//                     <li key={event._id}>
//                         {event.event[0]}
                        
//                     </li>
//                 ))}
//             </ul>

//         </div>
//     )
// }

// export default ListEventsCalender;

import { listEventsAsync } from "../../action/eventsCalenderAction";
import {  useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
function ListOneEventCalender() {
    const dispatch = useDispatch();
    const {id} = useParams()
    //console.log(id)

    useEffect(() => {
        dispatch(listEventsAsync(id));
    }, []);

    const events = useSelector(state => state.events.data);
    //console.log(events,"events")

    return (
        <div>
            <h2>List OneEvent</h2>
            <p>{events.eventType}</p>
        </div>
    );
}

export default ListOneEventCalender;
