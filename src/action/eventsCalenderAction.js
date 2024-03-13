
import axios from "../config/axios";

export const ADD_EVENTCALENDER = "ADD_EVENTCALENDER";
export const LIST_EVENTS = "LIST_EVENTS";
export const DELETE_EVENTS = "DELETE_EVENTS";
export const UPDATE_EVENTS = "UPDATE_EVENTS";

export const addEventCalender = (event) => ({
    type: ADD_EVENTCALENDER,
    payload: event
});

export const listEvents = (list) => ({
    type: LIST_EVENTS,
    payload: list
});

export const deleteEvents = (id) => ({
    type: DELETE_EVENTS,
    payload: id
});

export const updateEvents = (event, id) => ({
    type: UPDATE_EVENTS,
    payload: { event: event, id: id }
});

export const addEventCalenderAsync = (event) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/api/addEvent", event, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch(addEventCalender(response.data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const listEventsAsync = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/listAllEvents`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch(listEvents(response.data));
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
};

export const deleteEventsAsync = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`/api/deleteEvent/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch(deleteEvents(response.data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const updatedEventAsync = (updatedEvent, editId) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`/api/updateEvent/${editId}`, updatedEvent, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch(updateEvents(response.data, editId));
        } catch (err) {
            console.log(err);
        }
    };
};
