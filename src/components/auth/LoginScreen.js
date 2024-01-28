import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux'
import { startLoginEmailPassword, startGoogleLogin, startFacebookLogin } from '../../actions/auth';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector( state => state.ui );

  const [ formValues, handleInputChange ] = useForm({
    email: 'admin@gmail.com',
    password: '123456'
  });

  const { email, password } = formValues;
  

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch( startLoginEmailPassword( email,password ) );
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    dispatch( startGoogleLogin() );
  }

  const handleFacebookLogin = (e) => {
    e.preventDefault();
    dispatch( startFacebookLogin() );
  }

  return (
    <>
        <div className='naranja center'>
            <i className='far fa-calendar fa-5x'></i>        
            
        </div>

        <br/>

        <h3 className='auth__title center'>Ingresar</h3>

        <form 
            onSubmit={ handleLogin }
            className='animate__animated animate__fadeIn animate__faster'
        >

          <input 
            type="text" 
            placeholder="Correo Electrónico" 
            name="email" 
            className='auth__input' 
            autoComplete='off'
            value={email}
            onChange={ handleInputChange }
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            name="password"  
            className='auth__input'
            value={password}
            onChange={ handleInputChange }
          />
          <button 
            type='submit' 
            className='btn btn-primary btn-block'
            disabled={ loading }
            >
              Ingresar
          </button>

          <div className='auth__social-networks'>
            <p>Ingresar con redes sociales</p>
            <div 
                className="google-btn"
                onClick={ handleGoogleLogin }
            >
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
                </div>
                <p className="btn-text">
                    <b>Ingresar con Google</b>
                </p>
            </div>
            <div 
                className="facebbok-btn"
                onClick={ handleFacebookLogin }
            >
                <div className="facebbok-icon-wrapper">
                    <img className="facebbok-icon" src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" />
                </div>
                <p className="btn-text">
                    <b>Ingresar con Facebook</b>
                </p>
            </div>
          </div>

          <Link to='/auth/register' className='link'>
              Registrar nuevo usuario
          </Link>
        </form>
    </>
  )
}
