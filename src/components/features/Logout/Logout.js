import styles from './Logout.module.scss'
import axios from "axios";
import { logOut } from '../../utils/users';
import { useNavigate } from 'react-router-dom';

const Logout = props => {

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut(props);
    navigate('/login');
  }

  return(
    <div className={styles.logout}>
      <button onClick={handleLogOut}> 
        Logout
      </button>
    </div>
  )
}

export default Logout;