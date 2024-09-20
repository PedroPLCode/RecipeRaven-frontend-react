import React, { useState } from "react";
import styles from './GoogleAuth.module.scss';
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import { useGoogleLogin } from "@react-oauth/google";
import UserAvatar from "../../../utils/userAvatar.js";
import { getUserData } from "../../../utils/users.js";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchFavorites } from '../../../utils/favorites';
import { displayApiResponseMessage } from '../../../utils/utlis.js';
import { getGoogleUserInfo } from '../../../utils/session.js'

const GoogleAuth = props => {

const dispatch = useDispatch();
const navigate = useNavigate();
const [loggedIn, setLoggedIn] = useState(false);
const [user, setUser] = useState({});

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const googleUserToken = await getGoogleUserInfo(codeResponse);
        props.setToken(googleUserToken.access_token)
        localStorage.setItem('token', googleUserToken.access_token);
        setLoggedIn(true);
        const userData = await getUserData(dispatch);
        setUser(userData);
        //getUserData(dispatch);
        fetchFavorites(dispatch);
        displayApiResponseMessage({ok: true}, googleUserToken);
        navigate('/login');
      } catch (error) {
        console.error(error);
        displayApiResponseMessage({ok: false}, error);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login error:', errorResponse);
    }
  });

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <div className={styles.google}>
      {!loggedIn ? (
        <IconButton className={styles.google_icon}
          color="primary"
          aria-label="google login"
          onClick={() => googleLogin()}
        >
          <GoogleIcon fontSize="large" />oogle Login
        </IconButton>
      ) : (
      <UserAvatar 
        userName={user?.given_name || "User"}
        userPicture={user?.picture || null}
        onClick={handleLogout} 
      />
      )}
    </div>
  );
}

export default GoogleAuth;