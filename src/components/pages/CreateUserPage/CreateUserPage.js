import React, { useState, useEffect } from 'react';
import styles from './CreateUserPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { validateLogin, validatePasswordInput, passwordAndConfirmPasswordMatch, validateEmail, createUser, getUserData } from '../../utils/users';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import Modal from 'react-modal';
import { getUser } from '../../../redux/reducers/userReducer';

// Ustawienie elementu root dla modalu
Modal.setAppElement('#root');

const CreateUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [photoURL, setPhotoURL] = useState('http://localhost:5000/static/uploaded_photos/anonym.png');
  const [file, setFile] = useState(null);
  const [createUserForm, setCreateUserForm] = useState({
    login: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    about: "",
    picture: null,
  });
  
  const webcamRef = React.useRef(null);

  useEffect(() => {
    if (localStorage.token) {
      getUserData(dispatch);
    }
  }, [dispatch]);

  const userData = useSelector(state => getUser(state));

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === 'login') {
      validateLogin(value);
    } else if (name === 'email') {
      validateEmail(value);
    } else if (name === 'password') {
      validatePasswordInput(value, 'password');
    } else if (name === 'confirmPassword') {
      passwordAndConfirmPasswordMatch(createUserForm.password, value);
    }

    setCreateUserForm(prevNote => ({
      ...prevNote,
      [name]: value,
    }));
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFile(file);
      setPhotoURL(url);
      setCreateUserForm(prevNote => ({
        ...prevNote,
        picture: file
      }));
    }
  }

  const capturePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot();
    fetch(screenshot)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `${createUserForm.login || 'user'}_captured.png`, { type: "image/png" });
        setCreateUserForm(prevNote => ({
          ...prevNote,
          picture: file
        }));
        setFile(file);
        const url = URL.createObjectURL(file);
        setPhotoURL(url);
        setShowCameraModal(false); // Zamknięcie modalu po zrobieniu zdjęcia
      });
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();

    const createUserValidators = [
      await validateLogin(createUserForm.login),
      validatePasswordInput(createUserForm.password, 'password'),
      validatePasswordInput(createUserForm.confirmPassword, 'confirmPassword'),
      passwordAndConfirmPasswordMatch(createUserForm.password, createUserForm.confirmPassword),
      validateEmail(createUserForm.email),
    ];

    if (createUserValidators.every(valid => valid)) {
      await createUser(event, createUserForm, setCreateUserForm);
      navigate('/login');
    } else {
      // Obsługa błędów walidacji
      console.log('Validation failed');
    }
  }

  return (
    <div className={styles.user}>
      <h3>User Account Form</h3>
      <h5>Will allow login or create account</h5>
      <div>
        <form className="login">
          <input
            onChange={handleChange}
            id="login"
            type="text"
            name="login"
            placeholder="Login"
            value={createUserForm.login}
          />
          <input
            onChange={handleChange}
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={createUserForm.password}
          />
          <input
            onChange={handleChange}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={createUserForm.confirmPassword}
          />
          <input
            onChange={handleChange}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={createUserForm.email}
          />
          <input
            onChange={handleChange}
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={createUserForm.name}
          />
          <input
            onChange={handleChange}
            id="about"
            type="text"
            name="about"
            placeholder="About"
            value={createUserForm.about}
          />
          
          <input
            onChange={handleFileChange}
            id="picture"
            type="file"
            name="picture"
          />
          <button type="button" onClick={() => setShowCameraModal(true)}>Or use Camera</button>

          {photoURL && <img src={photoURL} alt="Preview" style={{ width: '100px', height: '100px' }} />}

          <button onClick={handleCreateUser}>
            {userData ? "Change User Details" : "Create New User"}
          </button>
        </form>
        <a href="/login">Login existing user</a>
      </div>

      <h5>Still under construction</h5>
      <h5>Any problems - mail me</h5>
      <a href='mailto: piotrek.gaszczynski@gmail.com'><p><FontAwesomeIcon icon={faEnvelope} /> Send me an email</p></a>
      <RandomQuote />

      <Modal
        isOpen={showCameraModal}
        onRequestClose={() => setShowCameraModal(false)}
        contentLabel="Camera Modal"
        className={styles.cameraModal}
        overlayClassName={styles.cameraOverlay}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          width={300}
        />
        <button type="button" onClick={capturePhoto}>Capture Photo</button>
        <button onClick={() => setShowCameraModal(false)}>Close</button>
      </Modal>

    </div>
  );
}

export default CreateUserPage;