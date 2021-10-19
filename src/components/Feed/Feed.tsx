import React, { FunctionComponent, useEffect } from 'react';
import styles from './Feed.module.css';
import { useSelector, useDispatch } from '../../services/types/hooks';
import OrderList from './OrderList';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/actions/shop';
import { ICompleted, IFeed, IOrder } from '../../services/types/components';
import { useLocation } from 'react-router';

const Completed: FunctionComponent<ICompleted> = ({text, number}) => {
  return (
    <div className={styles.completed}>
      <p className="text text_type_main-medium">
        {text}
      </p>
      <p className={`${styles.glow} text text_type_digits-large`}>
        {number}
      </p>
    </div>
  )
}

const Feed: FunctionComponent<IFeed> = ({path}) => {

  const dispatch = useDispatch();
  const location = useLocation();

  const messages = useSelector(state => state.shop.messages);
  const ordersData = messages.length ? messages[0] : [];

  const { orders, total, totalToday } = ordersData;

  useEffect(() => {  
  const wsUrlAllOrders = `wss://norma.nomoreparties.space/orders/all`;
    dispatch({ type: WS_CONNECTION_START, wsUrl: wsUrlAllOrders });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    }
  }, [dispatch]);  

  if (!orders?.length) return null;

  const doneOrders = orders.filter((order: { status: string; }) => order.status === 'done');
  const inProgressOrders = orders.filter((order: { status: string; }) => order.status === 'pending');

  const dataToNumberList = (order: IOrder, index: number) => {
    return (
      <p className="text text_type_digits-default pb-2 pr-1" key={index}>
        {`${order.number}`}
      </p>
    )
  }

  return (
    <div className={styles.content}>
      <div className={styles.leftBlock}>
        <p className={'text text_type_main-large pt-10 pb-5'}>Лента заказов</p>
        <OrderList path={path} location={location} orders={orders}/>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.ordersBoard}>
          <div className={`mr-10`}>
            <p className="text text_type_main-medium pb-6">
              Готовы:
            </p>
            <div className={`${styles.ordersList}`} style={{color: '#00CCCC'}}>
              {doneOrders.map(dataToNumberList)}
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium pb-6">
              В работе:
            </p>
            <div className={styles.ordersList} style={{color: '#00CCCC'}}>
              {inProgressOrders.map(dataToNumberList)}
            </div>
          </div>
        </div>
        <Completed text={'Выполнено за всё время:'} number={total}/>
        <Completed text={'Выполнено за сегодня:'} number={totalToday}/>
      </div>
    </div>
  )
}

export default Feed;