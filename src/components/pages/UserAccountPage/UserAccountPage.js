import styles from './UserAccountPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Login from '../../features/Login/Login.js'
import Profile from '../../features/Profile/Profile.js'
import useToken from '../../features/useToken/useToken.js'

const LoginPage = () => {

  const { token, removeToken, setToken } = useToken();

  return (
    <div className={styles.account}>
      <h3>User Account Page</h3>
      <h5>login or create new account</h5>
      <div className={styles.outer}>
        {!token || token ==="" || token === undefined ?  
        <div className={styles.inner}>
          <Login setToken={setToken} />
          <a className={styles.create} href="/createuser">or create new user</a>
        </div>
        :(
        <div>
          <Profile token={token} setToken={setToken}/>
        </div>
        )}
      </div>
      <h5>still under construction</h5>
      <h5>any problems - mail me</h5>
      <a href='mailto: piotrek.gaszczynski@gmail.com'><p><FontAwesomeIcon icon={faEnvelope} /> send me a email</p></a>
      <RandomQuote />
    </div>
  );
}
    
export default LoginPage;