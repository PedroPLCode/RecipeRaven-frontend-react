import React, { useState } from 'react';
import styles from './DeleteUser.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/reducers/userReducer';
import { deleteUser } from '../../utils/users';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const DeleteUser = (props) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteUser = () => {
    deleteUser(props);
    dispatch(updateUser(false));
    //localStorage.removeItem("token");
    navigate('/login');
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleDeleteUser();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.delete}>
      <button onClick={() => setShowModal(true)}>
        Delete This User
      </button>
      <ConfirmationModal 
        show={showModal} 
        onClose={handleCancel} 
        onConfirm={handleConfirm} 
      />
    </div>
  );
};

export default DeleteUser;