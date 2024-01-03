import styles from './RandomQuote.module.scss';
import { QuotesApiSettings } from '../../../settings';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getQuote, updateQuote } from '../../../redux/reducers/quoteReducer';

const RandomQuote = () => {
  const dispatch = useDispatch();
  const topics = QuotesApiSettings.selectedTopics;

  const getRandomTopic = array => {
    const min = 0;
    const max = array.length - 1;
    const randomIndex = getRandomIntInclusive(min, max);
    return array[randomIndex]
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const fetchQuotes = async () => {
    const mainUrl = QuotesApiSettings.mainUrl;
    const category = `${QuotesApiSettings.category}${getRandomTopic(topics)}`;
    const count = QuotesApiSettings.count;
    const url = `${mainUrl}${category}${count}`;
    const options = {
      method: QuotesApiSettings.methodGET,
      headers: QuotesApiSettings.headers,
    };
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const quoteResult = JSON.parse(result);
      dispatch(updateQuote(quoteResult[0]));
    } catch (error) {
      return error;
    }     
  }  
 
  useEffect(() => {
    fetchQuotes();
  }, []);
  const quote = useSelector(state => getQuote(state));

  return ( 
    <div className={styles.quote}> 
      <h6>"{quote.text}"</h6>
      <h6>Author: {quote.author}</h6>
    </div> 
  ); 
}

export default RandomQuote;
