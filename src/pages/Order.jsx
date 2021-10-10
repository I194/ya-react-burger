import OrderDetails from '../components/Feed/OrderDetails';
import { useParams } from 'react-router-dom';
import styles from './Order.module.css';

export const OrderPage = () => {
  const { id } = useParams();

  return (
    <div className={styles.orderContainer}>
      <p className="text text_type_digits-default pb-10">#{id}</p>
      <OrderDetails _id={id}/>
    </div>
  )
}