import styles from './Profile.module.scss'
import { useState } from 'react'
import axios from "axios";

const Profile = props => {

  const [profileData, setProfileData] = useState(null)
  
  const getData = () => {
    axios({
      method: "GET",
      url:"/user",
      baseURL: 'http://127.0.0.1:5000',
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      const res = response.data
      res.access_token && props.setToken(res.access_token)
      setProfileData(({
        profile_name: res.name,
        email: res.email,
        about: res.about,
        creationDate: res.creation_date,
        lastLogin: res.last_login}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  getData()
  
  return (
    <div className={styles.profile}>
      <p>Your profile details: </p>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>Email: {profileData.email}</p>
              <p>About me: {profileData.about}</p>
              <p>Creation Date: {profileData.creationDate}</p>
              <p>Last Login: {profileData.creationDate}</p>
              <a href="/user">Change user details</a>
            </div>
        }
    </div>
  );
}

export default Profile;