import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listEventsAsync, deleteEventsAsync, updatedEventAsync } from '../../action/eventsCalenderAction';
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { asynclistClass } from '../../action/classAction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';
import './listEventsCalender.css';
import { FadeLoader } from "react-spinners"
import { jwtDecode } from 'jwt-decode';
import NavComponent from '../principleContainer/navigation/principlenavigate';
import TeacherNavComponent from '../teacherContainer/navigation/teachernavigation';

function ListEventsCalender() {
    const [eventDate, setEventDate] = useState("");
    const [eventType, setEventType] = useState("");
    const [description, setDescription] = useState("");
    const [classIds, setClassIds] = useState("");
    const [editId, setEditId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(listEventsAsync());
        dispatch(asynclistClass());
        setLoading(false); // Setting loading to false once data fetching is completed
    }, [dispatch]);

    const handleClick = () => {
      if(role === "Principle"){
        navigate("/principle")
      } else {
        navigate("/teacher")
      }
    }
    const events = useSelector(state => state.events.data);
    const classes = useSelector(state => state.classes.data);

    const token = localStorage.getItem("token")
    const { role } = jwtDecode(token)

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this event?');
        if (confirmDelete) {
            await dispatch(deleteEventsAsync(id));
            dispatch(listEventsAsync());
        }
    };

    const handleEdit = (id) => {
        setEditId(id);
        const eventToEdit = events.find(event => event._id === id);
        setEventDate(eventToEdit.date);
        setEventType(eventToEdit.eventType);
        setDescription(eventToEdit.description);
        setClassIds(eventToEdit.classIds);
        setIsModalOpen(true);
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEventDate("");
        setEventType("");
        setDescription("");
        setClassIds("");
        setIsModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            date: eventDate,
            eventType: eventType,
            description: description,
            classIds: classIds
        };

        dispatch(updatedEventAsync(formData, editId));

        // Clear form fields and editId state after submission
        setEventDate("");
        setEventType("");
        setDescription("");
        setClassIds("");
        setEditId(null);
        setIsModalOpen(false);
        dispatch(listEventsAsync());
    };

    const renderCalendarEvents = () => {
        return events.map(event => ({
            title: event.eventType,
            date: event.date
        }));
    };
   return (
        <div className="container">
            <div className="row">
                {loading ? (
                    <div className="spinner-container">
                        <FadeLoader color={"#36D7B7"} loading={loading} size={150} />
                    </div>
                ) : (
                    <>
                        <div className="col-md-6">
                            <h2 style={{color:'darkgreen'}}>Event Lists</h2>
                            <ul style={{color:'black'}} >
                                {events.map(event => (
                                    <li key={event._id}>
                                        <div className="event-item-container">
                                            <span>{event.eventType}</span>
    
                                            { role === "Principle" && (
                                                <div className="edit-delete-buttons">
                                                <button className="edit-btn" onClick={() => handleEdit(event._id)}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDelete(event._id)}>Delete</button>
                                                </div>
                                            )}
                                                
                                            
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Modal isOpen={isModalOpen} toggle={handleCancelEdit}>
                        <Form onSubmit={handleSubmit}>
                            <ModalHeader toggle={handleCancelEdit}  style={{color:'#003366'}}>Edit Event</ModalHeader>
                            <div style={{color:'#009933'}}>
                            <ModalBody  style={{backgroundColor:'#99CCFF'}}>
                                <label>Event Date</label><br />
                                 <input
                                     type="date"
                                     placeholder="Enter event date"
                                    value={eventDate}
                                     onChange={(e) => setEventDate(e.target.value)}
                                 />
                                 <br />
                                 <label>Event Type</label><br />
                                 <input
                                   type="text"
                                   placeholder="Enter event type"
                                    value={eventType}
                                     onChange={(e) => setEventType(e.target.value)}
                                />
                                 <br />
                                 <label>Description</label><br />
                                 <input
                                     type="text"
                                     placeholder="Enter description"
                                     value={description}
                                     onChange={(e) => setDescription(e.target.value)}
                                 />
                                 <br />
                                 <select value={classIds} onChange={(e) => setClassIds(e.target.value)}>
                                     <option value= "">Select Class</option>
                                     {classes.map((ele) => (
                                         <option key={ele._id} value={ele._id}>
                                             {ele.name}
                                         </option>
                                     ))}
                                 </select><br /><br />
                             </ModalBody>
                             </div>
                             <ModalFooter>
                                 <Button type="submit" color="primary">Submit</Button>
                                 <Button type="button" color="danger" onClick={handleCancelEdit}>Cancel</Button>
                            </ModalFooter>
                         </Form>
                     </Modal>
                        </div>

                        <div className="col-md-6" style={{color:'skyblue',backgroundColor: '	#E8E8E8', padding: '20px'}} >
                            <h2 style={{color:'#CC66FF'}}> Event Calendar</h2>
                            <FullCalendar
                                plugins={[dayGridPlugin]}
                                initialView="dayGridMonth"
                                events={renderCalendarEvents()}
                            />
    
                        </div>
                       <span><button onClick={handleClick}>Home</button></span> 
                    </>
                )}
            </div>
        </div>
    );
}

export default ListEventsCalender;
// // corret code

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { listEventsAsync, deleteEventsAsync, updatedEventAsync } from '../../action/eventsCalenderAction';
// import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// import { asynclistClass } from '../../action/classAction';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import './listEventsCalender.css';
// import { FadeLoader } from "react-spinners"

// function ListEventsCalender() {
//     const [eventDate, setEventDate] = useState("");
//     const [eventType, setEventType] = useState("");
//     const [description, setDescription] = useState("");
//     const [classIds, setClassIds] = useState("");
//     const [editId, setEditId] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [ loading, setLoading ] = useState(true)
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(listEventsAsync());
//         dispatch(asynclistClass());
//     }, [dispatch]);

//     const events = useSelector(state => state.events.data);
//     const classes = useSelector(state => state.classes.data);

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this event?');
//         if (confirmDelete) {
//             await dispatch(deleteEventsAsync(id));
//             dispatch(listEventsAsync());
//         }
//     };

//     const handleEdit = (id) => {
//         setEditId(id);
//         const eventToEdit = events.find(event => event._id === id);
//         setEventDate(eventToEdit.date);
//         setEventType(eventToEdit.eventType);
//         setDescription(eventToEdit.description);
//         setClassIds(eventToEdit.classIds);
//         setIsModalOpen(true);
//     };

//     const handleCancelEdit = () => {
//         setEditId(null);
//         setEventDate("");
//         setEventType("");
//         setDescription("");
//         setClassIds("");
//         setIsModalOpen(false);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = {
//             date: eventDate,
//             eventType: eventType,
//             description: description,
//             classIds: classIds
//         };

//         dispatch(updatedEventAsync(formData, editId));

//         // Clear form fields and editId state after submission
//         setEventDate("");
//         setEventType("");
//         setDescription("");
//         setClassIds("");
//         setEditId(null);
//         setIsModalOpen(false);
//         dispatch(listEventsAsync());
//     };

//     const renderCalendarEvents = () => {
//         return events.map(event => ({
//             title: event.eventType,
//             date: event.date
//         }));
//     };


//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-6">
//                     <h2>Event List</h2>
//                     <ul>
//                         {events.map(event => (
//                             <li key={event._id}>
//                                 <div className="event-item-container">
//                                     <span>{event.eventType}</span>
//                                     <div className="edit-delete-buttons">
//                                         <button className="edit-btn" onClick={() => handleEdit(event._id)}>Edit</button>
//                                         <button className="delete-btn" onClick={() => handleDelete(event._id)}>Delete</button>
//                                     </div>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                     <Modal isOpen={isModalOpen} toggle={handleCancelEdit}>
//                         <Form onSubmit={handleSubmit}>
//                             <ModalHeader toggle={handleCancelEdit}>Edit Event</ModalHeader>
//                             <ModalBody>
//                                 <label>Event Date</label><br />
//                                 <input
//                                     type="date"
//                                     placeholder="Enter event date"
//                                     value={eventDate}
//                                     onChange={(e) => setEventDate(e.target.value)}
//                                 />
//                                 <br />
//                                 <label>Event Type</label><br />
//                                 <input
//                                     type="text"
//                                     placeholder="Enter event type"
//                                     value={eventType}
//                                     onChange={(e) => setEventType(e.target.value)}
//                                 />
//                                 <br />
//                                 <label>Description</label><br />
//                                 <input
//                                     type="text"
//                                     placeholder="Enter description"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                                 <br />
//                                 <select value={classIds} onChange={(e) => setClassIds(e.target.value)}>
//                                     <option value= "">Select Class</option>
//                                     {classes.map((ele) => (
//                                         <option key={ele._id} value={ele._id}>
//                                             {ele.name}
//                                         </option>
//                                     ))}
//                                 </select><br /><br />
//                             </ModalBody>
//                             <ModalFooter>
//                                 <Button type="submit" color="primary">Submit</Button>
//                                 <Button type="button" color="danger" onClick={handleCancelEdit}>Cancel</Button>
//                             </ModalFooter>
//                         </Form>
//                     </Modal>
//                 </div>

//                 <div className="col-md-6">
//                     <h2>Event Calendar</h2>
//                     <FullCalendar
//                         plugins={[dayGridPlugin]}
//                         initialView="dayGridMonth"
//                         events={renderCalendarEvents()}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ListEventsCalender;



