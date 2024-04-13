import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getFavorites, updateFavorites } from '../../../redux/reducers/favoritesReducer';
import clsx from 'clsx';
import styles from './NavBar.module.scss';

const NavBar = props => {

  const [show, setShow] = useState(true);

  const favorites = useSelector(state => getFavorites(state));
  const favoriteKeys = Object.keys(favorites);

  const getItemsLength = items => {
    return items.length;
  }

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
            Favorites { props.token ? "(" + getItemsLength(favoriteKeys) + ")" : null }
          </Nav.Link>
          <Nav.Link className={styles.link} as={NavLink} to="/board">
            Board
          </Nav.Link>
          <Nav.Link className={styles.link} as={NavLink} to="/about">
            About
          </Nav.Link>
          <Nav.Link className={styles.link} as={NavLink} to="/login">
            { props.token ? "User" : "Login" }
          </Nav.Link>
        </div>
    </div>
  );
};

export default NavBar;