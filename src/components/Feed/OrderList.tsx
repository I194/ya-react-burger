import React, { FunctionComponent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Feed.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../services/types/hooks';
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
  return (
    <div className={styles.orderId}>
      <p className="text text_type_main-small" style={{maxWidth: '258px'}}>{_id}</p>
      <p className="text text_type_main-default text_color_inactive">{time}</p>
    </div>
  )
}

const OrderIngredients: FunctionComponent<IOrderIngredients> = ({ingredientsId}) => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.shop.ingredients);

  let price = 0;
  
  useEffect(() => {
    if (!ingredients.length) dispatch(getItems());
    },
    [dispatch, ingredients]
  );  

  const dataToIngredientPreview = (ingredientId: any, index: number) => {
    const ingredient = ingredients.filter((ingr: { _id: string; }) => ingr._id === ingredientId)[0];
    const widthRegulator = ingredientsId.length > 6 ? ingredientsId.length * Math.floor(ingredientsId.length / 5) : 0;
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

const CardOrder: FunctionComponent<ICardOrder> = ({path, _id, ingredients, time, name, orders}) => {
  return (
    <Link to={{
      pathname: `${path}/${_id}`,
      state: {modal: true, _id: _id, orders: orders}
    }}>
      <div className={styles.cardOrder}>
        <OrderIdTime _id={`#${_id}`} time={time}/>
        <p className="text text_type_main-medium pr-6 pl-6">{name}</p>
        <OrderIngredients ingredientsId={ingredients}/>
      </div>
    </Link>
  )
}

const OrderList: FunctionComponent<IOrderList> = ({path, orders}) => {
  const dataToOrder = (order: IOrder) => {
    return (
      <CardOrder 
        path={path} 
        _id={order._id}
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