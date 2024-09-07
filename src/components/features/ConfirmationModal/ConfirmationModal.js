import React from 'react';
import styles from './ConfirmationModal.module.scss';

const ConfirmationModal = ({ text, show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h4>{text} - Are you sure?</h4>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.confirm}>Yes</button>
          <button onClick={onClose} className={styles.cancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;