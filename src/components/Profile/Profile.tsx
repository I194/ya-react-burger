import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Link, NavLink, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Profile.module.css';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { CHANGE_USER_EMAIL, CHANGE_USER_NAME, CHANGE_USER_PASS, deleteUserData, getUserData, updateAccToken } from '../../services/actions/user';
import { updateUser } from '../../utils/burger-api';
import OrderList from '../Feed/OrderList';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/actions/shop';
import { INavItem, IProfile } from '../../services/types/components';

const NavItem: FunctionComponent<INavItem> = ({linkTo, exact, onClick, children}) => {
  return (
    <NavLink to={linkTo} className={`${styles.navigationLink}`} activeClassName={styles.chosen} exact={exact} onClick={onClick}>
      <div className={`${styles.menuItem}`}>
        <p className={`text text_type_main-medium ${styles.name}`}>
          {children}
        </p>
      </div>
    </NavLink>
  )
}

const Profile: FunctionComponent<IProfile> = ({path}) => {

  const dispatch = useDispatch();
  const location = useLocation();

  const messages = useSelector(state => state.shop.messages);
  const ordersData = messages.length ? messages[0] : [];
  
  const userData = useSelector(state => state.user);
  
  const isTokenExpired = () => {
    if (!localStorage.initTime) return true; // there is no token at all...
    const tokenDieTime = Number(localStorage.initTime) + 1200;
    const currentTime = Date.now() / 1000;
    return currentTime > tokenDieTime;
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

  useEffect(() => {
    const token = localStorage.accessToken ? `?token=${localStorage.accessToken.split(' ')[1]}` : ''
    const wsUrlUserOrders = `wss://norma.nomoreparties.space/orders${token}`;
    dispatch({ type: WS_CONNECTION_START, wsUrl: wsUrlUserOrders });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    }
  }, [dispatch]);  

  const [activePage, setActivePage] = useState('profile')

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    updateUser(userData.user)
  }

  if (!localStorage.refreshToken) return (<Redirect to='/login' />);
  console.log(ordersData, messages)
  return (
    <div className={`${styles.content}`}>
      <div className={styles.leftBlock}>
        <div className={styles.menu}>
          <NavItem exact={true} linkTo={'/profile'}>
            Профиль
          </NavItem>
          <NavItem exact={false} linkTo={'/profile/orders'}>
            История заказов
          </NavItem>
          <Link to={'#'} onClick={() => {setActivePage('exit'); dispatch(deleteUserData(localStorage.refreshToken));}}>
            <div className={`${styles.menuItem}`}>
              <p className={`text text_type_main-medium ${activePage === 'exit' ? '' : 'text_color_inactive'}`}>
                Выход
              </p>
            </div>
          </Link>
        </div>
        <div className='pt-20'>
          {
            location.pathname === '/profile' 
              ? 
              <p className="text text_type_main-default text_color_inactive">
                В этом разделе вы можете изменить свои персональные данные
              </p>
              :
              <p className="text text_type_main-default text_color_inactive">
                В этом разделе вы можете посмотреть свою историю заказов
              </p>
          }
        </div>
      </div>
      <div className={styles.rightBlock}>
        <Switch>
          <Route path={`${path}`} exact>
            <form action='' onSubmit={handleSubmit} className={`${styles.innerContent}`} id='form'>
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
                <Button type="primary" size="medium"> 
                  Сохранить
                </Button>
              </div>
            </form>
            <div className={styles.cancelButton}>
              <Button type='secondary' size='medium' onClick={() => getUser()}>
                Отмена
              </Button>
            </div>
          </Route>
          <Route path={`${path}/orders`}>
            <OrderList path={`${path}/orders`} orders={ordersData.orders}/>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Profile;