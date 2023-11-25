import styles from './AboutPage.module.scss';
import { infoData } from '../../../settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';

const AboutPage = () => {

  const myEmailLink = infoData.myEmail;
  const myGitHub = infoData.myGitHub;
  const LinkToApi = infoData.LinkToApi;

    return (
      <div className={styles.about}>
        <h3>Food Search App</h3>
        <h5>UNDER CONSTRUCTION</h5>
        <h5>UNDER CONSTRUCTION</h5>
        <h5>UNDER CONSTRUCTION</h5>
        <h5>Created by piotrek.gaszczynski@gmail.com</h5>
        <a href={myEmailLink}><p><FontAwesomeIcon icon={faEnvelope} /> send me a email</p></a>
        <a href={LinkToApi} target="_blank" rel="noreferrer"><p><FontAwesomeIcon icon={faCode} /> powered by RapidApi</p></a>
        <a href={myGitHub} target="_blank" rel="noreferrer"><p><FontAwesomeIcon icon={faCodeCompare} /> my github profile</p></a>
      </div>
    );
  }
    
  export default AboutPage;