// app-header.js

import React from 'react';
import ReactDOM from 'react-dom';
import {ListIcon, Logo, BurgerIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

function NavItem(props) {
  return (
    <div className={`${styles.navigationLink} ${props.color}`}>
      <div className={`${styles.icon24}`}>
        {props.icon}
      </div> 
      <p className={`${styles.name}`}>
        {props.children}
      </p>
    </div>
  )
}

function AppHeader() {
  return (
    <header className={`${styles.navigationPanel} text text_type_main-default`}>
      <div className={`${styles.content}`}>
        <div className={`${styles.navigation}`}>
          <div className={`${styles.navGroup}`}>
            <NavItem icon={<BurgerIcon type="primary" />}>Конструктор</NavItem>
            <NavItem icon={<ListIcon type="secondary" />} color={'text_color_inactive'}>Лента заказов</NavItem>
          </div>
          <div className={`${styles.logo}`}>
            <Logo />
          </div>
          <NavItem icon={<ProfileIcon type="secondary" />} color={'text_color_inactive'}  left={'80vw'}>Личный кабинет</NavItem>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;