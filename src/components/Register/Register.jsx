import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { postNewUser } from '../../utils/burger-api';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Register.module.css';
import { addNewUser, getUserData, GET_USER_DATA, setUserData, updateAccToken } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';


function Register() {
  const dispatch = useDispatch();
  
  const userData = useSelector(state => state.user);

  const isTokenExpired = () => {
    if (!localStorage.initTime) return true; // there is no token at all...
    return (Date.now() / 1000) > (Number(localStorage.initTime) + 1200);
  }

  useEffect(() => {
    if (!userData.user.name && localStorage.length !== 0) {
      if (isTokenExpired()) dispatch(updateAccToken());
      dispatch(getUserData());
    }
  }, [dispatch, userData])

  const [passParams, setPassParams] = useState({type: 'password', icon: 'ShowIcon'})

  const [valueName, setValueName] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePass, setValuePass] = useState('');

  const handleIconClick = e => {
    setPassParams({
      type: passParams.type === 'password' ? 'text' : 'password',
      icon: passParams.icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon'
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addNewUser(valueEmail, valuePass, valueName));
  }
  
  if (userData.refreshToken || localStorage.refreshToken) return (<Redirect to="/" />)

  return (
    <div className={`${styles.content}`}>
      <p className="text text_type_main-medium">
        Регистрация
      </p>
      <form action='' onSubmit={handleSubmit} id='form'>
        <div className='pt-6'>
          <Input 
            type={'text'} 
            placeholder={'Имя'}
            value={valueName}
            onChange={e => setValueName(e.target.value)}
          />
        </div>
        <div className='pb-6 pt-6'>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            value={valueEmail}
            onChange={e => setValueEmail(e.target.value)}
          />
        </div>
        <div className='pb-6'>
          <Input
            type={passParams.type}
            placeholder={'Пароль'}
            icon={passParams.icon}
            onIconClick={handleIconClick}
            value={valuePass}
            onChange={e => setValuePass(e.target.value)}
          />
        </div>
      </form>
      <Button type="primary" size="medium" form='form'>
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-small text_color_inactive pt-20">
        Уже зарегистрированы? <Link to="./login">Войти</Link>
      </p>
    </div>
  )
}

export default Register;