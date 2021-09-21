import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_USER_EMAIL, CHANGE_USER_NAME, CHANGE_USER_PASS, deleteUserData, getUserData, updateAccToken } from '../../services/actions/user';
import { updateUser } from '../../utils/burger-api';


function Profile() {

  const dispatch = useDispatch();
  
  const userData = useSelector(state => state.user);
  
  const isTokenExpired = () => {
    if (!localStorage.initTime) return true; // there is no token at all...
    return (Date.now() / 1000) > (Number(localStorage.initTime) + 1200);
  }

  const getUser = useCallback(() => {
    if (isTokenExpired()) dispatch(updateAccToken());
    dispatch(getUserData());
  }, [dispatch])

  useEffect(() => {
    if (!userData.user.name && localStorage.length !== 0) {
      getUser();
    }
  }, [userData, getUser])

  const [activePage, setActivePage] = useState('profile')

  if (!localStorage.refreshToken) return (<Redirect to='/login' />);

  return (
    <div className={`${styles.content}`}>
      <div className={styles.leftBlock}>
        <div className={styles.menu}>
          <Link to={'/profile'} onClick={() => {setActivePage('profile')}}>
            <div className={`${styles.menuItem}`}>
              <p className={`text text_type_main-medium ${activePage === 'profile' ? '' : 'text_color_inactive'}`}>
                Профиль
              </p>
            </div>
          </Link>
          <Link to={'/profile/orders'} onClick={() => {setActivePage('orders')}}>
            <div className={`${styles.menuItem}`}>
              <p className={`text text_type_main-medium ${activePage === 'orders' ? '' : 'text_color_inactive'}`}>
                История заказов
              </p>
            </div>
          </Link>
          <Link to={'#'} onClick={() => {setActivePage('exit'); dispatch(deleteUserData(localStorage.refreshToken));}}>
            <div className={`${styles.menuItem}`}>
              <p className={`text text_type_main-medium ${activePage === 'exit' ? '' : 'text_color_inactive'}`}>
                Выход
              </p>
            </div>
          </Link>
        </div>
        <div className='pt-20'>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.longInput}>
          <Input 
            type={'text'} 
            placeholder={'Имя'}
            icon={'EditIcon'}
            size={'default'}
            value={userData.user.name}
            onChange={e => dispatch({type: CHANGE_USER_NAME, name: e.target.value})}
          />
        </div>
        <div className={`${styles.longInput} pb-6 pt-6`}>
          <Input 
            type={'text'} 
            placeholder={'Логин'}
            icon={'EditIcon'}
            value={userData.user.email}
            onChange={e => dispatch({type: CHANGE_USER_EMAIL, email: e.target.value})}
          />
        </div>
        <div className={styles.longInput}>
          <Input 
            type={'password'} 
            placeholder={'Пароль'}
            icon={'EditIcon'}
            value={userData.user.password}
            onChange={e => dispatch({type: CHANGE_USER_PASS, password: e.target.value})}
          />
        </div>
        <div className={styles.saveButton}>
          <Button type='secondary' size='medium' onClick={() => getUser()}>
            Отмена
          </Button>
          <Button type='primary' size='medium' onClick={() => updateUser(userData.user)}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile;