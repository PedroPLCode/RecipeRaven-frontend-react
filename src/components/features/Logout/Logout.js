import styles from './Logout.module.scss'
import { logOut } from '../../../utils/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateUser } from '../../../redux/reducers/userReducer';

const Logout = props => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    logOut(props);
    dispatch(updateUser(false));
    navigate('/');
  }

  return(
    <div className={styles.logout}>
      <button onClick={handleLogOut}> 
        <p>Logout</p>
      </button>
    </div>
  )
}

export default Logout;