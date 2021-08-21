import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';

export default function Name(props) {
  return (
    <div className={`${styles.name} ${props.box || ''}`}>
      <p className={`text text_type_main-${props.size || 'default'}`}>{props.name}</p>
    </div>
  )
}

Name.propTypes = {
  name: PropTypes.string.isRequired
}
