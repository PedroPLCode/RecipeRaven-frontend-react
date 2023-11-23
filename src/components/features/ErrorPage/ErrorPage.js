import styles from './ErrorPage.module.scss';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getServerError } from '../../../redux/reducers/serverErrorReducer';

const ErrorPage = props => {

  const serverError = useSelector(state => getServerError(state));
  console.log('serverError', serverError);  //temp here

    return (
      <div className={styles.error_page}>
        <h3>ErrorPage component</h3>
        <h5>Somehting went wrong</h5>
        <h5>headers.ok {props.serverResponse.headers.ok}</h5>
        <h5>headers.statusText {props.serverResponse.headers.statusText}</h5>
        <h5>headers.status {props.serverResponse.headers.status}</h5>
        <h5>serverError {serverError}</h5>
        <h5>UNDER CONSTRUCTION</h5>
      </div>
    );
  }
    
  export default ErrorPage;