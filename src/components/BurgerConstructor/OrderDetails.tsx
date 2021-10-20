import React from 'react';
import { useSelector } from '../../services/types/hooks';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

export default function OrderDetails() {
  
  const orderData = useSelector(state => state.shop.order);

  if (!orderData) return (
    <>
      <p className={`text text_type_main-medium`}>Заказ оформляется...</p>
      <div className={`${styles.doneImage}`}></div>
    </>
  );

  return (
    <div className={`${styles.oderDetail}`}>
      <p className={`${styles.orderId} text text_type_digits-large pb-8 pt-4`}>{orderData.order.number}</p>
      <p className={`text text_type_main-medium`}>идентификатор заказа</p>
      <div className={`${styles.doneImage}`}></div>
      <div className={`${styles.orderDone}`}>
        <div className={`${styles.large} pt`}>
          <CheckMarkIcon type="primary" />
        </div>
      </div>
      <p className={`text text_type_main-default pb-2`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}