import styles from './Profile.module.scss';
import { useEffect } from 'react';
import { getUserData } from '../../utils/users';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/reducers/userReducer';
import { useState } from 'react';

const Profile = props => {

  const [loading, setLoading] = useState(true);
  const userData = useSelector(state => getUser(state));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      getUserData(dispatch).then(() => setLoading(false));
    }
  }, [dispatch, userData]);

  return (
    <div className={styles.profile}>
      <p>Your profile details: </p>
      {!userData ? (
        <p>Loading...</p>
      ) : (
        userData ? (
          <div>
            {userData.picture ? (
              <img src={`${(userData.google_user && userData.original_google_picture) ? '' : 'http://localhost:5000/static/uploaded_photos/'}${userData.picture}`} alt={userData.picture} />
            ) : (
              <p>No profile picture available</p>
            )}
            <p>Login: {userData.login}</p>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>About me: {userData.about}</p>
            <p>Creation Date: {userData.creation_date}</p>
            <p>Last Login: {userData.last_login}</p>
            <p>Last Activity: {userData.last_api_activity}</p>
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
        )
      )}
    </div>
  );
}

export default Profile;
