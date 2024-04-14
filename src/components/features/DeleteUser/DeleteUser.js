import styles from './DeleteUser.module.scss'
import axios from "axios";
import { deleteUser } from '../../utils/users';

const DeleteUser = props => {

  return(
    <div className={styles.delete}>
      <button onClick={deleteUser}> 
        Delete This User
      </button>
    </div>
  )
}

export default DeleteUser;