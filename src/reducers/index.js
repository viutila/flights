import { combineReducers } from "redux";
import flights from "./flightsReducer";
import addFlight from './addFlightReducer';

import { reducer as reduxFormReducer } from 'redux-form';


export default combineReducers({
    flights,
    addFlight,
    form: reduxFormReducer, // mounted under "form"
});