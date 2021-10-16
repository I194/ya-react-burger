import React, { FunctionComponent, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import {ListIcon, Logo, BurgerIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import { INavItem } from '../../services/types/components';

const NavItem: FunctionComponent<INavItem> = ({icon, exact, linkTo, children}) => {
  return (
    <NavLink to={linkTo} className={`${styles.navigationLink}`} activeClassName={styles.chosen} exact={exact}>
      <div className={`${styles.icon24} `}>
        {icon}
      </div> 
      <p className={`${styles.name}`}>
        {children}
      </p>
    </NavLink>
  )
}

function AppHeader() {
  return (
    <header className={`${styles.navigationPanel} text text_type_main-default`}>
      <div className={`${styles.content}`}>
        <div className={`${styles.navigation}`}>
          <div className={`${styles.navGroup}`}>
            <NavItem 
              icon={<BurgerIcon type={'secondary'} />}
              exact={true}
              linkTo={'/'}
            >
              Конструктор
            </NavItem>
            <NavItem 
              icon={<ListIcon type={'secondary'} />}
              exact={false}
              linkTo={'/feed'}
            >
              Лента заказов
            </NavItem>
          </div>
          <Link to={'/'} className={`${styles.logo}`}>
            <Logo />
          </Link>
          <NavItem 
            icon={<ProfileIcon type={'secondary'} />} 
            linkTo={'/profile'}
            exact={false}
          >
            Личный кабинет
          </NavItem>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;