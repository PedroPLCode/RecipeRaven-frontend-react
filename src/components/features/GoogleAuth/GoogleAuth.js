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
import { settings } from "../../../settings.js";
import { TonalitySharp } from "@mui/icons-material";
import { toast } from "react-toastify";

const GoogleAuth = props => {

const dispatch = useDispatch();
const navigate = useNavigate();
const [loggedIn, setLoggedIn] = useState(false);
const [user, setUser] = useState({});

async function getUserInfo(codeResponse) {
  try {
    const response = await fetch(`${settings.backendUrl}/google_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeResponse.code }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
}

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const googleUserToken = await getUserInfo(codeResponse);
        props.setToken(googleUserToken.access_token)
        localStorage.setItem('token', googleUserToken.access_token);
        toast.success(googleUserToken.msg)
        setLoggedIn(true);
        const userData = await getUserData(dispatch);
        setUser(userData);
        getUserData(dispatch)
        fetchFavorites(dispatch)
        navigate('/login');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login error:', errorResponse);
    }
  });

  const handleLogout = () => {
    setLoggedIn(false);
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
          userName={user.given_name} 
          userPicture={user.picture} 
          onClick={handleLogout} 
        />
      )}
    </div>
  );
}

export default GoogleAuth;