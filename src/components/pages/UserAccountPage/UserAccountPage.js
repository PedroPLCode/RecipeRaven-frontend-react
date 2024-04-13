import styles from './UserAccountPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Login from '../../features/Login/Login.js'
import Profile from '../../features/Profile/Profile.js'
import Logout from '../../features/Logout/Logout.js'
import DeleteUser from '../../features/DeleteUser/DeleteUser.js'
import useToken from '../../features/useToken/useToken.js'

const LoginPage = () => {

  const { token, removeToken, setToken } = useToken();

  return (
    <div className={styles.account}>
      <h3>User Account form</h3>
      <h5>will allow login or create account</h5>
      <div>
        {!token || token ==="" || token === undefined ?  
        <div>
          <Login setToken={setToken} />
          <a href="/user">or create new user</a>
        </div>
        :(
        <div>
          <Profile token={token} setToken={setToken}/>
          <Logout token={removeToken}/>
          <DeleteUser token={token}/>
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