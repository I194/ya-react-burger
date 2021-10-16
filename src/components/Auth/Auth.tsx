import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Auth.module.css';
import { addTokens, getUserData, updateAccToken } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';


function Auth() {

  const dispatch = useDispatch();
  const redirectState = useLocation<{from: string}>().state;
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

  const [valueEmail, setValueEmail] = useState('');
  const [valuePass, setValuePass] = useState('');

  const handleIconClick = () => {
    setPassParams({
      type: passParams.type === 'password' ? 'text' : 'password',
      icon: passParams.icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon'
    })
  }

  function handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    dispatch(addTokens(valueEmail, valuePass));
  }
  
  if (userData.refreshToken || localStorage.refreshToken) return (<Redirect to={ redirectState ? redirectState.from : '/' } />)
  
  return (
    <div className={`${styles.content}`}>
      <p className="text text_type_main-medium">
        Вход
      </p>
      <form action='' onSubmit={handleSubmit} id='form'>
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
      <Button type="primary" size="medium" onsubmit={handleSubmit}>
        Войти
      </Button>
      <p className="text text_type_main-small text_color_inactive pt-20">
        Вы - новый пользователь? <Link to="./register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-small text_color_inactive pt-4">
        Забыли пароль? <Link to="./forgot-password">Восстановить пароль</Link>
      </p>
    </div>
  )
}

export default Auth;