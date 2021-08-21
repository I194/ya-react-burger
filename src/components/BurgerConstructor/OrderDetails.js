import React from 'react';
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

export default function OrderDetails(props) {
  return (
    <div className={`${styles.oderDetail}`}>
      <p className={`${styles.orderId} text text_type_digits-large pb-8 pt-4`}>{props.id}</p>
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

OrderDetails.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
}
