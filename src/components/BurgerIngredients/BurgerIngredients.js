// app-header.js

import React from 'react';
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

  return (
    <div className={`${styles.containerMain}`} style={{ textAlign: 'left'}}>
      <p className={'text text_type_main-large pt-10 pb-5'}>Соберите бургер</p>
      <div style={{ display: 'flex', width: '100%' }}>
        <Tab value="buns" active={true}>
            Булки
        </Tab>
        <Tab value="sauces" active={false}>
            Соусы
        </Tab>
        <Tab value="fillings" active={false}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients}`}>
        <Headline>Булки</Headline>
        <Row>
          <Col>
            <Ingredient 
              name={'Краторная булка N-200i'}
              price={20}
              count={1}
              img={cratorBun}
              absent={"Трудности с поставками метеоритов"}
            />
          </Col>
          <Col>
            <Ingredient 
              name={'Флюоресцентная булка R2-D3'}
              price={20}
              count={1}
              visibility={'hidden'}
              img={fluorescentBun}
              absent={"Кончился флуоресцентный пигмент :("}
            />
          </Col>
        </Row>
        <Headline>Соусы</Headline>
        <Row>
          <Col>
            <Ingredient 
              name={'Соус Spicy-X'}
              price={30}
              count={1}
              visibility={'hidden'}
              img={spicyX}
              absent={"Трудности с поставками перца"}
            />
          </Col>
          <Col>
            <Ingredient 
              name={'Соус фирменный Space Sauce'}
              price={30}
              count={1}
              visibility={'hidden'}
              img={spaceSauce}
              absent={"Закончился секретный ингредиент!"}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Ingredient 
              name={'Соус традиционный галактический'}
              price={30}
              count={1}
              img={galacticSauce}
              absent={"Галактическая империя временно приостановила поставки провизии"}
            />
          </Col>
          <Col>
            <Ingredient 
              name={'Соус с шипами Антарианского плоскоходца'}
              price={30}
              count={1}
              visibility={'hidden'}
              img={spikeSauce}
              absent={"Плоскоходцы на грани вымирания, поставки временно прекращены для восстановления популяции"}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default BurgerIngredients;