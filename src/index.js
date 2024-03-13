import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux"
import configureStore from './store/store';



const store = configureStore()

// console.log(store.getState())

// store.subscribe(() => {
//     console.log(store.getState(), "updated State")
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
    </Provider>
 );


