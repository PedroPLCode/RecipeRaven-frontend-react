import styles from './Profile.module.scss';
import { useEffect } from 'react';
import { getUserData } from '../../utils/users';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/reducers/userReducer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = props => {

  const navigate = useNavigate();

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
            <a href="/favorites" onClick={(e) => { e.preventDefault(); navigate('/favorites'); }}>Favorites: {userData.favorites_count}</a>
            <a href="/userposts" onClick={(e) => { e.preventDefault(); navigate('/userposts'); }}>Posts: {userData.posts_count}</a>
            <a href="/usercomments" onClick={(e) => { e.preventDefault(); navigate('/usercomments'); }}>Comments: {userData.comments_count}</a>
            <a href="/changeuserdetails" onClick={(e) => { e.preventDefault(); navigate('/changeuserdetails'); }}>Change user details</a>
            <a href="/changeuserpicture" onClick={(e) => { e.preventDefault(); navigate('/changeuserpicture'); }}>Change user picture</a>
            {userData.google_user ? '' : <a href="/changeuserpassword" onClick={(e) => { e.preventDefault(); navigate('/changeuserpassword'); }}>Change user password</a>}
            <a href="/deleteuserpage" onClick={(e) => { e.preventDefault(); navigate('/deleteuserpage'); }}>{userData.google_user ? 'Remove account' : 'Delete user'}</a>
          </div>
        ) : (
          <p>No profile data available</p>
        )
      )}
    </div>
  );
}

export default Profile;
