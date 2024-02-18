import styles from './RandomQuote.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getQuote, updateQuote } from '../../../redux/reducers/quoteReducer';

const RandomQuote = () => {
  const dispatch = useDispatch();

  const fetchQuote = async () => {
    try {
      const response = await fetch('http://localhost:5000/quote');
      const result = await response.text();
      const quoteResult = JSON.parse(result);
      dispatch(updateQuote(quoteResult[0]));
    } catch (error) {
      return error;
    }     
  }  
 
  useEffect(() => {
    fetchQuote();
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
