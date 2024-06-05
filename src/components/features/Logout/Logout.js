import styles from './Logout.module.scss'
import axios from "axios";
import { logOut } from '../../utils/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateUser, getUser } from '../../../redux/reducers/userReducer';

const Logout = props => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    logOut(props);
    dispatch(updateUser(false));
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