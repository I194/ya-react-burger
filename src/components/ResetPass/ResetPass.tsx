import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPass.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, setNewPass, updateAccToken } from '../../services/actions/user';


function ResetPass() {

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
  const [valuePass, setValuePass] = useState('');
  const [valueCode, setValueCode] = useState('');

  const handleIconClick = () => {
    setPassParams({
      type: passParams.type === 'password' ? 'text' : 'password',
      icon: passParams.icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon'
    })
  }

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    dispatch(setNewPass(valuePass, valueCode));
  }

  if (userData.refreshToken || localStorage.refreshToken || !userData.resetPass) return (<Redirect to="/" />)

  return (
    <div className={`${styles.content}`}>
      <p className="text text_type_main-medium">
        Восстановление пароля
      </p>
      <form action='' onSubmit={handleSubmit} id='form'>
        <div className='pt-6'>
          <Input 
            type={passParams.type} 
            placeholder={'Введите новый пароль'} 
            icon={passParams.icon} 
            onIconClick={handleIconClick}
            value={valuePass}
            onChange={e => setValuePass(e.target.value)}
          />
        </div>
        <div className='pt-6 pb-6'>
          <Input 
            type={'text'} 
            placeholder={'Введите код из письма'} 
            name={'name'}
            value={valueCode}
            onChange={e => setValueCode(e.target.value)}
          />
        </div>
      </form>
      <Button type="primary" size="medium" form='form'>
        Сохранить
      </Button>
      <p className="text text_type_main-small text_color_inactive pt-20">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </div>
  )
}

export default ResetPass;