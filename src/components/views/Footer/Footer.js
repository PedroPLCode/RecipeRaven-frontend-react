import styles from './Footer.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    
  const [show, setShow] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', function (e) {
      if (window.pageYOffset > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <footer className={clsx(styles.footer, show ? '' : styles.footer_hidden)}>
      <a className={styles.link} href="#top">
        <FontAwesomeIcon icon={faArrowUp} />
      </a>
    </footer>
  )
}

export default Footer;