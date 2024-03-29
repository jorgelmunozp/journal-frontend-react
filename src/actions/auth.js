import Swal from 'sweetalert2'

import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { setError, startLoading, finishLoading } from './ui';

export const startLoginEmailPassword = ( email, password ) => {
    return (dispatch) => {

        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {                
                dispatch( 
                    login(user.uid, user.displayName) 
                );
                
                dispatch( finishLoading() );
            })
            .catch( (e) => {
                dispatch( 
                    setError(e.message),
                    finishLoading()  
                );
                Swal.fire('Error', e.message, 'error');
            } );
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                await user.updateProfile({ displayName: name });
                dispatch( 
                    login(user.uid, user.displayName)
                );
            })
            .catch( (e) => {
                dispatch( 
                    setError(e.message)
                );
                Swal.fire('Error', e.message, 'error');
            } )
    }
}

export const startGoogleLogin = ( email, password ) => {
    return (dispatch) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch( login(user.uid, user.displayName) );
            })
    }
}

export const startFacebookLogin = ( email, password ) => {
    return (dispatch) => {
        firebase.auth().signInWithPopup( facebookAuthProvider )
            .then( ({ user }) => {
                dispatch( login(user.uid, user.displayName) );
            })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return (dispatch) => {
        firebase.auth().signOut()
 
        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
});