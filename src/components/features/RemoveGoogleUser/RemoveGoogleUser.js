import styles from './RemoveGoogleUser.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import RandomQuote from '../RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { updateUser } from '../../../redux/reducers/userReducer';
import { deleteUser, getUserData, checkUserPassword } from '../../../utils/users';
import { ConfirmToast } from 'react-confirm-toast'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createNotification } from '../../../utils/notifications';

const RemoveGoogleUser = (props) => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      getUserData(dispatch);
    }
  }, [dispatch]);

  const handleClickRemove = event => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    setShow(true);
  };

  const handleConfirm = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    try {
      deleteUser(props);
      dispatch(updateUser(false));
      localStorage.token = null;
      navigate('/login');
      createNotification('warning', 'User account deleted');
    } catch (error) {
      console.error('Error during password check:', error);
      createNotification('error', 'Something went wrong');
    }
  };

  return (
    <div className={styles.delete}>
      <h3>Google User Account Remove</h3>
      <div>
          <button type="button" onClick={handleClickRemove}>Delete this User</button>
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

export default RemoveGoogleUser;