import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPass.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../services/types/hooks';
import { getUserData, sendResetPassCode, updateAccToken } from '../../services/actions/user';


const ForgotPass = () => {

  const dispatch = useDispatch();
  
  const userData = useSelector(state => state.user);
  const [valueEmail, setValueEmail] = useState('');

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

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    dispatch(sendResetPassCode(valueEmail));
  }

  if (userData.refreshToken || localStorage.refreshToken) return (<Redirect to="/" />)

  if (userData.resetPass) return (<Redirect to="/reset-password" />)

  return (
    <div className={`${styles.content}`}>
      <p className="text text_type_main-medium">
        Восстановление пароля
      </p>
      <form action='' onSubmit={handleSubmit} id='form'>
        <div className='pt-6 pb-6'>
          <Input 
            type={'email'}
            placeholder={'Укажите e-mail'}
            value={valueEmail}
            onChange={e => setValueEmail(e.target.value)}
          />
        </div>
        <div className={styles.innerContent}>
          <Button type="primary" size="medium"> 
            Войти
          </Button>
        </div>
      </form>
      <p className="text text_type_main-small text_color_inactive pt-20">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </div>
  )
}

export default ForgotPass;