import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const eventStartAddNew = ( event ) => {
    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            console.log(body)

            if ( body.ok ) {

                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name,
                }   
                console.log( event );    
                dispatch( eventAddNew( event ))
            }
            
        } catch (error) {
            console.log(error);
        }
       
    }
}


const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event,
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventUpdated = (event) =>( {
    type: types.eventUpdated,
    payload: event
     
});

export const eventDelated = ( ) => ({
    type: types.eventDelated
});

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {

            const resp = await fetchConToken( 'events' );
            const body = await resp.json();

            const events = prepareEvents( body.eventos);

            dispatch( eventLoaded( events ) );


        } catch (error) {
            console.log(error)
        }



    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})