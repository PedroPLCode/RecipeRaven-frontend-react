import { fetchFavorites } from '../utils/favorites.js';
import { getUserData } from '../utils/users';
import { settings } from '../settings';
import { displayApiResponseMessage } from './utlis.js';

export const logMeIn = async (loginForm, props, dispatch, navigate) => {
  try {
    const response = await fetch(`${settings.backendUrl}/token`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: loginForm.login,
        password: loginForm.password,
      }),
    });

    const responseText = await response.text();
    const data = JSON.parse(responseText);
    const finalResponse = data; 

    if (data.access_token) {
      props.setToken(data.access_token);
      localStorage.setItem('token', data.email_confirmed ? data.access_token : false);
      localStorage.setItem('email_confirmed', data.email_confirmed);
      getUserData(dispatch);
      fetchFavorites(dispatch);
      navigate(data.email_confirmed ? '/login' : '/confirmuser');
    } else {
      navigate('/login');
    }
    displayApiResponseMessage(data, finalResponse);
  } catch (error) {
    console.error(error);
    displayApiResponseMessage({ok: false}, error);
  }
};

export const getGoogleUserInfo = async codeResponse => {
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