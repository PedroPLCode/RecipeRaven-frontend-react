import React, { useState, useEffect, useRef } from 'react';
import styles from './ChangeUserPicture.module.scss';
import RandomQuote from '../RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { changeUserDetails, getUserData } from '../../../utils/users';
import { ConfirmToast } from 'react-confirm-toast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Webcam from 'react-webcam';
import { settings } from '../../../settings';

const ChangeUserPicture = () => {

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [show, setShow] = useState(false)
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [file, setFile] = useState(null);
  const [pictureChanged, setPictureChanged] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.token) {
        await getUserData(dispatch);
      }
    };
    fetchData();
  }, [file, dispatch]);
  const userData = useSelector(state => getUser(state));

  const handleConfirm = async event => {

    if (file) {
      await handleChangeUserPicture(event);
    } else {
      toast.error('Error. No file selected', { toastId: 10 });
    }
  };

  const handleCancel = () => {
    setShow(false);
    setShowCameraModal(false);
  };

  const [changeUserPictureForm, setChangeUserPictureForm] = useState({
    picture: null,
  });

  const handleChangeUserPicture = async event => {
    await changeUserDetails(event, changeUserPictureForm, setChangeUserPictureForm, dispatch);
    navigate('/login');
    window.location.reload();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const fileSizeInMB = file.size / 1024 / 1024;
  
      if (fileSizeInMB > 2) {
        toast.error('Error. File size max 2MB', { toastId: 10 });
        return;
      }
  
      setChangeUserPictureForm(prevNote => ({
        ...prevNote,
        picture: file
      }));
      setFile(file);
      setPictureChanged(true);
      const url = URL.createObjectURL(file);
      setPhotoURL(url);
    }
  }

  const capturePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot();
    fetch(screenshot)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `${userData.login}_captured.png`, { type: "image/png" });
        setChangeUserPictureForm(prevNote => ({
          ...prevNote,
          picture: file
        }));
        setFile(file);
        setPictureChanged(true);
        const url = URL.createObjectURL(file);
        setPhotoURL(url);
        setShowCameraModal(false);
      });
  };

  const webcamRef = React.useRef(null);

  return (
    <div className={styles.user}>
      <h3>User Account form</h3>
      <h5>Change User Picture</h5>
      
      <div>
        <form>

          <div className={styles.picture_outer}> 
            {userData && userData.picture ? (
            (pictureChanged ? 
              <img src={photoURL} alt="Captured" style={{ width: '100%', maxWidth: '500px' }} />
              :
              <img src={`${userData.google_user && userData.original_google_picture ? '' : `${settings.backendUrl}/static/uploaded_photos/`}${userData.picture}`} alt={userData.picture} />
            )
            ) : (
            <p>No profile picture available</p>
            )}
            <div className={styles.picture_inner}>
              <input 
                ref={fileInputRef}
                onChange={handleFileChange} 
                id="picture"
                type="file"
                name="picture" 
              />

              <button
                type="button"
                className={styles.file_input_button}
                onClick={() => fileInputRef.current.click()}
              >
                Choose File
              </button>

              <button type="button" onClick={() => setShowCameraModal(true)}>Use camera</button>
            </div>
          </div>

          <button type="button" onClick={() => setShow(true)}>Use this Picture</button>

          <ConfirmToast
            asModal={true}
            customFunction={event => handleConfirm(event)}
            setShowConfirmToast={setShow}
            showConfirmToast={show}
          />

        </form>
        <a href="/login">back</a>
      </div>
      <h5>still under construction</h5>
      <h5>any problems - mail me</h5>
      <a href='mailto: piotrek.gaszczynski@gmail.com'><p><FontAwesomeIcon icon={faEnvelope} /> send me a email</p></a>
      <RandomQuote />
      <ToastContainer />

      <Modal 
        isOpen={showCameraModal} 
        onRequestClose={handleCancel} 
        contentLabel="Capture Photo"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
          }
        }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
        />
        <button type="button" onClick={capturePhoto}>Capture Photo</button>
        <button type="button" onClick={handleCancel}>Close</button>
      </Modal>
    </div>
  );
}

export default ChangeUserPicture;