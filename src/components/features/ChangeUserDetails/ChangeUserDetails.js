import styles from './ChangeUserDetails.module.scss';
import { useState, useEffect } from 'react';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getUser, updateUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { getUserData, createUser, changeUserDetails } from '../../utils/users'

const ChangeUserDetails = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      getUserData(dispatch);
    }
  }, []);
  
  const userData = useSelector(state => getUser(state));

  const [changeUserDetailsForm, setChangeUserDetailsForm] = useState({
    email: "",
    name: "",
    about: "",
  })
  
  useEffect(() => {
    if (userData) {
      setChangeUserDetailsForm({
        email: userData.email,
        name: userData.name,
        about: userData.about,
      });
    }
  }, [userData]);

  const handleChange = event => {
    const {value, name} = event.target
    setChangeUserDetailsForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  const handleChangeUserDetails = (event) => {
    changeUserDetails(event, changeUserDetailsForm, setChangeUserDetailsForm);
    navigate('/login')
  }

  return (
    <div className={styles.user}>
      <h3>User Account form</h3>
      <h5>Change User Details</h5>
      <div>
        <form className="login">
          <input onChange={handleChange} 
                type="email"
                text={changeUserDetailsForm.email} 
                name="email" 
                placeholder="Email" 
                value={changeUserDetailsForm.email} />
          <input onChange={handleChange} 
                type="text"
                text={changeUserDetailsForm.name} 
                name="name" 
                placeholder="Name" 
                value={changeUserDetailsForm.name} />
          <input onChange={handleChange} 
                type="text"
                text={changeUserDetailsForm.about} 
                name="about" 
                placeholder="About" 
                value={changeUserDetailsForm.about} />
          <button onClick={handleChangeUserDetails}>Change User Details</button>
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
      
export default ChangeUserDetails;
