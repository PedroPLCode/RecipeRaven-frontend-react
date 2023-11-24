import styles from './Footer.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//<FontAwesomeIcon icon="fa-solid fa-arrow-up" />   
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
    <div className={clsx(styles.footer, show ? '' : styles.footer_hidden)}>
      <a className={styles.link} href="#top">
        <p>TOP</p>
      </a>
    </div>
  )
}

export default Footer;