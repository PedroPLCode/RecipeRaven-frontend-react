import { useState } from 'react';
import axios from "axios";

const Login = props => {

  const [loginForm, setloginForm] = useState({
    login: "",
    password: ""
  })

  const logMeIn = event => {
    axios({
      method: "POST",
      url:"/token",
      baseURL: 'http://127.0.0.1:5000',
      data:{
        login: loginForm.login,
        password: loginForm.password
       }
    })
    .then((response) => {
      props.setToken(response.data)
    })
    .catch((error) => {
      if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
    })
  
    setloginForm(({
      login: "",
      password: ""}))
      event.preventDefault()
    }
  
  const handleChange = event => {
    const {value, name} = event.target
    setloginForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  return (
    <div>
      <h1>Login</h1>
      <form className="login">
        <input onChange={handleChange} 
               type="login"
               text={loginForm.login} 
               name="login" 
               placeholder="Login" 
               value={loginForm.login} />
        <input onChange={handleChange} 
               type="password"
               text={loginForm.password} 
               name="password" 
               placeholder="Password" 
               value={loginForm.password} />
        <button onClick={logMeIn}>Submit</button>
      </form>
    </div>
  );
}
      
export default Login;