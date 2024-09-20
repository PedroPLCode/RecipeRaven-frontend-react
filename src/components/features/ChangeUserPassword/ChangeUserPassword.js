import styles from './ChangeUserPassword.module.scss';
import { useState, useEffect } from 'react';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { ConfirmToast } from 'react-confirm-toast'
import { getUserData, changeUserPassword, checkUserPassword, passwordAndConfirmPasswordMatch, validatePasswordInput } from '../../../utils/users'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeUserPassword = () => {

  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      getUserData(dispatch);
    }
  }, []);

  const [changeUserPasswordForm, setChangeUserPasswordForm] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmitForm = async event => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (!changeUserPasswordForm.oldPassword) {
      toast.warning('Error. enter current password to confirm', { toastId: 10 });
      setShow(false);
    } else if (!changeUserPasswordForm.password) {
      toast.warning('Error. enter new password', { toastId: 10 });
      setShow(false);
    } else if (!changeUserPasswordForm.confirmPassword) {
      toast.warning('Error. confirm new password', { toastId: 10 });
      setShow(false);
    } else if (!validatePasswordInput(changeUserPasswordForm.password, 'password')) {
      toast.warning('Error. passwords too short', { toastId: 10 });
      setShow(false);
    } else if (!passwordAndConfirmPasswordMatch(changeUserPasswordForm.password, changeUserPasswordForm.confirmPassword)) {
      toast.warning('Error. passwords not match', { toastId: 10 });
      setShow(false);
    }
  }
  
  const handleConfirm = async event => {
    try {
      const passwdCheck = await checkUserPassword(changeUserPasswordForm);
      if (passwdCheck) {
        handleChangeUserPassword(event);
        localStorage.token = null;
        navigate('/login')
      } else {
        toast.error('Error. wrong passwords', { toastId: 10 });
      }
    } catch (error) {
      console.error('Error during password check:', error);
      toast.error('Error. something went wrong', { toastId: 10 });
    }
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
    //navigate('/login')
  }
  
  return (
    <div className={styles.changeuserpassword}>
      <h3>User Account form</h3>
      <h5>change Password</h5>
      <div>
        <form className="login" onSubmit={handleSubmitForm}>
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
          
          <button type="submit" onClick={() => setShow(true)}>Change User Password</button>

          <ConfirmToast
            asModal={true}
            customFunction={event => handleConfirm(event)}
            setShowConfirmToast={setShow}
            showConfirmToast={show}
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