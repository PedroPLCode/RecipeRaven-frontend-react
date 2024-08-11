import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Logout from '../../features/Logout/Logout';
import { getUser } from '../../../redux/reducers/userReducer';
import { getUserData } from '../../utils/users';
import { settings } from '../../../settings';
import clsx from 'clsx';
import styles from './NavBar.module.scss';
import footerStyles from '../Footer/Footer.module.scss'
//import useToken from '../../features/useToken/useToken';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => getUser(state));
  //const { token, removeToken, setToken } = useToken();

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [favoritesCount, setFavoritesCount] = useState(false);
  const [userName, setUserName] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    const footer = document.querySelector('footer');
    if (!isMenuOpen) {
      footer.classList.add(footerStyles.footer_hidden);
    } else {
      footer.classList.remove(footerStyles.footer_hidden);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.token) {
        await getUserData(dispatch); 
        await sleep(settings.delay); 
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFavoritesCount(userData ? userData.favorites_count : false);
    setUserName(userData ? userData.name : false);
  }, [userData]);

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

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    const footer = document.querySelector('footer');
    footer.classList.remove(footerStyles.footer_hidden);
  };

  return (
    <div className={clsx(styles.navbar, isMenuOpen ? styles.menu_open : styles.menu_closed, show ? '' : styles.navbar_hidden)}>
      <div className={clsx(styles.wrapper, isMenuOpen ? styles.menu_open : styles.menu_closed)}>
        <Nav.Link className={styles.link} as={NavLink} to="/" onClick={handleLinkClick}>
          Main
        </Nav.Link>
        <Nav.Link className={styles.link} as={NavLink} to="/search" onClick={handleLinkClick}>
          Search
        </Nav.Link>
        <Nav.Link className={styles.link} as={NavLink} to="/favorites" onClick={handleLinkClick}>
          Favorites { localStorage.token && userData ? `(${favoritesCount})` : null }
        </Nav.Link>
        <Nav.Link className={styles.link} as={NavLink} to="/board" onClick={handleLinkClick}>
          Board
        </Nav.Link>
        <Nav.Link className={styles.link} as={NavLink} to="/about" onClick={handleLinkClick}>
          About
        </Nav.Link>
        <Nav.Link className={styles.link} as={NavLink} to="/login" onClick={handleLinkClick}>
          { localStorage.token && userData ? `${userName} Account` : "Login" }
        </Nav.Link>
        { !localStorage.token || !userData ?
          <Nav.Link className={styles.link} as={NavLink} to="/createuser" onClick={handleLinkClick}>Create account</Nav.Link> :
          <Logout token={props.removeToken}/>
        }
      </div>
      <div className={clsx(styles.hamburger, { [styles.open]: isMenuOpen })} onClick={toggleMenu}>
        <div className={clsx({ [styles.open]: isMenuOpen })}></div>
        <div className={clsx({ [styles.open]: isMenuOpen })}></div>
        <div className={clsx({ [styles.open]: isMenuOpen })}></div>
      </div>
    </div>
  );
};

export default NavBar;
