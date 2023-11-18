import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.wrapper}>
        <Link className={styles.link} to='https://github.com/PedroPLCode/' taget='_blank' >
          Pedro GitHub profile
        </Link>
      </div>
    </div>
  );
}

export default Footer;