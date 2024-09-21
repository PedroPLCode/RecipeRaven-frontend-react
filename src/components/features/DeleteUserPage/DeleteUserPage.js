import styles from './DeleteUserPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { updateUser } from '../../../redux/reducers/userReducer';
import { deleteUser, getUserData, checkUserPassword } from '../../../utils/users';
import { ConfirmToast } from 'react-confirm-toast'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createNotification } from '../../../utils/notifications';

const DeleteUserPage = (props) => {
  const [show, setShow] = useState(false)
  const [deleteUserForm, setDeleteUserForm] = useState({ password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      getUserData(dispatch);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!show) {
      setDeleteUserForm({ password: '' });
    }
  }, [show]);

  const handleClickDelete = event => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    if (!deleteUserForm.password) {
      createNotification('warning', 'Put your password to confirm', 2);
      return;
    }
    setShow(true);
  };
  
  const handleConfirm = async event => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    try {
      const passwdCheck = await checkUserPassword(deleteUserForm);
      if (passwdCheck) {
        await deleteUser(props);
        dispatch(updateUser(false));
        localStorage.token = null;
        navigate('/login');
        createNotification('warning', 'User account deleted');
        setDeleteUserForm({ password: "" });
      } else {
        createNotification('error', 'Wrong password');
      }
    } catch (error) {
      console.error('Error during password check:', error);
      createNotification('error', 'Something went wrong');
    }
  };
  
  const handleChange = (event) => {
    const { value, name } = event.target;
    setDeleteUserForm(prevNote => ({
      ...prevNote, [name]: value
    }));
  };

  return (
    <div className={styles.delete}>
      <h3>User Account</h3>
      <h5>Delete user</h5>
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
      </form>

          <ConfirmToast
            asModal={true}
            customFunction={event => handleConfirm(event)}
            setShowConfirmToast={setShow}
            showConfirmToast={show}
          />

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