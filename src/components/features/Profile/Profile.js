import styles from './Profile.module.scss';
import { useEffect } from 'react';
import { getUserData } from '../../utils/users';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/reducers/userReducer';

const Profile = props => {

  const userData = useSelector(state => getUser(state));
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData(dispatch, props);
  }, [dispatch, props]);

  //console.log(userData)
  //console.log(localStorage.token)

  return (
    <div className={styles.profile}>
      <p>Your profile details: </p>
      {userData != null ? (
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
      )}
    </div>
  );
}

export default Profile;
