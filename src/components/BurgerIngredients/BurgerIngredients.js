// app-header.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import Modal from '../Modal/Modal';

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
    <div className={`${styles.col}`} onClick={props.onClick}>
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
    <div className={`${styles.name} ${props.box || ''}`}>
      <p className={`text text_type_main-${props.size || 'default'}`}>{props.name}</p>
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

function NutritionDetail(props) {

  let name = '';
  switch (props.nutritionType) {
    case 'calories':
      name = 'Калории, ккал';
      break;
    case 'proteins':
      name = 'Белки, г';
      break;
    case 'fat':
      name = 'Жиры, г';
      break;
    case 'carbohydrates':
      name = 'Углеводы, г';
      break;
    default: 
      name = '';
      break;
  }

  return (
    <div className={`${styles.nutritionElement} text_color_inactive`}>
      <p className={'text  text_type_main-default pb-2'}>{name}</p>
      <p className={'text text_type_digits-default '}>{props.nutritionValue}</p>
    </div>
  )
}

NutritionDetail.propTypes = {
  nutritionType: PropTypes.string,
  nutritionValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

function IngredientDetails(props) {
  return (
    <>
      <Illustration img={props.image_large} alt={props.name}/>
      <Name name={props.name} size={'medium'} box={'pb-8 pt-4'}/>
      <div className={`${styles.nutritionDetails} pb-15`}>
        <NutritionDetail nutritionType={'calories'} nutritionValue={props.calories} />
        <NutritionDetail nutritionType={'proteins'} nutritionValue={props.proteins} />
        <NutritionDetail nutritionType={'fat'} nutritionValue={props.fat} />
        <NutritionDetail nutritionType={'carbohydrates'} nutritionValue={props.carbohydrates} />
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  image_large: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  proteins: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  carbohydrates: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

function BurgerIngredients(props) {

  const [modalVisible, setVisibility] = useState(false);
  const [modalData, setModalData] = useState();
  
  const handleCloseModal = () => {
    setVisibility(false);
  }

  const handleOpenModal = (data) => {
    setVisibility(true);
    setModalData(data);
  }

  const buns = [], mains = [], sauces = [];

  props.data.forEach((ingredient, iter) => {
    let code = (
      <Col key={ingredient._id} onClick={() => {handleOpenModal(ingredient)}}>
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

  const [current, setCurrent] = useState('buns');

  return (
    <div className={`${styles.containerMain}`} style={{ textAlign: 'left'}} >
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
      <Modal header={'Детали ингредиента'} isVisible={modalVisible} onClose={handleCloseModal} box={{w: '720px', h: '540px'}}>
        <IngredientDetails {...modalData}/>
      </Modal>
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.array
}

export default BurgerIngredients;