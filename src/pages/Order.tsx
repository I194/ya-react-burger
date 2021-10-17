import OrderDetails from '../components/Feed/OrderDetails';
import { useParams } from 'react-router-dom';
import styles from './Order.module.css';
import { FunctionComponent } from 'react';
import { IOrdersPage } from '../services/types/components';

export const OrderPage: FunctionComponent<IOrdersPage> = ({orders}) => {
  const { id } = useParams<{id: string}>();

  return (
    <div className={styles.orderContainer}>
      <p className="text text_type_digits-default pb-10">#{id}</p>
      <OrderDetails _id={id} orders={orders}/>
    </div>
  )
}