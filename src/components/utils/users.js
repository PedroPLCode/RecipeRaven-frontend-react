import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from '../../redux/reducers/userReducer';

export const getUserData = async (dispatch, props=null, setProfileData=null) => {
  
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
    const result = await response.text();
    const finalResponse = await JSON.parse(result)

    if (props) {
      finalResponse.access_token && props.setToken(finalResponse.access_token)
    }
    
    dispatch(updateUser(finalResponse));

    if (setProfileData) {
      setProfileData({
        login: finalResponse.login,
        profile_name: finalResponse.name,
        email: finalResponse.email,
        about: finalResponse.about,
        creationDate: finalResponse.creation_date,
        lastLogin: finalResponse.last_login});
    }

    return finalResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const createUser = (event, createUserForm, setCreateUserForm)  => {
  if (createUserForm.password == createUserForm.confirmPassword) {
    axios({
      method: "POST",
      url:"/api/users",
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
  if (changeUserPasswordForm.password == changeUserPasswordForm.confirmPassword) {
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