import styles from './LoginPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { infoData } from '../../../settings';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCode, faCodeCompare, faCamera } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {

  const [userLogin, setUserLogin] = useState();
  const [userPasswd, setUserPasswd] = useState();

  const handleUserNameSet = value => {
    setUserLogin(value);
  }

  const handlePasswordSet = value => {
    setUserPasswd(value);
  }

  const handleLoginClick = () => {
    const loginData = [userLogin, userPasswd];
    console.log(loginData);
    fetch('http://localhost:5000/login',{
      method: 'POST',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(loginData)
    }).then(response => response.text()
      .then(data => ({ data, response })))
  }

  return (
    <div className={styles.login}>
      <h3>Login form</h3>
      <h5>login or create account</h5>

      <input id="user_name" type="text" placeholder='user login' 
            title='User Login' 
            onChange={event => handleUserNameSet(event.target.value)} />
      <input id="password" type="text" placeholder='password' 
            title='User Password'
            onChange={event => handlePasswordSet(event.target.value)} />
      <div onClick={handleLoginClick}>Login</div>

      <h5>still under construction</h5>
      <h5>any problems - mail me</h5>
      <a href='mailto: piotrek.gaszczynski@gmail.com'><p><FontAwesomeIcon icon={faEnvelope} /> send me a email</p></a>
      <RandomQuote />
    </div>
  );
}
    
export default LoginPage;
