import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Register.module.css';
import { addNewUser, getUserData, updateAccToken } from '../../services/actions/user';
import { useSelector, useDispatch } from '../../services/types/hooks';

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

  const [passParams, setPassParams] = useState<{type: 'text' | 'password', icon: 'ShowIcon' | 'HideIcon'}>({type: 'password', icon: 'ShowIcon'})

  const [valueName, setValueName] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePass, setValuePass] = useState('');

  const handleIconClick = () => {
    setPassParams({
      type: passParams.type === 'password' ? 'text' : 'password',
      icon: passParams.icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon'
    })
  }

  function handleSubmit(event: { preventDefault: () => void; }) {
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
        <div className={styles.innerContent}>
          <Button type="primary" size="medium"> 
            Войти
          </Button>
        </div>
      </form>
      <p className="text text_type_main-small text_color_inactive pt-20">
        Уже зарегистрированы? <Link to="./login">Войти</Link>
      </p>
    </div>
  )
}

export default Register;