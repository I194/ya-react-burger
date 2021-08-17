// app-header.js

import React from 'react';
import PropTypes from 'prop-types';
import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import data from '../../utils/data.js';

function Headline(props) {
  return (
    <p className={'text text_type_main-medium pt-10 pb-6'} style={{width: '100%'}}>{props.children}</p>
  )
}

Headline.propTypes = {
  children: PropTypes.string.isRequired
} 

function Row(props) {
  return (
    <div className={`${styles.columnsPuns}`} style={{textAlign: 'center'}}>
      {props.children}
    </div>
  )
}

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ])
}

function Col(props) {
  return (
    <div className={`${styles.col}`}>
      {props.children}
    </div>
  )
}

Col.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ])
}

function Illustration(props) {
  return (
    <div className={`${styles.illustration}`}>
      <img src={props.img} alt={props.alt}/>
    </div>
  )
}

Illustration.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string
}

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

function Name(props) {
  return (
    <div className={`${styles.name}`}>
      <p className={'text text_type_main-default'}>{props.name}</p>
    </div>
  )
}

Name.propTypes = {
  name: PropTypes.string.isRequired
}

function Counter(props) {
  return (
    <div className={`${styles.counter}`} style={{visibility: `${props.visibility || 'visible'}`}}>
      <p className="text text_type_digits-default pt-1">{props.count}</p>
    </div>
  )
}

Counter.propTypes = {
  visibility: PropTypes.string,
  count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

function Ingredient(props) {
  return (
    <>
      <Illustration img={props.img} alt={props.name}/>
      <Price price={props.price}/>
      <Name name={props.name}/>
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

function BurgerIngredients(props) {

  const buns = [], mains = [], sauces = [];
  
  data.forEach((ingredient, iter) => {
    let code = (
      <Col key={ingredient._id}>
        <Ingredient 
          name={ingredient.name}
          price={ingredient.price}
          img={ingredient.image}
          visibility={'hidden'}
        />
      </Col>
    )
    
    if (ingredient.type === 'bun') buns.push(code);
    if (ingredient.type === 'main') mains.push(code);
    if (ingredient.type === 'sauce') sauces.push(code);
  })

  const [current, setCurrent] = React.useState('buns');

  return (
    <div className={`${styles.containerMain}`} style={{ textAlign: 'left'}}>
      <p className={'text text_type_main-large pt-10 pb-5'}>Соберите бургер</p>
      <div style={{ display: 'flex', width: '100%' }}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients}`}>
        <Headline id='buns'>Булки</Headline>
        <Row>{buns}</Row>
        <Headline id='sauces'>Соусы</Headline>
        <Row>{sauces}</Row>
        <Headline id='mains'>Начинки</Headline>
        <Row>{mains}</Row>
      </div>
    </div>
  )
}

export default BurgerIngredients;