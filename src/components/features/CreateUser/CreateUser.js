import { useState } from 'react';
import axios from "axios";

const CreateUser = props => {

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
    <div>
      <h1>Create User</h1>
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
               value={createUserForm.email} />
        <input onChange={handleChange} 
               type="name"
               text={createUserForm.name} 
               name="name" 
               placeholder="Name" 
               value={createUserForm.name} />
        <input onChange={handleChange} 
               type="about"
               text={createUserForm.about} 
               name="about" 
               placeholder="About" 
               value={createUserForm.about} />
        <button onClick={createUser}>Create</button>
      </form>
    </div>
  );
}
      
export default CreateUser;