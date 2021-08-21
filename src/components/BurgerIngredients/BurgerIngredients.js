// app-header.js

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import Modal from '../Modal/Modal';
import Ingredient from './Ingredient';
import IngredientDetails from './IngredientDetails';

function Headline(props) {
  return (
    <p className={'text text_type_main-medium pt-10 pb-6'} style={{width: '100%'}} id={props.id}>{props.children}</p>
  )
}

Headline.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
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

export default function BurgerIngredients(props) {

  const [modalVisible, setVisibility] = useState(false);
  const [modalData, setModalData] = useState();
  
  const handleCloseModal = () => {
    setVisibility(false);
  }

  const handleOpenModal = (data) => {
    setVisibility(true);
    setModalData(data);
  }

  const buns = useMemo(() => props.data.filter((item) => item.type === 'bun'), [props.data]);
  const mains = useMemo(() => props.data.filter((item) => item.type === 'main'), [props.data]);
  const sauces = useMemo(() => props.data.filter((item) => item.type === 'sauce'), [props.data]);

  const dataToIngredient = (data) => {
    return (
      <Col key={data._id} onClick={() => {handleOpenModal(data)}}>
        <Ingredient 
          name={data.name} 
          price={data.price}
          img={data.image}
          visibility={'hidden'}
        />
      </Col>
    )
  }

  const [current, setCurrent] = useState('buns');

  const setTab = (tab) => {
    console.log(tab)
    setCurrent(tab);
    const element = document.getElementById(tab);
    console.log(element)
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`${styles.containerMain}`} style={{ textAlign: 'left'}} >
      <p className={'text text_type_main-large pt-10 pb-5'}>Соберите бургер</p>
      <div style={{ display: 'flex', width: '100%' }}>
        <Tab value="buns" active={current === 'buns'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients}`}>
        <Headline id='buns'>Булки</Headline>
        <Row>{buns.map(dataToIngredient)}</Row>
        <Headline id='sauces'>Соусы</Headline>
        <Row>{sauces.map(dataToIngredient)}</Row>
        <Headline id='mains'>Начинки</Headline>
        <Row>{mains.map(dataToIngredient)}</Row>
      </div>
      {
        modalVisible &&
        <Modal header={'Детали ингредиента'} isVisible={modalVisible} onClose={handleCloseModal} box={{w: '720px', h: '540px'}}>
          <IngredientDetails {...modalData}/>
        </Modal>
      }
      
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired
}