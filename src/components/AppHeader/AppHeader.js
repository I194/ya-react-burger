// app-header.js

import React from 'react';
import ReactDOM from 'react-dom';
import {ListIcon, Logo, BurgerIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

function AppHeader() {
  return (
      <header className={`${styles.navigationPanel} text text_type_main-default`}>
        <div className={`${styles.content}`}>
          <div className={`${styles.navigation}`}>
            <div className={`${styles.navigationLink} m`} style={{marginLeft: 0}}>
              <div className={`${styles.icon24}`}><BurgerIcon type="primary" /></div> 
              <p className={`${styles.name}`}>
                Конструктор
              </p>
            </div>
            <div className={`${styles.navigationLink} text_color_inactive`} style={{marginRight: 0}}>
              <div className={`${styles.icon24}`}><ListIcon type="secondary" /> </div>
              <p className={`${styles.name}`}>
                Лента заказов
              </p>
            </div>
            <div className={`${styles.logo}`}>
              <Logo style={{marginTop: -5}}/>
            </div>
            <div className={`${styles.navigationLink} text_color_inactive`} style={{marginLeft: 'auto', marginRight: 0}}>
              <div className={`${styles.icon24}`}><ProfileIcon type="secondary" /> </div>
              <p className={`${styles.name}`}>
                Личный кабинет
              </p>
            </div>
          </div>
        </div>
      </header>
  )
}

export default AppHeader;