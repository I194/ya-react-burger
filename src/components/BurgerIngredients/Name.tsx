import React, {FunctionComponent} from 'react';
import styles from './BurgerIngredients.module.css';
import { IIngName } from '../../services/types/components';

const Name: FunctionComponent<IIngName> = ({ box, size, name }) => {
  return (
    <div className={`${styles.name} ${box || ''}`}>
      <p className={`text text_type_main-${size || 'default'}`}>{name}</p>
    </div>
  )
}

export default Name;
