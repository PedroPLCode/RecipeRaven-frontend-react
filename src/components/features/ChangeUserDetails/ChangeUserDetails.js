import styles from './ChangeUserDetails.module.scss';
import { useState, useEffect } from 'react';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getUserData, changeUserDetails, validateEmail } from '../../../utils/users'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

const ChangeUserDetails = () => {

  const [showModal, setShowModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirm = (event) => {
    setShowModal(false);
    handleChangeUserDetails(event);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const [changeUserDetailsForm, setChangeUserDetailsForm] = useState({
    email: "",
    name: "",
    about: "",
    picture: null,
  })

  let userData = null
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.token) {
          userData = await getUserData(dispatch);
        }
        if (userData) {
          setChangeUserDetailsForm({
            email: userData.email,
            name: userData.name,
            about: userData.about,
          });
          setCurrentEmail(userData.email)
          console.log(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
  }, []);

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleChange = event => {
    const {value, name} = event.target

    if (name === 'email') {
      validateEmail(value, currentEmail);
    } 

    setChangeUserDetailsForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  const handleChangeUserDetails = (event) => {
    if (!validateEmail(changeUserDetailsForm.email)) {
      toast('Error. Wrong email address', { toastId: 10 });
    } else {
      changeUserDetails(event, changeUserDetailsForm, setChangeUserDetailsForm, dispatch);
      toast('Success. Details changed', { toastId: 10 });
      navigate('/login')
    }
  }

  return (
    <div className={styles.user}>
      <h3>User Account form</h3>
      <h5>Change User Details</h5>
      <div>
        <form className="login">
          <input onChange={handleChange} 
                type="email"
                id="email"
                text={changeUserDetailsForm.email} 
                name="email" 
                placeholder="Email" 
                value={changeUserDetailsForm.email} />
          <input onChange={handleChange} 
                type="text"
                id="name"
                text={changeUserDetailsForm.name} 
                name="name" 
                placeholder="Name" 
                value={changeUserDetailsForm.name} />
          <input onChange={handleChange} 
                type="text"
                id="about"
                text={changeUserDetailsForm.about} 
                name="about" 
                placeholder="About" 
                value={changeUserDetailsForm.about} />
          <button type="button" onClick={() => setShowModal(true)}>Change User Details</button>
          <ConfirmationModal 
            text="User details change"
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
      
export default ChangeUserDetails;
