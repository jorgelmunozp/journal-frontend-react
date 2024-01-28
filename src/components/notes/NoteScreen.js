import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm';
import { useEffect, useRef } from 'react';
import { activeNote, startDeleting } from '../../actions/notes';
import Swal from 'sweetalert2';
import moment from 'moment'

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const { active:note } = useSelector( state => state.notes );
  const [ formValues, handleInputChange, reset ] = useForm( note );
  const { title, body } = formValues;

  const activeId = useRef( note.id );

  useEffect(() => {
    if( note.id !== activeId.current ){
      reset( note );
      activeId.current = note.id;
    }
  }, [ note, reset ]);
  
  useEffect(() => {
      dispatch( activeNote( formValues.id, { ...formValues } ) );
  }, [ formValues, dispatch ]);
  

  const handleDelete = (e) => {
      dispatch( startDeleting( formValues.id ) );
      
      Swal.fire('Nota eliminada', e.message, 'success');
  }
  
  const { active } = useSelector( state => state.notes );

  const diaDate = moment( active.date ).locale('es-mx').format('DD');
  const mesDate = moment( active.date ).locale('es-mx').format('MM');
  const añoDate = moment( active.date ).locale('es-mx').format('YYYY');
  const noteDate = añoDate + '-' + mesDate + '-' + diaDate;

  return (
    <div className='notes__main-content'>

        <NotesAppBar />

        <button
          className='btn btn-danger'
          onClick= { handleDelete }
        >
          <i className='fa fa-trash'></i> Eliminar
        </button> 

        <div className='notes__content'>
          <input 
              type='text'
              placeholder='Título de la nota'
              className='notes__title-input center'
              autoComplete='off'
              name='title'
              value={ title }
              onChange={ handleInputChange }
          />

          <textarea
              placeholder='Qué deseas recordar?'
              className='notes__textarea center'
              autoComplete='off'
              name='body'
              value={ body }
              onChange={ handleInputChange }
          ></textarea>

          <input 
              type='date'
              className='notes__date-input center'
              name='date'
              value={ noteDate }
              onChange={ handleInputChange }
          />
          

          {
              ( note.url ) &&
              ( 
                <div className='notes__image center'>
                  <img 
                    src= { note.url }
                    alt='imagen'
                  />
                </div> 
              )
          }
        </div>
    </div>
  )
}
