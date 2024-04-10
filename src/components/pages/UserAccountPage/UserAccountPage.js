import styles from './UserAccountPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Login from '../../features/Login/Login.js'
import Profile from '../../features/Profile/Profile.js'
import LoginHeader from '../../features/LoginHeader/LoginHeader.js'
import useToken from '../../features/useToken/useToken.js'

import CreateUser from '../../features/CreateUser/CreateUser';

const LoginPage = () => {

  const { token, removeToken, setToken } = useToken();

  return (
    <div className={styles.login}>
      <h3>User Account form</h3>
      <h5>will allow login or create account</h5>
      <div>
        <LoginHeader token={removeToken}/>
        {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} />
        :(
        <Profile token={token} setToken={setToken}/>
        )}
      </div>
      <h5>still under construction</h5>

      <CreateUser />
      
      <h5>any problems - mail me</h5>
      <a href='mailto: piotrek.gaszczynski@gmail.com'><p><FontAwesomeIcon icon={faEnvelope} /> send me a email</p></a>
      <RandomQuote />
    </div>
  );
}
    
export default LoginPage;