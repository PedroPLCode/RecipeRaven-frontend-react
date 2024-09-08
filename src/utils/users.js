import axios from "axios";
import stylesCreateUser from '../components/pages/CreateUserPage/CreateUserPage.module.scss'
import stylesChangeUserDetails from '../components/features/ChangeUserDetails/ChangeUserDetails.module.scss'
import stylesChangePassword from '../components/features/ChangeUserPassword/ChangeUserPassword.module.scss'
import stylesResetPassword from '../components/features/ResetPassword/ResetPassword.module.scss'
import { settings } from '../settings';
import { updateUser } from '../redux/reducers/userReducer';
import { toast } from 'react-toastify';

export const validateLogin = async (login) => {
  const inputField = document.getElementById('login');
  const regex = settings.regexLoginString;
  if (!regex.test(login)) {
    inputField.classList.add(stylesCreateUser.input_error);
    return false;
  }

  const loginExists = await fetchCheckUserLogin(login);
  if (loginExists) {
    inputField.classList.add(stylesCreateUser.input_error);
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
      passwordInputField.classList.remove(stylesResetPassword.input_ok);
    }
    return false
  } else {
    if (passwordInputField) {
      passwordInputField.classList.add(stylesCreateUser.input_ok);
      passwordInputField.classList.add(stylesChangePassword.input_ok);
      passwordInputField.classList.add(stylesResetPassword.input_ok);
    }
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
      return false
    } else {
      passwordInputField.classList.add(stylesCreateUser.input_ok);
      confirmPasswordInputField.classList.add(stylesCreateUser.input_ok);
      passwordInputField.classList.add(stylesChangePassword.input_ok);
      confirmPasswordInputField.classList.add(stylesChangePassword.input_ok);
      return true
    }
  }
}

export const validateEmail = async (email, currentEmail=false, checkIfExists=true) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailExists = await fetchCheckUserEmail(email);
  const inputField = document.getElementById('email');
  
  if (regex.test(email)) {
    inputField.classList.remove(!currentEmail ? stylesCreateUser.input_error : stylesChangeUserDetails.input_error);
    inputField.classList.add(!currentEmail ? stylesCreateUser.input_ok : stylesChangeUserDetails.input_ok);
  } else {
    inputField.classList.remove(!currentEmail ? stylesCreateUser.input_ok : stylesChangeUserDetails.input_ok);
    inputField.classList.remove(!currentEmail ? stylesCreateUser.input_error : stylesChangeUserDetails.input_error);
    return false;
  }
  
  if (checkIfExists) {
    if (!emailExists || email === currentEmail) {
      inputField.classList.remove(!currentEmail ? stylesCreateUser.input_error : stylesChangeUserDetails.input_error);
    } else {
      inputField.classList.add(!currentEmail ? stylesCreateUser.input_error : stylesChangeUserDetails.input_error);
      inputField.classList.remove(!currentEmail ? stylesCreateUser.input_ok : stylesChangeUserDetails.input_ok);
      return false;
    }
  }

  return true;
  
};

export const fetchCheckUserLogin = async loginToCheck => {
  const url = `${settings.backendUrl}/api/check_user?login=${loginToCheck}`;
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

export const fetchCheckUserEmail = async emailToCheck => {
  const url = `${settings.backendUrl}/api/check_user?email=${emailToCheck}`;
  const options = {
    method: 'GET',
  }; 
  try {
    const response = await fetch(url, options);
    
    if (response.ok) {
      const emailStatus = await response.json();
      return emailStatus['email_status']
    } else {
      console.error("Error fetching emails:", response.statusText);
    }
    
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
};

export const getUserData = async (dispatch, props = null) => {
  const url = `${settings.backendUrl}/api/users`;
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

  const url = `${settings.backendUrl}/api/userpasswdcheck`;
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
    return result.passwd_check === true;
  } catch (error) {
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

  const url = `${settings.backendUrl}/api/users`;
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


export const resendConfirmationEmail = async (event, form, setForm) => {
  event.preventDefault();

  const formData = new FormData();
  if (form.email) {
    formData.append('email', form.email);
  }

  const url = `${settings.backendUrl}/api/resend/`;
  const options = {
    method: 'POST',
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (response.ok) {
      toast.success('Confirmation email sent successfully. Please check your inbox.');
    } else {
      toast.warning(`Failed to send confirmation email: ${result.msg}`);
    }

    setForm({ email: "" });

  } catch (error) {
    toast.warning("An error occurred. Please try again later.", error);
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

  const url = `${settings.backendUrl}/api/users`;
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + localStorage.token,
    },
    body: formData,
  }; 

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    setChangeUserDetailsForm({
      email: "",
      name: "",
      about: "",
      picture: null,
    });
    getUserData(dispatch)
  } catch (error) {
  }
}


export const changeUserPassword = async (event, changeUserPasswordForm, setChangeUserPasswordForm) => {
  event.preventDefault();

  if (passwordAndConfirmPasswordMatch(changeUserPasswordForm.newPassword, changeUserPasswordForm.confirmNewPassword)) {
    const formData = new FormData();
    formData.append('oldPassword', changeUserPasswordForm.oldPassword);
    formData.append('newPassword', changeUserPasswordForm.password);

    const url = `${settings.backendUrl}/api/users`;
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

      if (response.ok) {
        toast.success('Succesfully change password', { toastId: 10 });
      } else {
        toast.warning('Error. password not changed', { toastId: 10 });
      }

      setChangeUserPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  } else {}
}


export const resetPassword = async (event, email) => {
  event.preventDefault();
  const url = `${settings.backendUrl}/api/resetpassword`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      toast.success('success')
    } 

  } catch (error) {
    console.error(error);
    toast.warning(error)
  }
}


export const logOut = props => {
  axios({
    method: "POST",
    url:"/logout",
    baseURL: `${settings.backendUrl}`,
  })
  .then((response) => {
     props.token()
     window.location.reload();
     localStorage.removeItem('token');
  }).catch((error) => {
    if (error.response) {
      toast.warning(error.response)
      toast.warning(error.response.status)
      toast.warning(error.response.headers)
      }
  })}

export const deleteUser = props => {
  axios({
    method: "DELETE",
    url:"/api/users",
    baseURL: `${settings.backendUrl}`,
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
      toast.warning(error.response)
      toast.warning(error.response.status)
      toast.warning(error.response.headers)
      }
  })
}