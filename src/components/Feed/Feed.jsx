import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import OrderList from './OrderList';

function Completed({text, number}) {
  return (
    <div className={styles.completed}>
      <p className="text text_type_main-medium">
        {text}
      </p>
      <p className={`${styles.glow} text text_type_digits-large`}>
        {number}
      </p>
    </div>
  )
}

function Feed({path}) {
  return (
    <div className={styles.content}>
      <div className={styles.leftBlock}>
        <p className={'text text_type_main-large pt-10 pb-5'}>Лента заказов</p>
        <OrderList path={path}/>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.ordersBoard}>
          <div className={`${styles.ordersList} mr-9`}>
            <p className="text text_type_main-medium pb-6">
              Готовы:
            </p>
            <div style={{color: '#00CCCC'}}>
              <p className="text text_type_digits-default pb-2">
                034533
              </p>
              <p className="text text_type_digits-default pb-2">
                034532
              </p>
              <p className="text text_type_digits-default pb-2">
                034531
              </p>
              <p className="text text_type_digits-default pb-2">
                034530
              </p>
              <p className="text text_type_digits-default pb-2">
                034525
              </p>
            </div>
          </div>
          <div className={styles.ordersList}>
            <p className="text text_type_main-medium pb-6">
              В работе:
            </p>
            <p className="text text_type_digits-default pb-2">
              034538
            </p>
            <p className="text text_type_digits-default pb-2">
              034537
            </p>
            <p className="text text_type_digits-default pb-2">
              034536
            </p>
          </div>
        </div>
        <Completed text={'Выполнено за всё время:'} number={28752}/>
        <Completed text={'Выполнено за сегодня:'} number={53}/>
      </div>
    </div>
  )
}

export default Feed;