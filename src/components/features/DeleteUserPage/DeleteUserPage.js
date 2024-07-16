import styles from './DeleteUserPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getUser, updateUser } from '../../../redux/reducers/userReducer';
import { deleteUser, getUserData, checkUserPassword } from '../../utils/users';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createNotification } from '../../utils/notifications';

const DeleteUserPage = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteUserForm, setDeleteUserForm] = useState({ password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      getUserData(dispatch);
    }
  }, [dispatch]);

  const userData = useSelector(state => getUser(state));

  const handleClickDelete = () => {
    if (deleteUserForm.password) {
      setShowModal(true);
    } else {
      createNotification('warning', 'Put your password to confirm', 2);
    }
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    setShowModal(false);

    try {
      const passwdCheck = await checkUserPassword(deleteUserForm);
      if (passwdCheck) {
        handleDeleteUser();
      } else {
        createNotification('error', 'Wrong password');
      }
    } catch (error) {
      console.error('Error during password check:', error);
      createNotification('error', 'Something went wrong');
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setDeleteUserForm(prevNote => ({
      ...prevNote, [name]: value
    }));
  };

  const handleDeleteUser = () => {
    deleteUser(props);
    dispatch(updateUser(false));
    navigate('/login');
  };

  return (
    <div className={styles.delete}>
      <h3>User Account form</h3>
      <h5>Change Password</h5>
      <div>
        <form className="login">
          <input 
            onChange={handleChange} 
            type="password"
            name="password" 
            placeholder="Password" 
            value={deleteUserForm.password} 
          />
          <button type="button" onClick={handleClickDelete}>Delete this User</button>
          <ConfirmationModal 
            text="User password change"
            show={showModal} 
            onClose={handleCancel} 
            onConfirm={handleConfirm} 
          />
        </form>
        <a href="/login">Back</a>
      </div>
      <h5>Still under construction</h5>
      <h5>Any problems - mail me</h5>
      <a href='mailto:piotrek.gaszczynski@gmail.com'>
        <p><FontAwesomeIcon icon={faEnvelope} /> Send me an email</p>
      </a>
      <RandomQuote />
    </div>
  );
};

export default DeleteUserPage;