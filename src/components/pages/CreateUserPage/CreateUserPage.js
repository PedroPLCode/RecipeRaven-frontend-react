import styles from './CreateUserPage.module.scss';
import { useState, useEffect } from 'react';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getUser, updateUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import axios from "axios";
import { validateLogin, validatePasswordInput, passwordAndConfirmPasswordMatch, validateEmail } from '../../utils/users';
import { getUserData, createUser } from '../../utils/users';

const CreateUserPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      getUserData(dispatch);
    }
  }, []);
  
  const userData = useSelector(state => getUser(state));

  const [createUserForm, setCreateUserForm] = useState({
    login: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    about: "",
    picture: null, // Dodaj pole na zdjęcie
  });
  
  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === 'login') {
      validateLogin(value);
    } else if (name === 'email') {
      validateEmail(value);
    } else if (name === 'password') {
      validatePasswordInput(value, 'password');
    } else if (name === 'confirmPassword') {
      //validatePasswordInput(value, 'confirmPassword');
      passwordAndConfirmPasswordMatch(createUserForm.password, value);
    }

    setCreateUserForm(prevNote => ({
      ...prevNote, 
      [name]: value,
      //confirmPassword: name === 'password' ? value : prevNote.confirmPassword
    }));
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCreateUserForm(prevNote => ({
      ...prevNote,
      picture: file
    }));
  }

  const handleCreateUser = async (event) => {
    event.preventDefault();
  
    const createUserValidators = [
      await validateLogin(createUserForm.login),
      validatePasswordInput(createUserForm.password, 'password'),
      //validatePasswordInput(createUserForm.confirmPassword, 'confirm_password'),
      passwordAndConfirmPasswordMatch(createUserForm.password, createUserForm.confirmPassword),
      validateEmail(createUserForm.email),
    ];
  
    console.log(createUserValidators);
  
    if (createUserValidators.every(valid => valid)) {
      const formData = new FormData();
      formData.append('login', createUserForm.login);
      formData.append('password', createUserForm.password);
      formData.append('confirmPassword', createUserForm.confirmPassword);
      formData.append('email', createUserForm.email);
      formData.append('name', createUserForm.name);
      formData.append('about', createUserForm.about);
      if (createUserForm.picture) {
        formData.append('picture', createUserForm.picture);
      }
  
      await axios.post('/api/create_user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      setCreateUserForm({
        login: "",
        password: "",
        confirmPassword: "",
        email: "",
        name: "",
        about: "",
        picture: null,
      });
    } else {
      // Handle errors
      console.log('Validation failed');
    }
  }
  

  return (
    <div className={styles.user}>
      <h3>User Account form</h3>
      <h5>will allow login or create account</h5>
      <div>
        <form className="login">
          <input 
            onChange={handleChange} 
            id="login"
            type="text"
            name="login" 
            placeholder="Login" 
            value={createUserForm.login} 
          />
          <input 
            onChange={handleChange} 
            id="password"
            type="password"
            name="password" 
            placeholder="Password" 
            value={createUserForm.password} 
          />
          <input 
            onChange={handleChange} 
            id="confirmPassword"
            type="password"
            name="confirmPassword" 
            placeholder="Confirm Password" 
            value={createUserForm.confirmPassword} 
          />
          <input 
            onChange={handleChange} 
            id="email"
            type="email"
            name="email" 
            placeholder="Email" 
            value={userData ? userData.email : createUserForm.email} 
          />
          <input 
            onChange={handleChange} 
            id="name"
            type="text"
            name="name" 
            placeholder="Name" 
            value={userData ? userData.name : createUserForm.name} 
          />
          <input 
            onChange={handleChange} 
            id="about"
            type="text"
            name="about" 
            placeholder="About" 
            value={userData ? userData.about : createUserForm.about} 
          />
          <input 
            onChange={handleFileChange} 
            id="picture"
            type="file"
            name="picture" 
          />
          <button onClick={handleCreateUser}>
            {userData ? "Change User Details" : "Create New User"}
          </button>
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

export default CreateUserPage;