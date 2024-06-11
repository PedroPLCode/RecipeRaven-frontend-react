import styles from './DeleteUserPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../utils/users';
import { useState, useEffect } from 'react';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getUser, updateUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

import { getUserData, createUser, changeUserPassword, checkUserPassword} from '../../utils/users'

const DeleteUserPage = (props) => {
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

  const [deleteUserForm, setDeleteUserForm] = useState({
    password: "",
  })

  const handleClickDelete = () => {
    if (deleteUserForm.password) {
      setShowModal(true);
    } else {
      alert('enter password to confirm')
    }
  };
  
  const handleConfirm = async (event) => {
    event.preventDefault(); // Zapobieganie domyślnej akcji formularza, jeśli używasz formularza
    setShowModal(false);
    
    try {
      const passwdCheck = await checkUserPassword(deleteUserForm);
      if (passwdCheck) {
        handleDeleteUser(event);
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
    const {value, name} = event.target
    setDeleteUserForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  const handleDeleteUser = () => {
    deleteUser(props);
    dispatch(updateUser(false));
    //localStorage.removeItem("token");
    navigate('/login');
  };



  return (
    <div className={styles.delete}>
      <h3>User Account form</h3>
      <h5>change Password</h5>
      <div>
        <form className="login">
          <input onChange={handleChange} 
                type="password"
                text={deleteUserForm.password} 
                name="password" 
                placeholder="Password" 
                value={deleteUserForm.password} />          
        
          
          <button type="button" onClick={() => handleClickDelete()}>Delete this User</button>
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
};

export default DeleteUserPage;