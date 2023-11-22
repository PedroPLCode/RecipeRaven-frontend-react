import { getSearchResponse } from '../../../redux/reducers/searchResponseReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import styles from './NoResultsPage.module.scss';

const NoResultsPage = () => {

  const searchResponse = useSelector(state => getSearchResponse(state));
  console.log('searchResponse', searchResponse);

    return (
      <div className={styles.noresults_page}>
        <h3>NoResultsPage component</h3>
        <h5>Unfortunately nothing was found</h5>
        <h5>Try to find something diffrent</h5>
        <h5>UNDER CONSTRUCTION</h5>
        <h5>UNDER CONSTRUCTION</h5>
      </div>
    );
  }
    
  export default NoResultsPage;