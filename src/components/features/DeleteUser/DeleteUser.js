import styles from './DeleteUser.module.scss'
import axios from "axios";

const DeleteUser = props => {

  const deleteThisUser = () => {
    axios({
      method: "DELETE",
      url:"/user",
      baseURL: 'http://127.0.0.1:5000',
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      const res = response.data
      return res
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return(
    <div className={styles.delete}>
      <button onClick={deleteThisUser}> 
        Delete This User
      </button>
    </div>
  )
}

export default DeleteUser;