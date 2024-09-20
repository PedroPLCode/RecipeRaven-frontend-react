import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserData, resendConfirmationEmail } from '../../../utils/users';
import { getUser } from '../../../redux/reducers/userReducer';
import { settings } from '../../../settings';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const userData = useSelector(state => getUser(state));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      getUserData(dispatch).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, userData]);

  const emailConfirmed = userData ? userData.email_confirmed : localStorage.getItem('email_confirmed') === 'true';

  console.log(userData)
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!emailConfirmed) {
    return (
      <div className={styles.profile}>
        <p>Email not confirmed. <button onClick={resendConfirmationEmail}>Resend activation link</button>.</p>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <p>Your profile details:</p>
      {!userData ? (
        <p>No profile data available</p>
      ) : (
        <div>
          {userData.picture ? (
            <img
              src={`${(userData.google_user && userData.original_google_picture) ? '' : `${settings.backendUrl}/static/uploaded_photos/`}${userData.picture}`}
              alt="Profile"
            />
          ) : (
            <p>No profile picture available</p>
          )}
          <div>
            <p>Login:<br/>{userData.login}</p>
            <p>Name:<br/>{userData.name}</p>
            <p>Email:<br/>{userData.email}</p>
            <p>Details:<br/>{userData.about}</p>
          </div>
  
          <a href="/favorites" onClick={(e) => { e.preventDefault(); navigate('/favorites'); }}>
            Favorites: {userData.favorites_count}
          </a>
          <a href="/userposts" onClick={(e) => { e.preventDefault(); navigate('/userposts'); }}>
            Posts: {userData.posts_count}
          </a>
          <a href="/usercomments" onClick={(e) => { e.preventDefault(); navigate('/usercomments'); }}>
            Comments: {userData.comments_count}
          </a>
          <a href="/changeuserdetails" onClick={(e) => { e.preventDefault(); navigate('/changeuserdetails'); }}>
            Change user details
          </a>
          <a href="/changeuserpicture" onClick={(e) => { e.preventDefault(); navigate('/changeuserpicture'); }}>
            Change user picture
          </a>
          {!userData.google_user && (
            <a href="/changeuserpassword" onClick={(e) => { e.preventDefault(); navigate('/changeuserpassword'); }}>
              Change user password
            </a>
          )}

          {userData.google_user ?
            <a href="/removegoogleuserpage" onClick={(e) => { e.preventDefault(); navigate('/removegoogleuserpage'); }}>
              Remove account
            </a>
            :
            <a href="/deleteuserpage" onClick={(e) => { e.preventDefault(); navigate('/deleteuserpage'); }}>
              Delete account
            </a>
          }

          <div>
            <p>Account Created:<br/>{userData.creation_date}</p>
            <p>Last Login:<br/>{userData.last_login}</p>
            <p>Last Activity:<br/>{userData.last_api_activity}</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default Profile;
