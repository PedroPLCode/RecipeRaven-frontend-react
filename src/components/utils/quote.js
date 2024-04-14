import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getQuote, updateQuote } from '../../redux/reducers/quoteReducer';
import { messages } from '../../settings';

export const fetchQuote = async dispatch => {
  try {
    const response = await fetch('http://localhost:5000/api/quote/');
    const result = await response.text();
    const quoteResult = JSON.parse(result);
    dispatch(updateQuote(quoteResult[0] ? quoteResult[0] : messages.defalutQuote));
  } catch (error) {
    return error;
  }     
}  