import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import { IIllustration } from '../../services/types/components';

const Illustration: FunctionComponent<IIllustration> = ({image, alt}) => {
  return (
    <div className={`${styles.illustration}`}>
      <img src={image} alt={alt}/>
    </div>
  )
}

export default Illustration;