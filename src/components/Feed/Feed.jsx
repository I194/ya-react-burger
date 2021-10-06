import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Feed.module.css';
import { useDispatch, useSelector } from 'react-redux';

function OrderIdTime({_id, time}) {
  return (
    <div className={styles.orderId}>
      <p className="text text_type_digits-default">{_id}</p>
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

function CardOrder() {
  return (
    <Link to={{
      pathname: `/feed/03435`,
    }}>
      <div className={styles.cardOrder}>
        <OrderIdTime _id={`#03435`} time={'Сегодня, 16:20 i-GMT+3'}/>
        <p className="text text_type_main-medium pr-6 pl-6">Death Star Starship Main бургер</p>
        <OrderIngredients />
      </div>
    </Link>
  )
}

function Price({children}) {
  return (
    <div className={`${styles.price}`}>
      <p className="text text_type_digits-default mr-2">{children}</p>
      <CurrencyIcon type="primary"/>
    </div>
  )
}

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

function Feed() {
  return (
    <div className={styles.content}>
      <div className={styles.leftBlock}>
        <p className={'text text_type_main-large pt-10 pb-5'}>Лента заказов</p>
        <div className={styles.orders}>
          <CardOrder />
          <CardOrder />
          <CardOrder />
          <CardOrder />
        </div>
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