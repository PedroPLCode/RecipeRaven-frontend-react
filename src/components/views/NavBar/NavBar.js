import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './NavBar.module.scss';

const NavBar = () => {

  const [show, setShow] = useState(true);

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
            Favorite
          </Nav.Link>
          <Nav.Link className={styles.link} as={NavLink} to="/about">
            About
          </Nav.Link>
        </div>
    </div>
  );
};

export default NavBar;