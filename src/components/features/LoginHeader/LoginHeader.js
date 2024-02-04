import axios from "axios";

const Header = props => {

  const logMeOut = () => {
    axios({
      method: "POST",
      url:"/logout",
      baseURL: 'http://127.0.0.1:5000',
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return(
    <header className="App-header">
      <button onClick={logMeOut}> 
        Logout
      </button>
    </header>
  )
}

export default Header;