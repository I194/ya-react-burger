import React, { FunctionComponent, useEffect } from 'react';
import styles from './Feed.module.css';
import { useSelector, useDispatch } from '../../services/types/hooks';
import OrderList from './OrderList';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/actions/shop';
import { ICompleted, IFeed } from '../../services/types/components';

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
  const inProgressOrders = orders.filter((order: { status: string; }) => order.status !== 'done');

  const dataToIdList = (order: { _id: string; }, index: number) => {
    return (
      <p className="text text_type_main-small pb-2" key={index}>
        {`#${order._id}`}
      </p>
    )
  }

  return (
    <div className={styles.content}>
      <div className={styles.leftBlock}>
        <p className={'text text_type_main-large pt-10 pb-5'}>Лента заказов</p>
        <OrderList path={path} orders={orders}/>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.ordersBoard}>
          <div className={`${styles.ordersList} mr-9`}>
            <p className="text text_type_main-medium pb-6">
              Готовы:
            </p>
            <div style={{color: '#00CCCC'}}>
              {doneOrders.map(dataToIdList)}
            </div>
          </div>
          <div className={styles.ordersList}>
            <p className="text text_type_main-medium pb-6">
              В работе:
            </p>
            <div style={{color: '#00CCCC'}}>
              {inProgressOrders.map(dataToIdList)}
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