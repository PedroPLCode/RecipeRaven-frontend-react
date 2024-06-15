import styles from './ChangeUserPicture.module.scss';
import { useState } from 'react';
import RandomQuote from '../RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { changeUserDetails } from '../../utils/users'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const ChangeUserPicture = () => {
  const userData = useSelector(state => getUser(state));
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirm = async (event) => {
    event.preventDefault();
    setShowModal(false);

    if (file) {
      await handleChangeUserPicture(event);
    } else {
      alert('Error: no file selected');
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const [changeUserPictureForm, setChangeUserPictureForm] = useState({
    picture: null,
  });

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleChangeUserPicture = async (event) => {
    await changeUserDetails(event, changeUserPictureForm, setChangeUserPictureForm, dispatch);
    navigate('/login');
  }

  const handleFileChange = (event) => {
    setChangeUserPictureForm(prevNote => ({
      ...prevNote,
      picture: event.target.files[0]
    }));
    setFile(event.target.files[0]);
  }

  return (
    <div className={styles.user}>
      <h3>User Account form</h3>
      <h5>Change User Details</h5>
      {userData && userData.picture ? (
        <img src={`http://localhost:5000/static/profile_pictures/${userData.picture}`} alt="profile"/>
      ) : (
        <p>No profile picture available</p>
      )}
      <div>
        <form className="login">
          <input 
            onChange={handleFileChange} 
            id="picture"
            type="file"
            name="picture" 
          />
          <button type="button" onClick={() => setShowModal(true)}>Change User Picture</button>
          <ConfirmationModal 
            text="Profile picture change"
            show={showModal} 
            onClose={handleCancel} 
            onConfirm={handleConfirm} 
          />
        </form>
        <a href="/login">back</a>
      </div>
      <h5>still under construction</h5>
      <h5>any problems - mail me</h5>
      <a href='mailto: piotrek.gaszczynski@gmail.com'><p><FontAwesomeIcon icon={faEnvelope} /> send me a email</p></a>
      <RandomQuote />
    </div>
  );
}

export default ChangeUserPicture;
