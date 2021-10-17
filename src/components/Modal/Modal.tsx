import React, { FunctionComponent, useEffect } from 'react';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from './ModalOverlay';
import { IModal, IModalHeader } from '../../services/types/components';

const ModalHeader: FunctionComponent<IModalHeader> = ({headerClass, onClick, children}) => {
  return (
    <div className={`${styles.modalHeader}`}>
      <p className={headerClass ? headerClass : 'text text_type_main-large'} >{children}</p>
      <CloseIcon onClick={onClick} type={'primary'} />
    </div>
  )
}

const ModalBody: FunctionComponent = ({children}) => {
  return (
    <div className={`${styles.modalBody}`}>
      {children}
    </div>
  )
}
 
const Modal: FunctionComponent<IModal> = ({onClose, isVisible, box, header, headerClass, children}) => {

  const handleKeyPress = (event: { code: string; }) => {
    if (event.code === 'Escape'){
      onClose();
    }
  }

  useEffect(() => {
    if (isVisible) document.getElementById('modal-container')?.focus();
  }, [isVisible])

  return createPortal(
    ( 
      <> 
        {
          isVisible && 
          <div onKeyDown={handleKeyPress} id='modal-container'> 
            <ModalOverlay onClick={onClose} />
            <div 
              className={`${styles.modal}`}
              style={
                {
                  width: box.w, 
                  height: box.h,
                  left: `calc(50% - ${box.w} / 2)`,
                  top: `calc(50% - ${box.h} / 2)`
                }
              }
            >
              <ModalHeader onClick={onClose} headerClass={headerClass}>{header}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </div>
          </div>
        }
      </>
    ), 
    document.getElementById("modal-root")!
  );
}

export default Modal;