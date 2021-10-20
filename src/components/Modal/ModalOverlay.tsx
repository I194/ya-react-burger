import React, { FunctionComponent } from 'react';
import styles from './Modal.module.css';
import { IModalOverlay } from '../../services/types/components';

const ModalOverlay: FunctionComponent<IModalOverlay> = ({onClick}) => {
  return (
    <div className={`${styles.modalOverlay}`} onClick={onClick}></div>
  )
}

export default ModalOverlay;