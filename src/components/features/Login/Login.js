import styles from './Login.module.scss'
import { useState } from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logMeIn } from '../../../utils/session.js'

const Login = props => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginForm, setloginForm] = useState({
    login: "",
    password: ""
  })

  const handleClicklogIn = (event) => {
    event.preventDefault();
    logMeIn(loginForm, props, dispatch, navigate)
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
        <button onClick={handleClicklogIn}>Login</button>
      </form>

      <a href="/forgottenpassword">Forgotten password</a>

      <GoogleOAuthProvider clientId="868534734276-qbdh8jfvu93533vpnqljgevh1it0s2oj.apps.googleusercontent.com">
        <GoogleAuth setToken={props.setToken}></GoogleAuth>
      </GoogleOAuthProvider>

    </div>
  );
}
      
export default Login;