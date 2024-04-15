import styles from './DeleteUser.module.scss'
import axios from "axios";
import { deleteUser } from '../../utils/users';
import { useNavigate } from 'react-router-dom';

const DeleteUser = props => {

  const navigate = useNavigate();

  const handleDeleteUser = () => {
    deleteUser(props);
    //localStorage.removeItem("token");
    navigate('/login');
  }

  return(
    <div className={styles.delete}>
      <button onClick={handleDeleteUser}> 
        Delete This User
      </button>
    </div>
  )
}

export default DeleteUser;