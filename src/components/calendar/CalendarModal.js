import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'; 

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); //fecha actual 3:45:50
const endPlus1 = now.clone().add(1, 'hours'); //fecha fin



const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: endPlus1.toDate()
}

export const CalendarModal = () => {

  const dispatch = useDispatch();
  const { modalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);


  const [ dateStart, setDateStart ] = useState(now.toDate() );
  const [ dateEnd, setDateEnd ] = useState( endPlus1.toDate() );
  const [titleValid, setTitleValid] = useState( true )

  const [formValues, setFormValues] = useState( initEvent );

  const { title, notes, start, end } = formValues;


  useEffect(() => {
    if ( activeEvent ) {
      setFormValues(activeEvent );      
    }else {
      setFormValues( initEvent );
    }
    
  }, [ activeEvent, setFormValues ])


  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [ target.name ]: target.value
    });
  }


    const closeModal = () => {
      dispatch( uiCloseModal() );
      dispatch( eventClearActiveEvent() );
      setFormValues( initEvent );
    }
  //manejo de fecha de inicio
    const handleStartDateChange = (e) => {
        setDateStart( e );
        setFormValues({
          ...formValues,
          start: e
        })
    }

    //manejo de fecha de finalizacion
    const handleEndDateChange = ( e ) => {
      setDateEnd( e );
      setFormValues({
        ...formValues,
        end: e        
      })
    }

    //Aqui guardo los datos del formulario
    const handleSubmitForm = ( e ) => {
      e.preventDefault();
      // console.log( formValues );

      const momentStart = moment( start );
      const momentEnd = moment( end );

      if ( momentStart.isSameOrAfter( momentEnd ) ) {
        return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');           
      }

      if ( title.trim().length < 2 ) {
        return setTitleValid( false )
      }

      // condicion para actualizar el evento
      if ( activeEvent ) {
        dispatch( eventUpdated( formValues ) );        
      }else {

        //TODO Realizar grabacion en base de datos
        dispatch( eventAddNew({
          ...formValues,
          id: new Date().getTime(), //solo para generar Id temporal
          user:{
            _id: '123',
            name: 'Carolina'
          }
                 
        }));
      }

      
      setTitleValid( true );
      closeModal();

    }

    return (
        <Modal
          isOpen={ modalOpen }
          onRequestClose={ closeModal }
          style={customStyles}
          closeTimeoutMS={ 200 }
          className="modal"
          overlayClassName="modal-fondo"
        >
           <h1> { (activeEvent)? 'Editar evento': 'Nuevo evento'} </h1>
          <hr />
          <form 
            className="container"
            onSubmit={ handleSubmitForm }
          >
            

              <div className="form-group">
                  <label>Fecha y hora inicio</label>
                  <DateTimePicker
                    onChange={ handleStartDateChange }
                    value={ dateStart }
                    className="form-control"
                  />
              </div>

              <div className="form-group">
                  <label>Fecha y hora fin</label>
                  <DateTimePicker
                    onChange={ handleEndDateChange }
                    value={ dateEnd }
                    minDate={ dateStart }
                    className="form-control"
                  />
              </div>

              <hr />
              <div className="form-group">
                  <label>Titulo y notas</label>
                  <input 
                      type="text" 
                      className={ `form-control ${ !titleValid && 'is-invalid' }` }
                      placeholder="Título del evento"
                      name="title"
                      value={ title }
                      onChange={ handleInputChange }
                      autoComplete="off"
                  />
                  <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
              </div>

              <div className="form-group">
                  <textarea 
                      type="text" 
                      className="form-control"
                      placeholder="Notas"
                      rows="5"
                      name="notes"
                      value={ notes }
                      onChange={ handleInputChange }
                  ></textarea>
                  <small id="emailHelp" className="form-text text-muted">Información adicional</small>
              </div>

              <button
                  type="submit"
                  className="btn btn-outline-primary btn-block"
              >
                  <i className="far fa-save"></i>
                  <span> Guardar</span>
              </button>

          </form>
        </Modal>
    )
}
