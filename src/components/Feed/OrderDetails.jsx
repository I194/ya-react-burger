import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
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

function IngredientRow({name, count, price}) {
  return (
    <div className={styles.ingredientRow}>
      <div className={styles.ingredientImageName}>
        <div className={`${styles.ingredientPreview} mr-4`}>
          <img className={styles.ingredientImage} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="Флюоресцентная булка R2-D3 (верх)" />
        </div>
        <p className="text text_type_main-default mr-4">{name}</p>
      </div>
      <Price>{`${count} x ${price}`}</Price>
    </div>
  )
}

function OrderDetails() {
  return (
    <div className={styles.orderContainer}>
      <p className="text text_type_digits-default pb-10">#03425</p>
      <div style={{textAlign: 'left', width: '640px'}}>
        <p className="text text_type_main-medium pb-3">Black Hole Singularity острый бургер</p>
        <p className="text text_type_main-default pb-15" style={{color: '#00CCCC'}}>Выполнен</p>
        <p className="text text_type_main-medium pb-6">Состав:</p>
      </div>
      <div className={styles.ingredientsColumn}>
        <IngredientRow name={'Флюоресцентная булка R2-D3'} count={232} price={2320} />
        <IngredientRow name={'Флюоресцентная булка R2-D3'} count={232} price={2320} />
        <IngredientRow name={'Флюоресцентная булка R2-D3'} count={232} price={2320} />
        <IngredientRow name={'Флюоресцентная булка R2-D3'} count={232} price={2320} />
        <IngredientRow name={'Флюоресцентная булка R2-D3'} count={232} price={2320} />
      </div>
      <div className={styles.orderTimePrice}>
        <p className="text text_type_main-default text_color_inactive">Вчера, 13:50 i-GMT+3</p>
        <Price>510</Price>
      </div>
    </div>
  )
}

export default OrderDetails;