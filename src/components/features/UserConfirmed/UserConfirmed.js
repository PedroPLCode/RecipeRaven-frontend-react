import styles from './UserConfirmed.module.scss'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import useToken from '../../features/useToken/useToken.js'
import { settings } from '../../../settings.js';

const UserConfirmed = props => {

  const { tokenStatus, removeToken, setToken } = useToken();
  const { token } = useParams();
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${settings.backendUrl}/api/user/confirm/${token}`, { token });
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div>
      {!tokenStatus || token ==="" || token === undefined ?
      <div>
        <h2>Confirm user email acoount</h2>
        <form onSubmit={handleSubmit}>
          <button type="submit">Click to confirm and activate user account</button>
        </form>
        {message && <p>{message}</p>}
        {message && message.includes('successfully') ? <a href='/login'>Log in</a> : null}
      </div>   
      :
      <div>
        <p>User status confirmed. You can log in now</p>
        <a href='/login'>User account link</a>
      </div>
      }
    </div>
  );
};
      
export default UserConfirmed;