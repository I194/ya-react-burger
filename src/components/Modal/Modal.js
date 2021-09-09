import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from './ModalOverlay';

function ModalHeader (props) {
  return (
    <div className={`${styles.modalHeader}`}>
      <p className={'text text_type_main-large'}>{props.children}</p>
      <CloseIcon onClick={props.onClick} />
    </div>
  )
}

ModalHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string
  ]).isRequired
}

function ModalBody (props) {
  return (
    <div className={`${styles.modalBody}`}>
      {props.children}
    </div>
  )
}

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]).isRequired
}

export default function Modal(props) {

  const handleKeyPress = (event) => {
    if (event.code === 'Escape'){
      props.onClose();
    }
  }

  useEffect(() => {
    if (props.isVisible) document.getElementById('modal-container').focus();
  }, [props.isVisible])

  return createPortal(
    ( 
      <> 
        {
          props.isVisible && 
          <div 
            onKeyDown={handleKeyPress} 
            tabIndex="0" 
            id='modal-container'> 
            <ModalOverlay onClick={props.onClose} />
            <div 
              className={`${styles.modal}`}
              style={
                {
                  width: props.box.w, 
                  height: props.box.h,
                  left: `calc(50% - ${props.box.w} / 2)`,
                  top: `calc(50% - ${props.box.h} / 2)`
                }
              }
            >
              <ModalHeader onClick={props.onClose}>{props.header}</ModalHeader>
              <ModalBody>{props.children}</ModalBody>
            </div>
          </div>
        }
      </>
    ), 
    document.getElementById("modal-root")
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]).isRequired
}