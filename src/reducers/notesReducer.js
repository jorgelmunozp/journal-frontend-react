import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case types.notesActive:
            return {
                ...state, 
                active: { ...action.payload }
            }
        
        case  types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }

        case types.notesLoad:
            return {
                ...state, 
                notes: { ...action.payload }
            }

        case types.notesUpdated:
            const notesArrayUpdated = Object.values(state.notes);      //Pasa notas de objeto a array
            return {
                ...state,
                notes: notesArrayUpdated.map( 
                    note => note.id === action.payload.id 
                        ? action.payload.note
                        : note 
                )
            }
            
        case types.notesDelete:
            const notesArrayDelete = Object.values(state.notes);      //Pasa notas de objeto a array
            return {
                ...state,
                active: null,
                notes: notesArrayDelete.filter( note => note.id !== action.payload )
            } 

        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }

}