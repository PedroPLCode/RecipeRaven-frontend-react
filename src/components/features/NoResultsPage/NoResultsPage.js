import styles from './NoResultsPage.module.scss';

const NoResultsPage = () => {

  return (
    <div className={styles.noresults_page}>
      <h3>No results</h3>
      <h5>All good. But unfortunately nothing was found</h5>
      <h5>Try to find something diffrent</h5>
    </div>
  );
}
    
export default NoResultsPage;