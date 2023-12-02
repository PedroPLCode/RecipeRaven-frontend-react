import styles from './AboutPage.module.scss';
import { infoData } from '../../../settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCode, faCodeCompare, faCamera } from '@fortawesome/free-solid-svg-icons';

const AboutPage = () => {

  const myGitHub = infoData.myGitHub;
  const LinkToApi = infoData.LinkToApi;  
  const LinkToPexels = infoData.pexels;

    return (
      <div className={styles.about}>
        <h3>Food Search App</h3>
        <h5>simple app written in ReactJS</h5>
        <h5>helps searching for new meal recipes</h5>
        <h5>I hope you will like it</h5>
        <h5>still under construction</h5>
        <h5>created by piotrek gaszczynski</h5>
        <a href='mailto: piotrek.gaszczynski@gmail.com'><p><FontAwesomeIcon icon={faEnvelope} /> send me a email</p></a>
        <a href={LinkToApi} target="_blank" rel="noreferrer"><p><FontAwesomeIcon icon={faCode} /> powered by RapidApi</p></a>
        <a href={LinkToPexels} target="_blank" rel="noreferrer"><p><FontAwesomeIcon icon={faCamera} /> background picture</p></a>
        <a href={myGitHub} target="_blank" rel="noreferrer"><p><FontAwesomeIcon icon={faCodeCompare} /> my github profile</p></a>
      </div>
    );
  }
    
  export default AboutPage;
