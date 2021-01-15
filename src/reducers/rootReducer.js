import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";

import { uiReducer } from './uiReducer';


//combinacion de todos mis reducer
export const rootReducer = combineReducers({
     ui: uiReducer,
     calendar: calendarReducer,
     //TODO CalendarReducer
})