import styles from './ForgottenPassword.module.scss';
import { useState, useEffect } from 'react';
import RandomQuote from '../RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getUserData, changeUserDetails, resetPassword } from '../../utils/users'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const ForgottenPassword = () => {

  const [forgottenPasswordEmail, setForgottenPasswordEmail] = useState('')
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirm = (event) => {
    setShowModal(false);
    handleResetPassword(event, forgottenPasswordEmail);
  };

  const handleResetPassword = (event, email) => {
    console.log(email)
    resetPassword(event, email);
  }

  const handleCancel = () => {
    setShowModal(false);
  };

//  const handleChange = event => {
//    setForgottenPasswordEmail(event.target.value)}

  return (
    <div className={styles.user}>
      <h3>setForgottenPasswordEmail form</h3>
      <h5>Change User Password</h5>
      <div>

        <form className="email">

          <input onChange={event => setForgottenPasswordEmail(event.target.value)} 
                type="email"
                text={forgottenPasswordEmail} 
                name="email" 
                placeholder="Email" 
                value={forgottenPasswordEmail} />

          <button type="button" onClick={() => setShowModal(true)}>Reset password</button>

          <ConfirmationModal 
            text="Reset password?"
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
      
export default ForgottenPassword;
