import styles from './AboutPage.module.scss';
import { infoData } from '../../../settings';

const AboutPage = () => {

  const myEmailLink = infoData.myEmail;
  const myGitHub = infoData.myGitHub;
  const LinkToApi = infoData.LinkToApi;

    return (
      <div className={styles.about}>
        <h3>About Page component</h3>
        <h5>UNDER CONSTRUCTION</h5>
        <h5>UNDER CONSTRUCTION</h5>
        <h5>UNDER CONSTRUCTION</h5>
        <h5>Created by piotrek.gaszczynski@gmail.com</h5>
        <a href={myEmailLink}><p>send me a email</p></a>
        <a href={LinkToApi} target="_blank" rel="noreferrer"><p>powered by RapidApi</p></a>
        <a href={myGitHub} target="_blank" rel="noreferrer"><p>my github profile</p></a>
      </div>
    );
  }
    
  export default AboutPage;