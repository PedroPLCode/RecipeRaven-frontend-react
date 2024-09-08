import styles from './ResetPassword.module.scss';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { settings } from '../../../settings';
import { toast } from 'react-toastify';
import { getUserData, changeUserPassword, checkUserPassword, passwordAndConfirmPasswordMatch, validatePasswordInput } from '../../../utils/users'

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const updatePassword = async value => {
    await validatePasswordInput(newPassword, 'password');
    setNewPassword(value)
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const passwdCheck = await validatePasswordInput(newPassword, 'password');
      if (passwdCheck) {
        const response = await axios.post(`${settings.backendUrl}/api/resetpassword/reset/${token}`, { token, new_password: newPassword });
        setMessage('success');
        toast.success(message)
      }
    } catch (error) {
      setMessage(error.response.data.error);
      toast.warning(error)
    }
  };

  return (
    <div className={styles.reset}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input id="password"
            type="password"
            name="password"
            placeholder="Password" 
            value={newPassword} 
            onChange={(e) => updatePassword(e.target.value)} required />
        </label>
        <button type="submit">Set New Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;