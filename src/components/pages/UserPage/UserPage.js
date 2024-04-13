import styles from './UserPage.module.scss';
import { useState, useEffect } from 'react';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getUser, updateUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import axios from "axios";

const UserPage = () => {

  const dispatch = useDispatch();

  const fetchUser = async () => {
    const url = `http://localhost:5000/user`;
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token,
      },
    }; 
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const finalResponse = await JSON.parse(result)
      dispatch(updateUser(finalResponse));
      return finalResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  const userData = useSelector(state => getUser(state));
  console.log(userData)

  const [createUserForm, setCreateUserForm] = useState({
    login: "",
    password: "",
    email: "",
    name: "",
    about: "",
  })

  const createUser = event => {
    if (createUserForm.password == createUserForm.confirmPassword) {
      axios({
        method: "POST",
        url:"/user",
        baseURL: 'http://127.0.0.1:5000',
        data: {
          login: createUserForm.login,
          password: createUserForm.password,
          email: createUserForm.email,
          name: createUserForm.name,
          about: createUserForm.about,
        }
        })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
        })
        
      setCreateUserForm(({
        login: "",
        password: "",
        email: "",
        name: "",
        about: "",
      }))
      event.preventDefault()
    } else {

    }
  }
  
  const handleChange = event => {
    const {value, name} = event.target
    setCreateUserForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  return (
    <div className={styles.user}>
      <h3>User Account form</h3>
      <h5>will allow login or create account</h5>
      <div>
        <form className="login">
          <input onChange={handleChange} 
                type="login"
                text={createUserForm.login} 
                name="login" 
                placeholder="Login" 
                value={createUserForm.login} />
          <input onChange={handleChange} 
                type="password"
                text={createUserForm.password} 
                name="password" 
                placeholder="Password" 
                value={createUserForm.password} />
          <input onChange={handleChange} 
                type="confirmPassword"
                text={createUserForm.confirmPassword} 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                value={createUserForm.confirmPassword} />
          <input onChange={handleChange} 
                type="email"
                text={createUserForm.email} 
                name="email" 
                placeholder="Email" 
                value={ userData ? userData.email : createUserForm.email } />
          <input onChange={handleChange} 
                type="name"
                text={createUserForm.name} 
                name="name" 
                placeholder="Name" 
                value={ userData ? userData.name : createUserForm.name } />
          <input onChange={handleChange} 
                type="about"
                text={createUserForm.about} 
                name="about" 
                placeholder="About" 
                value={ userData ? userData.about : createUserForm.about } />
          <button onClick={createUser}>{ userData ? "Change User Details" : "Create New User" }</button>
        </form>
        <a href="/login">login existing user</a>
      </div>
      <h5>still under construction</h5>
      <h5>any problems - mail me</h5>
      <a href='mailto: piotrek.gaszczynski@gmail.com'><p><FontAwesomeIcon icon={faEnvelope} /> send me a email</p></a>
      <RandomQuote />
    </div>
  );
}
      
export default UserPage;