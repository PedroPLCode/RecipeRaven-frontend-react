import styles from './Profile.module.scss';
import { useState, useEffect } from 'react';
import axios from "axios";
import { getUserData } from '../../utils/users';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUser } from '../../../redux/reducers/userReducer';

const Profile = props => {

  const userData = useSelector(state => getUser(state));
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData(dispatch, props);
  }, [dispatch, props]);

  return (
    <div className={styles.profile}>
      <p>Your profile details: </p>
      {userData ? (
        <div>
          {userData.picture ? (
            <img src={`http://localhost:5000/static/profile_pictures/${userData.picture}`} alt="profile" />
          ) : (
            <p>No profile picture available</p>
          )}
          <p>Login: {userData.login}</p>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>About me: {userData.about}</p>
          <p>Creation Date: {userData.creation_date}</p>
          <p>Last Login: {userData.last_login}</p>
          <p>Last API Activity: {userData.last_api_activity}</p>
          <a href="/favorites">Favorites: {userData.favorites_count}</a>
          <a href="/userposts">Posts: {userData.posts_count}</a>
          <a href="/usercomments">Comments: {userData.comments_count}</a>
          <a href="/changeuserdetails">Change user details</a>
          <a href="/changeuserpicture">Change user picture</a>
          <a href="/changeuserpassword">Change user password</a>
          <a href="/deleteuserpage">Delete This User</a>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
}

export default Profile;
