import React from 'react';
import PropTypes from 'prop-types';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import Illustration from './Illustration';
import Name from './Name';

function Price(props) {
  return (
    <div className={`${styles.price}`}>
      <p className="text text_type_digits-default mr-2">{props.price}</p>
      <CurrencyIcon type="primary"/>
    </div>
  )
}

Price.propTypes = {
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
}

function Counter(props) {
  return (
    <div className={`${styles.counter}`} style={{visibility: `${props.visibility || 'visible'}`}}>
      <p className="text text_type_digits-default pt-1">{props.count}</p>
    </div>
  )
}

Counter.propTypes = {
  visibility: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default function Ingredient(props) {
  return (
    <>
      <Illustration img={props.img} alt={props.name}/>
      <Price price={props.price}/>
      <Name name={props.name} />
      <Counter count={props.count} visibility={props.visibility}/>
    </>
  )
}

Ingredient.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}