import styles from './Profile.module.scss'
import { useState } from 'react'
import axios from "axios";
import { getUserData } from '../../utils/users';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Profile = props => {

  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null)
  
  const getData = () => {
    axios({
      method: "GET",
      url:"/api/users",
      baseURL: 'http://127.0.0.1:5000',
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      const res = response.data
      res.access_token && props.setToken(res.access_token)
      setProfileData(({
        login: res.login,
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

  useEffect(() => {
    const res = getUserData(dispatch, props, setProfileData);
  }, []);
  //getData()
  
  return (
    <div className={styles.profile}>
      <p>Your profile details: </p>
        {profileData && <div>
              <p>Login: {profileData.login}</p>
              <p>Name: {profileData.profile_name}</p>
              <p>Email: {profileData.email}</p>
              <p>About me: {profileData.about}</p>
              <p>Creation Date: {profileData.creationDate}</p>
              <p>Last Login: {profileData.creationDate}</p>
              <a href="/changeuserdetails">Change user details</a>
              <a href="/changeuserpassword">Change user password</a>
            </div>
        }
    </div>
  );
}

export default Profile;