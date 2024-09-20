import styles from './ForgottenPassword.module.scss';
import { useState, useEffect } from 'react';
import RandomQuote from '../RandomQuote/RandomQuote';
import { validateEmail } from '../../../utils/users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { resetPassword } from '../../../utils/users';
import { ConfirmToast } from 'react-confirm-toast';
import { toast } from 'react-toastify';

const ForgottenPassword = () => {
  const [forgottenPasswordEmail, setForgottenPasswordEmail] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) {
      setForgottenPasswordEmail('');
    }
  }, [show]);

  const handleSubmitEmail = async event => {  
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    if (!forgottenPasswordEmail) {
      toast.warning('Error. No email address provided.', { toastId: 10 });
      setShow(false);
      return;
    } else if (!await validateEmail(forgottenPasswordEmail, false, false)) {
      toast.warning('Error. Wrong email address.', { toastId: 10 });
      setShow(false);
      return;
    }
  };

  const handleConfirm = (event) => {
    resetPassword(event, forgottenPasswordEmail);
    setShow(false);
    //setForgottenPasswordEmail("");
  };

  const handleCancel = () => {
    setShow(false);
    setForgottenPasswordEmail("");
  };

  return (
    <div className={styles.password}>
      <h3>Forgotten Password Form</h3>
      <h5>Reset User Password</h5>
      <div>
        <form className="email" onSubmit={handleSubmitEmail} noValidate>
          <input
            onChange={(event) => setForgottenPasswordEmail(event.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={forgottenPasswordEmail}
          />

          <button type="submit" onClick={() => setShow(true)}>
            Reset password
          </button>

          <ConfirmToast
            asModal={true}
            customFunction={handleConfirm}
            setShowConfirmToast={setShow}
            showConfirmToast={show}
            handleCancel={handleCancel}
          />
        </form>

        <a href="/login">Back</a>
      </div>
      <h5>Still under construction</h5>
      <h5>Any problems - mail me</h5>
      <a href="mailto:piotrek.gaszczynski@gmail.com">
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> Send me an email
        </p>
      </a>
      <RandomQuote />
    </div>
  );
};

export default ForgottenPassword;