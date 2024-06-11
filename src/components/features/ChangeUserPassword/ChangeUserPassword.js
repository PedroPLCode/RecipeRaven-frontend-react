import styles from './ChangeUserPassword.module.scss';
import { useState, useEffect } from 'react';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getUser, updateUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

import { getUserData, createUser, changeUserPassword, checkUserPassword, passwordAndConfirmPasswordMatch, validatePasswordInput } from '../../utils/users'

const ChangeUserPassword = () => {

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      getUserData(dispatch);
    }
  }, []);
  
  const userData = useSelector(state => getUser(state));
  console.log(userData)

  const [changeUserPasswordForm, setChangeUserPasswordForm] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  })

  const handleClickChangePassword = () => {
    if (!changeUserPasswordForm.oldPassword) {
      alert('enter current password to confirm')
    } else if (!changeUserPasswordForm.password) {
      alert('enter new password')
    } else if (!changeUserPasswordForm.confirmPassword) {
      alert('confirm new password')
    } else if (!validatePasswordInput(changeUserPasswordForm.password, 'password')) {
      alert('passwords too short')
    } else if (!passwordAndConfirmPasswordMatch(changeUserPasswordForm.password, changeUserPasswordForm.confirmPassword)) {
      alert('passwords not match')
    } else {
      setShowModal(true);
    }
  };
  
  const handleConfirm = async (event) => {
    event.preventDefault(); // Zapobieganie domyślnej akcji formularza, jeśli używasz formularza
    setShowModal(false);
    
    try {
      const passwdCheck = await checkUserPassword(changeUserPasswordForm);
      if (passwdCheck) {
        handleChangeUserPassword(event);
      } else {
        alert('Error: wrong password');
      }
    } catch (error) {
      console.error('Error during password check:', error);
      alert('Error: something went wrong');
    }
  };
  
  const handleCancel = () => {
    setShowModal(false);
  };

  const handleChange = event => {
    const { value, name } = event.target;

    if (name === 'password') {
      validatePasswordInput(value, 'password');
    } else if (name === 'confirmPassword') {
      //validatePasswordInput(value, 'confirmPassword');
      passwordAndConfirmPasswordMatch(changeUserPasswordForm.password, value);
    }
    setChangeUserPasswordForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  const handleChangeUserPassword = (event) => {
    changeUserPassword(event, changeUserPasswordForm, setChangeUserPasswordForm);
    navigate('/login')
  }
  
  return (
    <div className={styles.changeuserpassword}>
      <h3>User Account form</h3>
      <h5>change Password</h5>
      <div>
        <form className="login">
          <input onChange={handleChange} 
                type="password"
                text={changeUserPasswordForm.oldPassword} 
                name="oldPassword" 
                placeholder="Old Password" 
                value={changeUserPasswordForm.oldPassword} />          
          
          <input onChange={handleChange} 
                id="password"
                type="password"
                text={changeUserPasswordForm.password} 
                name="password" 
                placeholder="New Password" 
                value={changeUserPasswordForm.password} />

          <input onChange={handleChange} 
                id="confirmPassword"
                type="password"
                text={changeUserPasswordForm.confirmPassword} 
                name="confirmPassword" 
                placeholder="Confirm New Password" 
                value={changeUserPasswordForm.confirmPassword} />
          
          <button type="button" onClick={() => handleClickChangePassword()}>Change User Password</button>
          <ConfirmationModal 
            text="User password change"
            show={showModal} 
            onClose={handleCancel} 
            onConfirm={handleConfirm} 
          />
        </form>
        <a href="/login">back</a>
      </div>
      <h5>still under construction</h5>
      <h5>any problems - mail me</h5>
      <a href='mailto: piotrek.gaszczynski@gmail.com'><p><FontAwesomeIcon icon={faEnvelope} /> send me a email</p></a>
      <RandomQuote />
    </div>
  );
}
      
export default ChangeUserPassword;