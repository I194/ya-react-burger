import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';

export default function Illustration(props) {
  return (
    <div className={`${styles.illustration}`}>
      <img src={props.img} alt={props.alt}/>
    </div>
  )
}

Illustration.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}