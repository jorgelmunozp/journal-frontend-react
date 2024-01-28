import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux'
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector( state => state.ui );

  const [ formValues, handleInputChange ] = useForm({
    name: 'Jorge',
    email: 'jlm@gmail.com',
    password: '123456',
    password2: '123456'
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if( isFormValid() ) {
      dispatch( startRegisterWithEmailPasswordName( email, password, name ) );
    }
  }

  const isFormValid = () => {
    if( name.trim().length === 0 ) {
      dispatch( setError('El nombre es obligatorio') );
      return false;
    } else if( !validator.isEmail( email ) ) {
      dispatch( setError('El email no es válido') );
      return false;
    } else if( password.trim().length === 0 ) {
      dispatch( setError('La contraseña es obligatoria') );
      return false;
    } else if( password.trim().length < 6 ) {
      dispatch( setError('La contraseña debe tener al menos 6 caracteres') );
      return false;
    } else if( password !== password2 ) {
      dispatch( setError('Las contraseñas no coinciden') );
      return false;
    }
    dispatch( removeError() );
    return true;
  }

  return (
    <>
        <div className='naranja center'>
          <i className='far fa-calendar fa-5x'></i>        
        </div>

        <br/>

        <h3 className='auth__title center'>Registrarse</h3>

        <form 
            onSubmit={ handleRegister }
            className='animate__animated animate__fadeIn animate__faster'
        >
            {
              msgError &&
              (
                <div className='auth__alert-error'>
                  { msgError }
                </div>
              )
            }

            <input 
              type="text" 
              placeholder="Nombre" 
              name="name" 
              className='auth__input' 
              autoComplete='off'
              value={ name }
              onChange={ handleInputChange }
            />
            <input 
              type="text" 
              placeholder="Correo Electrónico" 
              name="email" 
              className='auth__input' 
              autoComplete='off'
              value={ email }
              onChange={ handleInputChange }
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              name="password"  
              className='auth__input' 
              autoComplete='off'
              value={ password }
              onChange={ handleInputChange }
            />
            <input
              type="password" 
              placeholder="Confirmar contraseña" 
              name="password2"  
              className='auth__input' 
              autoComplete='off'
              value={ password2 }
              onChange={ handleInputChange }
            />
            <button type='submit' className='btn btn-primary btn-block mb-5'>Registrar</button>

            <Link to='/auth/login' className='link'>
                Ya estás registrado?
            </Link>
        </form>
</>
  )
}
