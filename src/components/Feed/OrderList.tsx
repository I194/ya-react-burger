import React, { FunctionComponent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Feed.module.css';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { getItems } from '../../services/actions/shop';
import { ICardOrder, IOrder, IOrderIdTime, IOrderIngredients, IOrderList } from '../../services/types/components';

const Price: FunctionComponent = ({children}) => {
  return (
    <div className={`${styles.price}`}>
      <p className="text text_type_digits-default mr-2">{children}</p>
      <CurrencyIcon type="primary"/>
    </div>
  )
}

const OrderIdTime: FunctionComponent<IOrderIdTime> = ({_id, time}) => {
  const timeOptions: {} = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const goodLookTime = new Date(time);

  return (
    <div className={styles.orderId}>
      <p className="text text_type_digits-default" style={{maxWidth: '258px'}}>{_id}</p>
      <p className="text text_type_main-default text_color_inactive">{goodLookTime.toLocaleString("ru", timeOptions)}</p>
    </div>
  )
}

const OrderIngredients: FunctionComponent<IOrderIngredients> = ({ingredientsId}) => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.shop.ingredients);
  
  let price: number = 0;
  
  useEffect(() => {
    if (!ingredients.length) dispatch(getItems());
    },
    [dispatch, ingredients]
  );  

  const dataToIngredientPreview = (ingredientId: string, index: number) => {
    const ingredient = ingredients.filter((ingr: { _id: string; }) => ingr._id === ingredientId)[0];
    const widthRegulator = ingredientsId.length > 6 ? ingredientsId.length * Math.floor(ingredientsId.length / 5) : 0;
    if (!ingredient) return null;
    price += ingredient.price;
    return (
      <div key={index} className={styles.ingredientPreview} style={{left: `${-(24 + widthRegulator)*index}px`, zIndex: 100 - index}}>
        <img className={styles.ingredientImage} src={ingredient.image} alt={ingredient.name} />
      </div>
    )
  }

  if (!ingredients.length) return null;

  return (
    <div className={styles.orderId}>
      <div className={styles.ingredients}>
        {ingredientsId.map(dataToIngredientPreview)}
      </div>
      <Price>{price}</Price>
    </div>
  )
}

const CardOrder: FunctionComponent<ICardOrder> = ({path, location, _id, number, ingredients, time, name, orders}) => {
  return (
    <Link to={{
      pathname: `${path}/${_id}`,
      state: {modal: true, background: location, _id: _id, number: number, orders: orders}
    }}>
      <div className={styles.cardOrder}>
        <OrderIdTime _id={`#${number}`} time={time}/>
        <p className="text text_type_main-medium pr-6 pl-6">{name}</p>
        <OrderIngredients ingredientsId={ingredients}/>
      </div>
    </Link>
  )
}

const OrderList: FunctionComponent<IOrderList> = ({path, orders, location}) => {
  const dataToOrder = (order: IOrder) => {
    return (
      <CardOrder 
        path={path}
        location={location} 
        _id={order._id}
        number={order.number}
        ingredients={order.ingredients}
        time={order.createdAt}
        name={order.name}
        orders={orders}
        key={order._id}
      />
    )
  }

  return (
    <div className={styles.orders}>
      {orders?.map(dataToOrder)}
    </div>
  )
}

export default OrderList;