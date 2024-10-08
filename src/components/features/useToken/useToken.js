import { useState } from 'react';

const useToken = () => {

  const getToken = () => {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  const saveToken = access_token => {
    localStorage.setItem('token', access_token);
    setToken(access_token);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }
}

export default useToken;