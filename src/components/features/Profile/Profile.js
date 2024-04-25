import styles from './Profile.module.scss'
import { useState } from 'react'
import axios from "axios";
import { getUserData } from '../../utils/users';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Profile = props => {

  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    getUserData(dispatch, props, setProfileData);
  }, []);
  
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