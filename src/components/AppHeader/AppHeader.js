import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import {ListIcon, Logo, BurgerIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

function NavItem(props) {
  return (
    <NavLink to={props.linkTo} className={`${styles.navigationLink}`} activeClassName={styles.chosen} exact={props.exact} onClick={props.onClick}>
      <div className={`${styles.icon24} `}>
        {props.icon}
      </div> 
      <p className={`${styles.name}`}>
        {props.children}
      </p>
    </NavLink>
  )
}

NavItem.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string.isRequired
}

function AppHeader() {
  // const [activePage, setActivePage] = useState('constructor')

  return (
    <header className={`${styles.navigationPanel} text text_type_main-default`}>
      <div className={`${styles.content}`}>
        <div className={`${styles.navigation}`}>
          <div className={`${styles.navGroup}`}>
            <NavItem 
              icon={<BurgerIcon />}
              exact={true}
              linkTo={'/'}
            >
              Конструктор
            </NavItem>
            <NavItem 
              icon={<ListIcon />}
              exact={false}
              linkTo={'/profile/orders'}
            >
              Лента заказов
            </NavItem>
          </div>
          <div className={`${styles.logo}`}>
            <Logo />
          </div>
          <NavItem 
            icon={<ProfileIcon />} 
            exact={true}
            left={'80vw'}
            linkTo={'/profile'}
          >
            Личный кабинет
          </NavItem>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;