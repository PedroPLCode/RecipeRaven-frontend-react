import { updateQuote } from '../redux/reducers/quoteReducer';
import { messages, settings } from '../settings';

export const fetchQuote = async dispatch => {
  try {
    const response = await fetch(`${settings.backendUrl}/api/quote`);
    const result = await response.text();
    const quoteResult = JSON.parse(result);
    dispatch(updateQuote(quoteResult[0] ? quoteResult[0] : messages.defalutQuote));
  } catch (error) {
    return error;
  }     
}  