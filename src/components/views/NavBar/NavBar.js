import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';

const NavBar = () => {
  return (
    <div className={styles.navbar}>
        <div className={styles.wrapper}>
          <Nav.Link className={styles.link} as={NavLink} to="/">
            Search
          </Nav.Link>
          <Nav.Link className={styles.link} as={NavLink} to="/favorite">
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