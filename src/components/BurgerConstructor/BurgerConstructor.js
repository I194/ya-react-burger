import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from './OrderDetails';

import cratorBun from '../../images/bun-02.png';
import spicyX from '../../images/sauce-02.png';
import spaceSauce from '../../images/sauce-04.png';
import galacticSauce from '../../images/sauce-03.png';
import meat from '../../images/meat-03.png';
import cheese from '../../images/cheese.png';

function Price(props) {
  if (!props.size) props.size = 'default';

  let iconSize = styles.default;
  if (props.size === 'medium') iconSize = styles.medium; 

  return (
    <div className={`${styles.price} ${iconSize}`}>
      <p className={`text text_type_digits-${props.size} mr-2`}>{props.price}</p>
      <CurrencyIcon type="primary"/>
    </div>
  )
}

Price.propTypes = {
  size: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
}

function ListElement(props) {
  let isLocked = false;
  // if (!props.visibility) props.visibility = 'visible';
  if (props.type === 'top' || props.type === 'bot') isLocked = true;
  return (
    <div className={`${styles.element}`}>
      <div className='' style={{visibility: `${props.drag || 'visible'}`}}>
       <DragIcon type='primary'/>
      </div>
      <ConstructorElement
        text={props.name + (props.type === 'top' ? ' (верх)' : '') + (props.type === 'bot' ? ' (низ)' : '')}
        price={props.price}
        thumbnail={props.image}
        type={props.type}
        isLocked={isLocked}
      />
    </div>
  )
}

ListElement.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  drag: PropTypes.string,
  image: PropTypes.string.isRequired,
}

export default function BurgerConstructor() {

  const [modalVisible, setVisibility] = useState(false);
  
  const handleCloseModal = () => {
    setVisibility(false);
  }

  const handleOpenModal = () => {
    setVisibility(true);
  }

  const modalData = {
    id: '034536'
  }

  // здесь будет обработка данных, поступающих из BurgerIngredients
  // и генерация на их основе массива IngredientsList, состоящего из ListElement
  // но пока логика проброса данных не реализована, и потому тут хардкод 

  return (
    <div className={`${styles.containerMain}`}>
      <div className={'pt-25 pb-10'} style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <ListElement 
          name='Краторная булка N-200i'
          price='1255'
          image={cratorBun}
          type='top'
          drag='hidden'
        />
        <div className={`${styles.optionalIngredients}`} style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <ListElement 
            name='Соус традиционный галактический'
            price='15'
            image={galacticSauce}
          />
          <ListElement 
            name='Сыр с астероидной плесенью'
            price='4142'
            image={cheese}
          />
          <ListElement 
            name='Филе Люминесцентного тетраодонтимформа'
            price='988'
            image={meat}
          />
          <ListElement 
            name='Соус фирменный Space Sauce'
            price='80'
            image={spaceSauce}
          />
          <ListElement 
            name='Соус Spicy-X'
            price='90'
            image={spicyX}
          />
        </div>
        <ListElement 
          name='Краторная булка N-200i'
          price='1255'
          image={cratorBun}
          type='bot'
          drag='hidden'
        />
      </div>
      <div className={`${styles.totalInfo}`}>
        <Price price={500} size='medium'/>
        <div className="pl-10">
          <Button type="primary" size="large" onClick={handleOpenModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
      {
        modalVisible &&
        <Modal header={''} isVisible={modalVisible} onClose={handleCloseModal} box={{w: '720px', h: '720px'}}>
          <OrderDetails {...modalData}/>
        </Modal>
      }
    </div>
  )
}