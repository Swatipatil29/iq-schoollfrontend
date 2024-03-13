

// AddEvents.js

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addEventCalenderAsync } from "../../action/eventsCalenderAction";
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { asynclistClass } from "../../action/classAction";
// import './addEvents.css'; // Import CSS file for styling

// function AddEvents() {
//     const dispatch = useDispatch();

//     const [eventDate, setEventDate] = useState("");
//     const [eventType, setEventType] = useState("");
//     const [description, setDescription] = useState("");
//     const [selectedClass, setSelectedClass] = useState("");
//     const [formErrors, setFormErrors] = useState({}); // State to hold form errors
    
//     useEffect(() => {
//         dispatch(asynclistClass());
//     }, []);

//     const classes = useSelector((state) => state.classes.data);

//     const validateAddEventForm = () => {
//         const errors = {};

//         if (!eventDate) {
//             errors.eventDate = "Event date is required";
//         }

//         if (!eventType) {
//             errors.eventType = "Event type is required";
//         }

//         if (!description) {
//             errors.description = "Description is required";
//         }

//         if (!selectedClass) {
//             errors.selectedClass = "Class selection is required";
//         }

//         setFormErrors(errors);
//         return errors;
//     };

//     const handleAddEvent = () => {
//         const errors = validateAddEventForm();

//         if (Object.keys(errors).length === 0) {
//             const formData = {
//                 date: eventDate,
//                 eventType: eventType,
//                 description: description,
//                 classes: selectedClass
//             };
//             dispatch(addEventCalenderAsync(formData));
//         }
//     };

//     return (
//         <div>
//             <Container fluid>
//                 <Row>
//                     <Col xs={12} md={6}>
//                         <div>
//                             <h2>Add Events</h2>
//                             <br />
//                             <Form>
//                                 <label>Event Date</label><br />
//                                 <input
//                                     type="date"
//                                     placeholder="Enter event date"
//                                     value={eventDate}
//                                     onChange={(e) => setEventDate(e.target.value)}
//                                 />
//                                 {formErrors.eventDate && <div className="error-message">{formErrors.eventDate}</div>}
//                                 <br />
//                                 <label>Event Type</label><br />
//                                 <input
//                                     type="text"
//                                     placeholder="Enter event type"
//                                     value={eventType}
//                                     onChange={(e) => setEventType(e.target.value)}
//                                 />
//                                 {formErrors.eventType && <div className="error-message">{formErrors.eventType}</div>}
//                                 <br />
//                                 <label>Description</label><br />
//                                 <input
//                                     type="text"
//                                     placeholder="Enter description"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                                 {formErrors.description && <div className="error-message">{formErrors.description}</div>}
//                                 <br />
//                                 <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
//                                     <option>Select Class</option>
//                                     {classes.map((ele) => (
//                                         <option key={ele._id} value={ele.name}>
//                                             {ele.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 {formErrors.selectedClass && <div className="error-message">{formErrors.selectedClass}</div>}
//                                 <br /><br />

//                                 <Button variant="primary" onClick={handleAddEvent}>
//                                     Submit
//                                 </Button>
//                             </Form>
//                         </div>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default AddEvents;


// using reactfull calender

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addEventCalenderAsync } from "../../action/eventsCalenderAction";
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { asynclistClass } from "../../action/classAction";
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import './addEvents.css'; // Import CSS file for styling

// function AddEvents() {
//     const dispatch = useDispatch();

//     const [eventDate, setEventDate] = useState("");
//     const [eventType, setEventType] = useState("");
//     const [description, setDescription] = useState("");
//     const [classIds, setClassIds] = useState("");
//     const [formErrors, setFormErrors] = useState({}); // State to hold form errors
//     const [events, setEvents] = useState([]); // State to hold events for FullCalendar
//     const [showForm, setShowForm] = useState(true); // State to toggle form visibility

//     useEffect(() => {
//         dispatch(asynclistClass());
//     }, []);

//     const classes = useSelector((state) => state.classes.data);

//     const validateAddEventForm = () => {
//         const errors = {};

//         if (!eventDate) {
//             errors.eventDate = "Event date is required";
//         }

//         if (!eventType) {
//             errors.eventType = "Event type is required";
//         }

//         if (!description) {
//             errors.description = "Description is required";
//         }

//         if (!classIds) {
//             errors.classIds = "Class selection is required";
//         }

//         setFormErrors(errors);
//         return errors;
//     };

//     const handleAddEvent = () => {
//         const errors = validateAddEventForm();

//         if (Object.keys(errors).length === 0) {
//             const formData = {
//                 date: eventDate,
//                 eventType: eventType,
//                 description: description,
//                 classes: classIds
//             };
//             // Dispatch action to add event to store
//             dispatch(addEventCalenderAsync(formData));
//             // Add event to FullCalendar events
//             setEvents([...events, { title: eventType, date: eventDate }]);
            
//             // Clear form fields after adding event
//             setEventDate("");
//             setEventType("");
//             setDescription("");
//             setClassIds("");
//             setFormErrors({});

//             // Hide the form after submitting
//             setShowForm(false);
//         }
//     };

//     return (
//         <div>
//             <Container fluid>
//                 <Row>
//                     <Col xs={12}>
//                         {showForm ? (
//                             <div>
//                                 <h2>Add Events</h2>
//                                 <br />
//                                 <Form>
//                                     <label>Event Date</label><br />
//                                     <input
//                                         type="date"
//                                         placeholder="Enter event date"
//                                         value={eventDate}
//                                         onChange={(e) => setEventDate(e.target.value)}
//                                     />
//                                     {formErrors.eventDate && <div className="error-message">{formErrors.eventDate}</div>}
//                                     <br />
//                                     <label>Event Type</label><br />
//                                     <input
//                                         type="text"
//                                         placeholder="Enter event type"
//                                         value={eventType}
//                                         onChange={(e) => setEventType(e.target.value)}
//                                     />
//                                     {formErrors.eventType && <div className="error-message">{formErrors.eventType}</div>}
//                                     <br />
//                                     <label>Description</label><br />
//                                     <input
//                                         type="text"
//                                         placeholder="Enter description"
//                                         value={description}
//                                         onChange={(e) => setDescription(e.target.value)}
//                                     />
//                                     {formErrors.description && <div className="error-message">{formErrors.description}</div>}
//                                     <br />
//                                     <select value={classIds} onChange={(e) => setClassIds(e.target.value)}>
//                                         <option>Select Class</option>
//                                         {classes.map((ele) => (
//                                             <option key={ele._id} value={ele._id}>
//                                                 {ele.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {formErrors.classIds && <div className="error-message">{formErrors.classIds}</div>}
//                                     <br /><br />

//                                     <Button variant="primary" onClick={handleAddEvent}>
//                                         Submit
//                                     </Button>
//                                 </Form>
//                             </div>
//                         ) : (
//                             <div>
//                                 <Button variant="primary" onClick={() => setShowForm(true)}>
//                                     Back to Form
//                                 </Button>
//                                 <br /><br />
//                                 <FullCalendar
//                                     plugins={[ dayGridPlugin ]}
//                                     initialView="dayGridMonth"
//                                     events={events}
//                                 />
//                             </div>
//                         )}
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default AddEvents;


// correct code
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEventCalenderAsync } from "../../action/eventsCalenderAction";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { asynclistClass } from "../../action/classAction";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './addEvents.css'; // Import CSS file for styling
import NavComponent from "../principleContainer/navigation/principlenavigate";

function AddEvents() {
    const dispatch = useDispatch();

    const [eventDate, setEventDate] = useState("");
    const [eventType, setEventType] = useState("");
    const [description, setDescription] = useState("");
    const [classIds, setClassIds] = useState(""); // Changed to plural form
    const [formErrors, setFormErrors] = useState({}); // State to hold form errors
    const [events, setEvents] = useState([]); // State to hold events for FullCalendar
    const [showForm, setShowForm] = useState(true); // State to toggle form visibility

    useEffect(() => {
        dispatch(asynclistClass());
    }, []);

    const classes = useSelector((state) => state.classes.data);

    const validateAddEventForm = () => {
        const errors = {};

        if (!eventDate) {
            errors.eventDate = "Event date is required";
        }

        if (!eventType) {
            errors.eventType = "Event type is required";
        }

        if (!description) {
            errors.description = "Description is required";
        }

        if (!classIds) { // Changed to plural form
            errors.classIds = "Class selection is required"; // Changed to plural form
        }

        setFormErrors(errors);
        return errors;
    };

    const handleAddEvent = () => {
        const errors = validateAddEventForm();

        if (Object.keys(errors).length === 0) {
            const formData = {
                date: eventDate,
                eventType: eventType,
                description: description,
                classIds: classIds // Changed to plural form
            };
            // Dispatch action to add event to store
            dispatch(addEventCalenderAsync(formData))
                .then(() => {
                    // Add event to FullCalendar events
                    setEvents([...events, { title: eventType, date: eventDate }]);
                    
                    // Clear form fields after adding event
                    setEventDate("");
                    setEventType("");
                    setDescription("");
                    setClassIds("");
                    setFormErrors({});
    
                    // Hide the form after submitting
                    setShowForm(false);
                })
                .catch((error) => {
                    console.error('Error adding event:', error);
                    // Handle error here
                });
        }
    };

    return (
        <div>
            <Container fluid>
                <Row>
                <Col xs={12} md={2}>
                        <div>
                            <NavComponent />
                        </div>
                    </Col>
                    {/* <Col xs={12} md={5}>
                        <div className="addeventimage"></div>
                    </Col> */}
                    <Col xs={12} md={5}>
                        {showForm ? (
                            <div>
                                <h2 style={{color:'brown'}}>Add Events</h2>
                                <br />
                                <Form>
                                    <label>Event Date</label><br />
                                    <input
                                        type="date" style={{color:'Gray'}}
                                        placeholder="Enter event date"
                                        value= {eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                    />
                                    {formErrors.eventDate && <div className="error-message">{formErrors.eventDate}</div>}
                                    <br />
                                    <label>Event Type</label><br />
                                    <input
                                        type="text"
                                        placeholder="Enter event type"
                                        value={eventType}
                                        onChange={(e) => setEventType(e.target.value)}
                                    />
                                    {formErrors.eventType && <div className="error-message">{formErrors.eventType}</div>}
                                    <br />
                                    <label>Description</label><br />
                                    <input
                                        type="text"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    {formErrors.description && <div className="error-message">{formErrors.description}</div>}
                                    <br />
                                    <select value={classIds} onChange={(e) => setClassIds(e.target.value)}> {/* Changed to plural form */}
                                        <option>Select Class</option>
                                        {classes.map((ele) => (
                                            <option key={ele._id} value={ele._id}> {/* Changed to plural form */}
                                                {ele.name}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.classIds && <div className="error-message">{formErrors.classIds}</div>} {/* Changed to plural form */}
                                    <br /><br />

                                    <Button variant="primary" onClick={handleAddEvent}>
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        ) : (
                            <div>
                                <Button variant="primary" onClick={() => setShowForm(true)}>
                                    Back to Form
                                </Button>
                                <br /><br />
                                <FullCalendar
                                    plugins={[ dayGridPlugin ]}
                                    initialView="dayGridMonth"
                                    events={events}
                                />
                            </div>
                        )}
                    </Col>
                    <Col xs={12} md={5}>
                        <div className="addeventimage"></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AddEvents;
