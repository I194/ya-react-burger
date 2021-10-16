import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, getOrdersFeed, WS_CONNECTION_START } from '../../services/actions/shop';

function Price({children}) {
  return (
    <div className={`${styles.price}`}>
      <p className="text text_type_digits-default mr-2">{children}</p>
      <CurrencyIcon type="primary"/>
    </div>
  )
}

function IngredientRow({name, count, price, image}) {
  return (
    <div className={styles.ingredientRow}>
      <div className={styles.ingredientImageName}>
        <div className={`${styles.ingredientPreview} mr-4`}>
          <img className={styles.ingredientImage} src={image} alt={name} />
        </div>
        <p className="text text_type_main-default mr-4">{name}</p>
      </div>
      <Price>{`${count} x ${price}`}</Price>
    </div>
  )
}

function OrderDetails({_id, orders}) {

  const dispatch = useDispatch();

  const allOrders = useSelector(state => state.shop.orders);
  if (!orders) orders = allOrders;
  const ingredients = useSelector(state => state.shop.ingredients);
  
  useEffect(() => {
    if (!ingredients.length) dispatch(getItems());
    },
    [dispatch, ingredients]
  );  

  useEffect(() => {
    if (!orders.length) dispatch(getOrdersFeed());
    },
    [dispatch, orders]
  );    

  if (!orders.length || !ingredients.length || !_id) return null;

  const order = orders.filter(ord => ord._id === _id)[0];

  // debugger;
  
  const nameSize = order.name.length > 84 ? 'default' : 'medium';
  const status = order.status === 'done' ? 'готов' : 'не готов';
  
  let price = 0;

  const uniqueIngredients = order.ingredients.reduce(function(occurrence, item) {
    occurrence[item] = (occurrence[item] || 0) + 1;
    return occurrence;
  }, {});
  
  const dataToIngredientRow = (ingredientId, index) => {
    const ingredient = ingredients.filter(ingr => ingr._id === ingredientId)[0];
    price += ingredient.price;
    return (
      <IngredientRow key={ingredient._id} name={ingredient.name} count={uniqueIngredients[ingredientId]} price={ingredient.price} image={ingredient.image}/>
    )
  }

  return (
    <div className={styles.orderContainer}>
      <div style={{textAlign: 'left', width: '640px'}}>
        <p className={`text text_type_main-${nameSize} pb-3`}>{order.name}</p>
        <p className="text text_type_main-default pb-15 " style={{color: '#00CCCC'}}>{status}</p>
        <p className="text text_type_main-medium pb-6">Состав:</p>
      </div>
      <div className={styles.ingredientsColumn}>
        {Object.keys(uniqueIngredients).map(dataToIngredientRow)}
      </div>
      <div className={styles.orderTimePrice}>
        <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
        <Price>{price}</Price>
      </div>
    </div>
  )
}

export default OrderDetails;