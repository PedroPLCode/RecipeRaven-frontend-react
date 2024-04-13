import styles from './Logout.module.scss'
import axios from "axios";

const Logout = props => {

  const logMeOut = () => {
    axios({
      method: "POST",
      url:"/logout",
      baseURL: 'http://127.0.0.1:5000',
    })
    .then((response) => {
       props.token()
       window.location.reload();
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return(
    <div className={styles.logout}>
      <button onClick={logMeOut}> 
        Logout
      </button>
    </div>
  )
}

export default Logout;