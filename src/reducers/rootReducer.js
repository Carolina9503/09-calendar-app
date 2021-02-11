import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";

import { uiReducer } from './uiReducer';


//combinacion de todos mis reducer
export const rootReducer = combineReducers({
     ui: uiReducer,
     calendar: calendarReducer,
     auth: authReducer, //autenticación
})