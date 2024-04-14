import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from '../../redux/reducers/userReducer';

export const getUserData = async dispatch => {

  console.log(localStorage)
  
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
    dispatch(updateUser(finalResponse));
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

export const deleteUser = () => {
  axios({
    method: "DELETE",
    url:"/api/users",
    baseURL: 'http://127.0.0.1:5000',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
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
  })
}