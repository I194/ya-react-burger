// app-header.js

import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import {Tab, CurrencyIcon, BurgerIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import data from '../../utils/data.js';

import cratorBun from '../../images/bun-02.png';
import fluorescentBun from '../../images/bun-01.png';
import spicyX from '../../images/sauce-02.png';
import spaceSauce from '../../images/sauce-04.png';
import galacticSauce from '../../images/sauce-03.png';
import spikeSauce from '../../images/sauce-01.png';

function Headline(props) {
  return (
    <p className={'text text_type_main-medium pt-10 pb-6'} style={{width: '100%'}}>{props.children}</p>
  )
}

function Row(props) {
  return (
    <div className={`${styles.columnsPuns}`} style={{textAlign: 'center'}}>
      {props.children}
    </div>
  )
}

function Col(props) {
  return (
    <div className={`${styles.col}`}>
      {props.children}
    </div>
  )
}

function Illustration(props) {
  return (
    <div className={`${styles.illustration}`}>
      <img src={props.img} />
    </div>
  )
}

function Price(props) {
  return (
    <div className={`${styles.price}`}>
      <p className="text text_type_digits-default mr-2">{props.price}</p>
      <CurrencyIcon type="primary"/>
    </div>
  )
}

function Name(props) {
  return (
    <div className={`${styles.name}`}>
      <p className={'text text_type_main-default'}>{props.name}</p>
    </div>
  )
}

function Counter(props) {
  return (
    <div className={`${styles.counter}`} style={{visibility: `${props.visibility || 'visible'}`}}>
      <p className="text text_type_digits-default pt-1">{props.count}</p>
    </div>
  )
}

function Ingredient(props) {
  return (
    <>
      <Illustration img={props.img}/>
      <Price price={props.price}/>
      <Name name={props.name}/>
      <Counter count={props.count} visibility={props.visibility}/>
    </>
  )
}

function BurgerIngredients() {

  let buns = [], mains = [], sauces = [];
  
  data.forEach((ingredient, iter) => {
    let code = (
      <Col>
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