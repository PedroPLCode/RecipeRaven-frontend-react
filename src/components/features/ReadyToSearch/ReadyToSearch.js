import styles from './ReadyToSearch.module.scss';

const ReadyToSearch = () => {

    return (
      <div className={styles.ready}>
        <h3>Almost ready</h3>
        <h5>Put ingredients you want to use</h5>
        <h5>Put ingredients you dont't to use</h5>
        <h5>Select diet you are interested</h5>
        <h5>And click search button</h5>
      </div>
    );
  }
    
  export default ReadyToSearch;