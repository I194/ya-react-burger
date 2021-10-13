import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/shop';
import data from '../../utils/data';

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
      <p className="text text_type_main-small" style={{maxWidth: '258px'}}>{_id}</p>
      <p className="text text_type_main-default text_color_inactive">{time}</p>
    </div>
  )
}

function OrderIngredients({ingredientsId}) {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.shop.ingredients);

  let price = 0;
  
  useEffect(() => {
    if (!ingredients.length) dispatch(getItems());
    },
    [dispatch, ingredients]
  );  

  const dataToIngredientPreview = (ingredientId, index) => {
    const ingredient = ingredients.filter(ingr => ingr._id === ingredientId)[0];
    const widthRegulator = ingredientsId.length > 6 ? ingredientsId.length * Math.floor(ingredientsId.length / 5) : 0;
    price += ingredient.price;
    return (
      <div key={index} className={styles.ingredientPreview} style={{left: `${-(24 + widthRegulator)*index}px`, zIndex: `${100 - index}`}}>
        <img className={styles.ingredientImage} src={ingredient.image} alt={ingredient.name} />
      </div>
    )
  }

  if (!ingredients.length) return null;

  return (
    <div className={styles.orderId}>
      <div className={styles.ingredients}>
        {ingredientsId.map(dataToIngredientPreview)}
      </div>
      <Price>{price}</Price>
    </div>
  )
}

function CardOrder({path, _id, ingredients, time, name}) {
  return (
    <Link to={{
      pathname: `${path}/${_id}`,
      state: {modal: true, _id: _id}
    }}>
      <div className={styles.cardOrder}>
        <OrderIdTime _id={`#${_id}`} time={time}/>
        <p className="text text_type_main-medium pr-6 pl-6">{name}</p>
        <OrderIngredients ingredientsId={ingredients}/>
      </div>
    </Link>
  )
}

export default function OrderList({path, orders}) {
  
  const dataToOrder = (order) => {
    return (
      <CardOrder 
        path={path} 
        _id={order._id}
        ingredients={order.ingredients}
        time={order.createdAt}
        name={order.name}
        key={order._id}
      />
    )
  }

  return (
    <div className={styles.orders}>
      {orders.map(dataToOrder)}
    </div>
  )
}