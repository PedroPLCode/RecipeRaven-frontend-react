import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logout from '../../features/Logout/Logout';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { updateUser, getUser } from '../../../redux/reducers/userReducer';
import { getUserData } from '../../utils/users';
import { parametersNames, settings } from '../../../settings';
//import { getFavorites, updateFavorites } from '../../../redux/reducers/favoritesReducer';
import clsx from 'clsx';
import styles from './NavBar.module.scss';
import useToken from '../../features/useToken/useToken.js'

const NavBar = props => {

  const dispatch = useDispatch();
  const userData = useSelector(state => getUser(state));

  const { token, removeToken, setToken } = useToken();

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
 
  const [show, setShow] = useState(true);
  const [favoritesCount, setFavoritesCount] = useState(false);
  const [userName, setUserName] = useState(false);

  //const favorites = useSelector(state => getFavorites(state));
  //const favoriteKeys = Object.keys(favorites);

  useEffect(() => {
    const fetchData = async () => {
      await getUserData(dispatch); // Dispatch action to fetch user data
      await sleep(settings.delay); // Delay
      console.log(userData); // This will log userData after delay
    };

    fetchData();
  }, [dispatch]); // Adding dispatch as a dependency

  useEffect(() => {
    // This useEffect will run whenever userData changes
    setFavoritesCount(userData ? userData.favorites_count : false)
    setUserName(userData ? userData.name : false)
    console.log(userData); // Log userData whenever it updates
  }, [userData]);

  //(async()=>{
  //  getUserData(dispatch);
  //  await sleep(settings.delay);
  //})()

  //const getItemsLength = items => {
  //  return items.length;
  //}

  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;
    window.addEventListener('scroll', function (e) {
      currentScrollPosition = window.pageYOffset;
      if (previousScrollPosition - currentScrollPosition < 0) {
        setShow(false);
      } else if (previousScrollPosition - currentScrollPosition > 0) {
        setShow(true);
      }
      previousScrollPosition = currentScrollPosition;
    });
  }, []);

  return (
    <div className={clsx(styles.navbar, show ? '' : styles.navbar_hidden)}>
        <div className={styles.wrapper}>
          <Nav.Link className={styles.link} as={NavLink} to="/">
            Search
          </Nav.Link>
          <Nav.Link className={styles.link} as={NavLink} to="/favorites">
            Favorites { props.token ? "(" + favoritesCount + ")" : null }
          </Nav.Link>
          <Nav.Link className={styles.link} as={NavLink} to="/board">
            Board
          </Nav.Link>
          <Nav.Link className={styles.link} as={NavLink} to="/about">
            About
          </Nav.Link>
          
          <Nav.Link className={styles.link} as={NavLink} to="/login">
            { props.token ? "Your account (" + userName + ")" : "Login" }
          </Nav.Link>

          { !props.token ?
          <Nav.Link className={styles.link} as={NavLink} to="/createuser">Create account</Nav.Link> : <Logout token={removeToken}/>
          }

        </div>
    </div>
  );
};

export default NavBar;