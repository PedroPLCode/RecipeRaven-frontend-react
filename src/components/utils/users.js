import axios from "axios";
import styles from '../../components/pages/CreateUserPage/CreateUserPage.module.scss'
import { classNames, elementsNames, parametersNames, messages, settings } from '../../settings';
import { useDispatch } from "react-redux";
import { updateUser } from '../../redux/reducers/userReducer';

export const validateLogin = async login => {
  const loginExists = await fetchCheckUserLogin(login);
  const inputField = document.getElementById('login');
  const regex = settings.regexLoginString
  //inny nizpozostale , niepowtarzalny, max 10 znaków
  if ((!await loginExists) && regex.test(login)) {
    inputField.classList.remove(styles.input_error);
    return true;
  } 
  inputField.classList.add(styles.input_error);
  return false;
}

export const validatePasswordInput = (password, field_id) => {
  // min 6 znakow, litery, cyfry, duze litery, znak specjalny
  const regex = settings.regexPasswordString;
  const passwordInputField = document.getElementById(field_id);
  if (!regex.test(password) && (passwordInputField)) {
    passwordInputField.classList.remove(styles.input_ok);
    return false
  }     
  passwordInputField.classList.add(styles.input_ok);
  return true;
}

export const passwordAndConfirmPasswordMatch = (password, confirmPassword) => {
  const passwordInputField = document.getElementById('password');
  const confirmPasswordInputField = document.getElementById('confirmPassword');
  if (password !== confirmPassword) {
    passwordInputField.classList.remove(styles.input_ok);
    confirmPasswordInputField.classList.remove(styles.input_ok);
    return false
  }
  passwordInputField.classList.add(styles.input_ok);
  confirmPasswordInputField.classList.add(styles.input_ok);
  return true
}

export const validateEmail = email => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const inputField = document.getElementById('email');
  if (regex.test(email)) {
    inputField.classList.add(styles.input_ok);
    return true;
  } else {
    // Obsługa ramki czerwonej i ostrzeżenia
    inputField.classList.remove(styles.input_ok);
    return false;
  }
};

export const fetchCheckUserLogin = async loginToCheck => {
  const url = `http://localhost:5000/api/logins?login=${loginToCheck}`;
  const options = {
    method: 'GET',
  }; 
  try {
    const response = await fetch(url, options);
    
    if (response.ok) {
      const data = await response.json();
      const loginAlreadyExists = data[loginToCheck];
      return loginAlreadyExists
    } else {
      console.error("Error fetching logins:", response.statusText);
    }
    
  } catch (error) {
    console.error("Error fetching logins:", error);
  }
};

export const getUserData = async (dispatch, props = null, setProfileData = null) => {
  const url = `http://localhost:5000/api/users`;
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
    const finalResponse = await response.json();
    const userData = finalResponse.user_data;

    if (props && finalResponse.access_token) {
      props.setToken(finalResponse.access_token);
    }

    dispatch(updateUser(finalResponse));

    if (setProfileData) {
      setProfileData({
        login: userData.login,
        profile_name: userData.name,
        email: userData.email,
        about: userData.about,
        creationDate: userData.creation_date,
        lastLogin: userData.last_login,
      });
    }

    return finalResponse;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return error;
  }
};


export const createUser = (event, createUserForm, setCreateUserForm)  => {
  axios({
    method: "POST",
    url: "/api/users",
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
}

export const changeUserDetails = async (event, changeUserDetailsForm, setChangeUserDetailsForm) => {
  event.preventDefault();
  
  const url = 'http://localhost:5000/api/users';
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token,
    },
    body: JSON.stringify(changeUserDetailsForm),
  }; 

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    setChangeUserDetailsForm({
      email: "",
      name: "",
      about: "",
    });
  } catch (error) {
    console.log(error);
  }
}

export const changeUserPassword = (event, changeUserPasswordForm, setChangeUserPasswordForm)  => {
  if (passwordAndConfirmPasswordMatch(changeUserPasswordForm.password, changeUserPasswordForm.confirmPassword)) {
    axios({
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token,
      },
      url:"/api/users",
      baseURL: 'http://127.0.0.1:5000',
      data: {
          oldPassword: changeUserPasswordForm.oldPassword,
          newPassword: changeUserPasswordForm.newPassword,
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
        
    setChangeUserPasswordForm(({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }))
    event.preventDefault()
  } else {
}
}

export const logOut = props => {
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

export const deleteUser = props => {
  axios({
    method: "DELETE",
    url:"/api/users",
    baseURL: 'http://127.0.0.1:5000',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
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
  })
}