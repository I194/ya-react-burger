import React, { FunctionComponent } from 'react'; 
import { useDrag } from "react-dnd";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import Illustration from './Illustration';
import Name from './Name';
import { ICount, IIngredient, IPrice } from '../../services/types/components';

const Price: FunctionComponent<IPrice> = ({price}) => {
  return (
    <div className={`${styles.price}`}>
      <p className="text text_type_digits-default mr-2">{price}</p>
      <CurrencyIcon type="primary"/>
    </div>
  )
}

const Counter: FunctionComponent<ICount> = ({count}) => {
  return (
    <div className={`${styles.counter}`} style={{visibility: `${count <= 0 ? 'hidden' : 'visible'}`}}>
      <p className="text text_type_digits-default pt-1">{count}</p>
    </div>
  )
}

const Ingredient: FunctionComponent<IIngredient> = ({id, name, price, count, image}) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {id: id}
  });

  return (
    <div ref={dragRef}>
      <Illustration image={image} alt={name}/>
      <Price price={price}/>
      <Name name={name}/>
      <Counter count={count} />
    </div>
  )
}

export default Ingredient;