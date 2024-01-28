import moment from 'moment'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startSaveNote, startUploading } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active } = useSelector( state => state.notes );
  const [ formValues, handleInputChange ] = useForm( active );

  const { date } = formValues;


 
  useEffect(() => {
      dispatch( activeNote( formValues.id, { ...formValues } ) );
  }, [ formValues, dispatch ]);





  const handleSave = () => {
      dispatch( startSaveNote( active ) );
  }

  const handlePictureClick = () => {
        const fileInput = document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch( startUploading( file ) );
        }
  }

  const noteDate = moment( active.date ).locale('es-mx').format('LLLL');
//   const diaDate = moment( active.date ).locale('es-mx').format('DD');
//   const mesDate = moment( active.date ).locale('es-mx').format('MM');
//   const añoDate = moment( active.date ).locale('es-mx').format('YYYY');
//   const noteDate = añoDate + '-' + mesDate + '-' + diaDate ;

  return (
    <div className='notes__appbar'>
        <div>
            <i className='fa fa-calendar-alt'></i> 
            <input 
              type='date'
              className='notes__date-input center'
              name='date'
              required
              value={ noteDate }
              onChange={ handleInputChange }
            />
            &nbsp;
            <span>{ noteDate }</span>
        </div>
        <input
            id='fileSelector'
            type='file'
            name='file'
            style={{ display: 'none' }}
            onChange={ handleFileChange }
        /> 

        <div>
            <button 
                className='btn'
                onClick={ handlePictureClick }
            >
                <i className='fa fa-image'></i>  Imagen
            </button>

            <button 
                className='btn'
                onClick={ handleSave }    
            >
                <i className='fa fa-save'></i> Guardar
            </button>

        </div>
    </div>
  )
}
