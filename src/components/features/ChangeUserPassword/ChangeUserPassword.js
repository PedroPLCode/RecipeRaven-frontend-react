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

import { getUserData, createUser, changeUserPassword } from '../../utils/users'

const ChangeUserPassword = () => {

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
    newPassword: "",
    confirmNewPassword: "",
  })
  
  const handleChange = event => {
    const {value, name} = event.target
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
                type="oldPassword"
                text={changeUserPasswordForm.oldPassword} 
                name="oldPassword" 
                placeholder="Old Password" 
                value={changeUserPasswordForm.oldPassword} />          
          
          <input onChange={handleChange} 
                type="newPassword"
                text={changeUserPasswordForm.newPassword} 
                name="newPassword" 
                placeholder="New Password" 
                value={changeUserPasswordForm.newPassword} />

          <input onChange={handleChange} 
                type="confirmNewPassword"
                text={changeUserPasswordForm.confirmNewPassword} 
                name="confirmNewPassword" 
                placeholder="Confirm New Password" 
                value={changeUserPasswordForm.confirmNewPassword} />
          
          <button onClick={handleChangeUserPassword}>Change User Password</button>
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