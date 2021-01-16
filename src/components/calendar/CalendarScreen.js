import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { messages } from '../../helpers/calendar-messages';
import { CalendarModal } from './CalendarModal';
import { AddNewFab } from '../ui/AddNewFab';

import { uiOpenMOdal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    //TODO: Leer del store, los eventos 
    const { events } = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState( localStorage.getItem('lastview') || 'month' );

    const onDoubleClick = (e) => {
        // console.log(e);
        dispatch( uiOpenMOdal() );
    }
    
    const onSelectEvent = (e) => {
        // console.log(e);
        dispatch( eventSetActive(e) );
    }
    
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastview', e);
    
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        // console.log( event, start, end, isSelected );

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color:'white'
        }

        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab/>
            <CalendarModal/>

        </div>
    )
}
