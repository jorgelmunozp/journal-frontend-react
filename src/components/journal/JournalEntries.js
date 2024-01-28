import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

  const { notes } = useSelector( state => state.notes );

  const notesArray = Object.values(notes);      //Pasa notas de objeto a array

  return (
    <div className='journal__entries'>
        
        {
            notesArray.map( note => (

                <JournalEntry 
                    key={ note.id }
                    id={ note.id }
                    date={ note.date }
                    title={ note.title }
                    body={ note.body }
                    url={ note.url }
                    { ...notesArray }
                />
            ))
        }

    </div>
  )
}
