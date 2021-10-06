import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Feed.module.css';
import { useDispatch, useSelector } from 'react-redux';

function Price({children}) {
  return (
    <div className={`${styles.price}`}>
      <p className="text text_type_digits-default mr-2">{children}</p>
      <CurrencyIcon type="primary"/>
    </div>
  )
}

function OrderIdTime({_id, time}) {
  return (
    <div className={styles.orderId}>
      <p className="text text_type_digits-defaultn">{_id}</p>
      <p className="text text_type_main-default text_color_inactive">{time}</p>
    </div>
  )
}

function OrderIngredients({ingredients}) {
  return (
    <div className={styles.orderId}>
      <div className={styles.ingredients}>
        <div className={styles.ingredientPreview} style={{left: '0px', zIndex: '100'}}>
          <img className={styles.ingredientImage} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="Флюоресцентная булка R2-D3 (верх)" />
        </div>
        <div className={styles.ingredientPreview} style={{left: '-24px', zIndex: '99'}}>
          <img className={styles.ingredientImage} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="Флюоресцентная булка R2-D3 (верх)" />
        </div>
      </div>
      <Price>480</Price>
    </div>
  )
}

function CardOrder({path, _id}) {
  return (
    <Link to={{
      pathname: `${path}/${_id}`,
    }}>
      <div className={styles.cardOrder}>
        <OrderIdTime _id={`#${_id}`} time={'Сегодня, 16:20 i-GMT+3'}/>
        <p className="text text_type_main-medium pr-6 pl-6">Death Star Starship Main бургер</p>
        <OrderIngredients />
      </div>
    </Link>
  )
}

export default function OrderList({path}) {
  
  return (
    <div className={styles.orders}>
      <CardOrder path={path} _id={`03435`}/>
      <CardOrder path={path} _id={`03435`}/>
      <CardOrder path={path} _id={`03435`}/>
      <CardOrder path={path} _id={`03435`}/>
    </div>
  )
}