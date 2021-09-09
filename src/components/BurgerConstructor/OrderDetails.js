import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import { getOrder } from '../../services/actions/shop';

export default function OrderDetails(props) {

  const dispatch = useDispatch();
  
  const orderData = useSelector(state => state.shop.order);
  const selectedBun = useSelector(state => state.shop.selectedBun);
  const selectedIngredients = useSelector(state => state.shop.selectedIngredients);

  const getIngredientsId = (ingredient) => {
    return ingredient.id;
  }

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrder([...selectedIngredients, selectedBun, selectedBun].map(getIngredientsId)));
    }
  }, [dispatch, orderData, selectedBun, selectedIngredients])

  if (!orderData) return null;

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

// OrderDetails.propTypes = {
//   id: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired,
// }
