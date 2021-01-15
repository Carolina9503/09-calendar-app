import { combineReducers } from "redux";

import { uiReducer } from './uiReducer';


//combinacion de todos mis reducer
export const rootReducer = combineReducers({
     ui: uiReducer,
     //TODO AuthReducer
     //TODO CalendarReducer
})