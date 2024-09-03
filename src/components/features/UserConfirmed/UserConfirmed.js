import styles from './UserConfirmed.module.scss'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchFavorites, deleteFavorite } from '../../utils/favorites';
import { getUserData } from '../../utils/users';
import useToken from '../../features/useToken/useToken.js'

const UserConfirmed = props => {

  const { tokenStatus, removeToken, setToken } = useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:5000/api/user/confirm/${token}`, { token });
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