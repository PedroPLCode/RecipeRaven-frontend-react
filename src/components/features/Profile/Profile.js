import styles from './Profile.module.scss'
import { useState } from 'react'
import axios from "axios";
import { getUserData } from '../../utils/users';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { updateUser, getUser } from '../../../redux/reducers/userReducer';

const Profile = props => {

  const userData = useSelector(state => getUser(state));
  console.log(userData)

  //const dispatch = useDispatch();

  //useEffect(() => {
  //  getUserData(dispatch, props);
  //}, []);
  console.log(userData)

  return (
    <div className={styles.profile}>
      <p>Your profile details: </p>
        {userData && <div>
              <img src={`http://localhost:5000/static/profile_pictures/${userData.picture}`} alt="profile picture"/>
              <p>Login: {userData.login}</p>
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>About me: {userData.about}</p>
              <p>Creation Date: {userData.creation_date}</p>
              <p>Last Login: {userData.last_login}</p>
              <p>Last API Activity: {userData.last_api_activity}</p>
              <p>Favorites: link {userData.favorites_count}</p>
              <p>Posts: link {userData.posts_count}</p>
              <p>Comments: link {userData.comments_count}</p>
              <a href="/changeuserdetails">Change user details</a>
              <a href="/changeuserpassword">Change user password</a>
            </div>
        }
    </div>
  );
}

export default Profile;