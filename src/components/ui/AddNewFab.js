import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenMOdal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( uiOpenMOdal() )
    }

    return (        
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
            
        </button>
    )
}
