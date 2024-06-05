import React from 'react';
import styles from './ConfirmationModal.module.scss';

const ConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h4>Are you sure you want to delete this user?</h4>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.confirm}>Yes</button>
          <button onClick={onClose} className={styles.cancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
