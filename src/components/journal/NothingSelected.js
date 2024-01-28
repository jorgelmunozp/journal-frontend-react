import { useDispatch } from 'react-redux';
import { startNewNote } from '../../actions/notes';


export const NothingSelected = () => {

  const dispatch = useDispatch();
  
  const handleAddNew = () => {
    dispatch( startNewNote() );
  }

  return (
    <div className='nothing__main-content'>
        <p>
            Selecciona una entrada
            <br />
            o crea una nueva
        </p>

        <div 
            className='journal__new-entry'
            onClick={ handleAddNew }
        >
            <i className='far fa-calendar-plus fa-5x'></i>
            <p className='mt-5'>
                Nueva nota
                </p>
        </div>
    </div>
  )
}
