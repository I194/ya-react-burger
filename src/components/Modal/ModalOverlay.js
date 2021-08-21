import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export default function ModalOverlay (props) {
  return (
    <div className={`${styles.modalOverlay}`} onClick={props.onClick}></div>
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
}
