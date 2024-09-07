import styles from './Login.module.scss'
import { useState } from 'react';
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchFavorites } from '../../../utils/favorites';
import { getUserData } from '../../../utils/users';

const Login = props => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginForm, setloginForm] = useState({
    login: "",
    password: ""
  })

  const logMeIn = event => {
    axios({
      method: "POST",
      url:"/token",
      baseURL: 'http://127.0.0.1:5000',
      data:{
        login: loginForm.login,
        password: loginForm.password
       }
    })
    .then((response) => {
      console.log(response)
      if (response.data.email_confirmed && response.data.access_token) {
        props.setToken(response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
        getUserData(dispatch)
        fetchFavorites(dispatch)
        localStorage.setItem('email_confirmed', response.data.email_confirmed);
        navigate('/login');
      } else {
        localStorage.setItem('email_confirmed', response.data.email_confirmed);
        navigate('/confirmuser')
      }
      console.log(localStorage)
    })
    .catch((error) => {
      if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
    })
    setloginForm(({
      login: "",
      password: ""}))
      event.preventDefault();
    }
  
  const handleChange = event => {
    const {value, name} = event.target
    setloginForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  return (
    <div className={styles.login}>
      <form className="login">
        <input onChange={handleChange} 
               type="login"
               text={loginForm.login} 
               name="login" 
               placeholder="Login" 
               value={loginForm.login} />
        <input onChange={handleChange} 
               type="password"
               text={loginForm.password} 
               name="password" 
               placeholder="Password" 
               value={loginForm.password} />
        <button onClick={logMeIn}>Login</button>
      </form>

      <a href="/forgottenpassword">Forgotten password</a>

      <GoogleOAuthProvider clientId="868534734276-qbdh8jfvu93533vpnqljgevh1it0s2oj.apps.googleusercontent.com">
        <GoogleAuth setToken={props.setToken}></GoogleAuth>
      </GoogleOAuthProvider>

    </div>
  );
}
      
export default Login;