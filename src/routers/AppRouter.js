import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";

import { AuthRouter } from './AuthRouter';
import { DashboardRoutes } from "./DashboardRoutes";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    firebase.auth().onAuthStateChanged( async(user) => {
      
      if( user?.uid ){
        dispatch( login( user.uid, user.displayName ) );
        setIsLoggedIn( true );
        dispatch( startLoadingNotes( user.uid ) );

      } else {
        setIsLoggedIn( false );
      }

      setChecking( false );

    });

  }, [ dispatch,setChecking, setIsLoggedIn ]);
  
  if( checking ){
    return (
      <h1>Espere...</h1>
    )
  }

  return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="/auth/*" isAuthenticated={ isLoggedIn } element={
                    <PublicRoute isLoggedIn={ isLoggedIn } >
                        <AuthRouter />
                    </PublicRoute>
                  } 
                />

                <Route exact path="/" isAuthenticated={ isLoggedIn } element={
                    <PrivateRoute isLoggedIn={ isLoggedIn }>
                        <DashboardRoutes />
                    </PrivateRoute>
                  } 
                />

                <Route 
                    path="/*" 
                    element={ <Navigate to="/auth/login" replace /> } 
                />
            </Routes>
        </div>
    </BrowserRouter>
  )
}
