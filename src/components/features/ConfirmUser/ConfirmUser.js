import styles from './ConfirmUser.module.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../../features/useToken/useToken.js'
import { validateEmail, resendConfirmationEmail } from '../../../utils/users';
import { toast } from 'react-toastify';

const ConfirmUser = props => {

  const { token, removeToken, setToken } = useToken();
  const navigate = useNavigate();

  const [confirmUserForm, setCreateUserForm] = useState({
    email: "",
  });

  const handleResendemail = async (event) => {
    event.preventDefault();

    const confirmUserValidators = [
      await validateEmail(confirmUserForm.email, false, false),
    ];

    if (confirmUserValidators.every(valid => valid)) {
      await resendConfirmationEmail(event, confirmUserForm, setCreateUserForm);
      navigate('/confirmuser');
    } else {
      toast.warning('Validation failed');
    }
  }

  const handleChange = event => {
    const {value, name} = event.target
    setCreateUserForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  return (

    <div className={styles.confirm}>
      {!token || token ==="" || token === undefined ? 
      <div>
        <p>Email sent to confirm user. Check your incomming emails.</p>

        <form className="email">
        <input onChange={handleChange} 
               type="email"
               id="email"
               text={confirmUserForm.email} 
               name="email" 
               placeholder="email" 
               value={confirmUserForm.email} />
        <button onClick={handleResendemail}>Or resend email</button>
      </form>
      </div>
      :
      <div>
        <p>User status confirmed. You can log in now</p>
        <a href='/login'>Log in component link</a>
      </div>
      }
    </div>
  );
}
      
export default ConfirmUser;