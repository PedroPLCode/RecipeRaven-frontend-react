import styles from './Logout.module.scss'
import { logOut } from '../../utils/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateUser } from '../../../redux/reducers/userReducer';
import { createNotification } from '../../utils/notifications';

const Logout = props => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    logOut(props);
    dispatch(updateUser(false));
    navigate('/');
    //createNotification('warning', 'Succecfully Logged Out', 4);
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