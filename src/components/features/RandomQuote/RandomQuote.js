import styles from './RandomQuote.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getQuote } from '../../../redux/reducers/quoteReducer';
import { fetchQuote} from '../../../utils/quote'

const RandomQuote = () => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    fetchQuote(dispatch);
  }, []);
  const quote = useSelector(state => getQuote(state));

  return ( 
    <div className={styles.quote}> 
      <h6>"{quote.text}"</h6>
      {quote.author ? <h6>{quote.author}</h6> : ''}
    </div> 
  ); 
}

export default RandomQuote;
