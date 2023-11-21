import styles from './AboutPage.module.scss';

const AboutPage = () => {

    return (
      <div className={styles.about}>
        <h3>About Page component</h3>
        <h5>UNDER CONSTRUCTION</h5>
        <h5>UNDER CONSTRUCTION</h5>
        <h5>UNDER CONSTRUCTION</h5>
        <h5>Created by piotrek.gaszczynski@gmail.com</h5>
        <a href="mailto: piotrek.gaszczynski@gmail.com"><p>send me a email</p></a>
        <a href="https://rapidapi.com/edamam/api/recipe-search-and-diet" target="_blank" rel="noreferrer"><p>powered by RapidApi</p></a>
        <a href="https://github.com/PedroPLCode/" target="_blank" rel="noreferrer"><p>my github profile</p></a>
      </div>
    );
  }
    
  export default AboutPage;