import styles from './Loading.module.scss';

const Loading = () => {

    return (
      <div className={styles.spinner}>
        <h3>SpinnerLoading component</h3>
        <h5>Fetching results...</h5>
        <h5>Please wait...</h5>
      </div>
    );
  }
    
  export default Loading;