import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import { useGoogleLogin } from "@react-oauth/google";
import UserAvatar from "../../../utils/userAvatar.js";
import { getUserData } from "../../../utils/users.js";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchFavorites } from '../../../utils/favorites';

const GoogleAuth = props => {

const dispatch = useDispatch();
const navigate = useNavigate();
const [loggedIn, setLoggedIn] = useState(false);
const [user, setUser] = useState({});

async function getUserInfo(codeResponse) {
  try {
    const response = await fetch("http://localhost:5000/google_token", {
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
    <>
      {!loggedIn ? (
        <IconButton
          color="primary"
          aria-label="google login"
          onClick={() => googleLogin()}
        >
          <GoogleIcon fontSize="large" />
        </IconButton>
      ) : (
        <UserAvatar 
          userName={user.given_name} 
          userPicture={user.picture} 
          onClick={handleLogout} 
        />
      )}
    </>
  );
}

export default GoogleAuth;