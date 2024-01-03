import styles from './ReadyToSearch.module.scss';
import RandomQuote from '../RandomQuote/RandomQuote';

const ReadyToSearch = () => {

  return (
    <div className={styles.ready}>
      <h3>Almost ready</h3>
      <h5>Put ingredients you want to use</h5>
      <h5>And ingredients you dont't want</h5>
      <h5>Only letters and single spaces</h5>
      <h5>Select diet you are interested</h5>
      <h5>Maximum 3 butons at one time</h5>
      <h5>And click search button</h5>
      <RandomQuote />
    </div>
  );
}
    
export default ReadyToSearch;