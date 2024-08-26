import axios from "axios";
import stylesCreateUser from '../../components/pages/CreateUserPage/CreateUserPage.module.scss'
import stylesChangePassword from '../../components/features/ChangeUserPassword/ChangeUserPassword.module.scss'
import { settings } from '../../settings';
import { updateUser } from '../../redux/reducers/userReducer';
import { ToastContainer, toast } from 'react-toastify';

export const validateLogin = async (login) => {
  const inputField = document.getElementById('login');
  const regex = settings.regexLoginString;
  if (!regex.test(login)) {
    inputField.classList.add(stylesCreateUser.input_error);
    console.log('Validation login failed: does not match regex');
    return false;
  }

  const loginExists = await fetchCheckUserLogin(login);
  if (loginExists) {
    inputField.classList.add(stylesCreateUser.input_error);
    console.log('Validation login failed: login already exists');
    return false;
  }

  inputField.classList.remove(stylesCreateUser.input_error);
  return true;
}


export const validatePasswordInput = (password, field_id=false) => {
  const regex = settings.regexPasswordString;
  const passwordInputField = field_id ? document.getElementById(field_id) : false;
  if (!regex.test(password)) {
    if (passwordInputField) {
      passwordInputField.classList.remove(stylesCreateUser.input_ok);
      passwordInputField.classList.remove(stylesChangePassword.input_ok);
    }
    console.log('Validation passwd failed');
    return false
  } else {
    if (passwordInputField) {
      passwordInputField.classList.add(stylesCreateUser.input_ok);
      passwordInputField.classList.add(stylesChangePassword.input_ok);
    }
    console.log('Validation passwd success');
    return true;
  }
}

export const passwordAndConfirmPasswordMatch = (password, confirmPassword) => {
  const passwordInputField = document.getElementById('password');
  const confirmPasswordInputField = document.getElementById('confirmPassword');
  if (passwordInputField && confirmPasswordInputField) {
    if (password !== confirmPassword) {
      passwordInputField.classList.remove(stylesCreateUser.input_ok);
      confirmPasswordInputField.classList.remove(stylesCreateUser.input_ok);
      passwordInputField.classList.remove(stylesChangePassword.input_ok);
      confirmPasswordInputField.classList.remove(stylesChangePassword.input_ok);
      console.log('Validation passwd match failed');
      return false
    } else {
      passwordInputField.classList.add(stylesCreateUser.input_ok);
      confirmPasswordInputField.classList.add(stylesCreateUser.input_ok);
      passwordInputField.classList.add(stylesChangePassword.input_ok);
      confirmPasswordInputField.classList.add(stylesChangePassword.input_ok);
      console.log('Validation passwd match success');
      return true
    }
  }
}

export const validateEmail = email => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const inputField = document.getElementById('email');
  if (regex.test(email)) {
    inputField.classList.add(stylesCreateUser.input_ok);
    return true;
  } else {
    inputField.classList.remove(stylesCreateUser.input_ok);
    console.log('Validation email failed');
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
      const loginStatus = await response.json();
      return loginStatus['login_status']
    } else {
      console.error("Error fetching logins:", response.statusText);
    }
    
  } catch (error) {
    console.error("Error fetching logins:", error);
  }
};

export const getUserData = async (dispatch, props = null) => {
  console.log(localStorage.token)
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
    
    if (!response.ok) {
      localStorage.removeItem('token');
    }

    const finalResponse = await response.json();
    const userData = finalResponse.user_data;

    if (props && finalResponse.access_token) {
      props.setToken(finalResponse.access_token);
    }

    dispatch(updateUser(userData));

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return error;
  }
};


export const checkUserPassword = async (form) => {
  const formData = new FormData();
  formData.append('password', form.oldPassword || form.password);

  const url = 'http://127.0.0.1:5000/api/userpasswdcheck';
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
    body: formData,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result.passwd_check === true;
  } catch (error) {
    console.error('Error:', error);
    return false; 
  }
};


export const createUser = async (event, createUserForm, setCreateUserForm) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('login', createUserForm.login);
  formData.append('password', createUserForm.password);
  if (createUserForm.email !== undefined) {
    formData.append('email', createUserForm.email);
  }
  if (createUserForm.name !== undefined) {
    formData.append('name', createUserForm.name);
  }
  if (createUserForm.about !== undefined) {
    formData.append('about', createUserForm.about);
  }
  if (createUserForm.picture) {
    formData.append('picture', createUserForm.picture);
  }

  const url = 'http://localhost:5000/api/users';
  const options = {
    method: 'POST',
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    setCreateUserForm({
      login: "",
      password: "",
      email: "",
      name: "",
      about: "",
      picture: null,
    });
  } catch (error) {
    console.error(error);
  }
}


export const changeUserDetails = async (event, changeUserDetailsForm, setChangeUserDetailsForm, dispatch) => {
  event.preventDefault();
  
  const formData = new FormData();
  if (changeUserDetailsForm.email !== undefined && validateEmail(changeUserDetailsForm.email)) {
    formData.append('email', changeUserDetailsForm.email);
  }
  if (changeUserDetailsForm.name !== undefined) {
    formData.append('name', changeUserDetailsForm.name);
  }
  if (changeUserDetailsForm.about !== undefined) {
    formData.append('about', changeUserDetailsForm.about);
  }
  if (changeUserDetailsForm.picture) {
    formData.append('picture', changeUserDetailsForm.picture);
  }

  const url = 'http://localhost:5000/api/users';
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + localStorage.token,
    },
    body: formData,
  }; 

  for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    setChangeUserDetailsForm({
      email: "",
      name: "",
      about: "",
      picture: null,
    });
    getUserData(dispatch)
  } catch (error) {
    console.error(error);
  }
}


export const changeUserPassword = async (event, changeUserPasswordForm, setChangeUserPasswordForm) => {
  event.preventDefault();

  if (passwordAndConfirmPasswordMatch(changeUserPasswordForm.newPassword, changeUserPasswordForm.confirmNewPassword)) {
    const formData = new FormData();
    formData.append('oldPassword', changeUserPasswordForm.oldPassword);
    formData.append('newPassword', changeUserPasswordForm.password);

    const url = 'http://127.0.0.1:5000/api/users';
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        toast.success('Succesfully change password', { toastId: 10 });
      } else {
        toast.success('Error. password not changed', { toastId: 10 });
        console.error(result);
      }

      setChangeUserPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Passwords do not match");
  }
}


export const resetPassword = async (event, email) => {
  event.preventDefault();

  //const formData = new FormData();
  //formData.append('email', email);

  const url = 'http://127.0.0.1:5000/api/resetpassword';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    if (response.ok) {
      // Handle successful response here
    } else {
      // Handle error response here
      console.error(result);
    }
  } catch (error) {
    console.error(error);
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
     localStorage.removeItem('token');
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
    localStorage.removeItem('token');
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })
}