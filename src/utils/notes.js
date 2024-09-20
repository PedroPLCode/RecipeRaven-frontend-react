import { settings } from '../settings';
import { displayApiResponseMessage } from './utlis.js'

export const updateNote = async (payload) => {
  const url = `${settings.backendUrl}/api/notes`;
  const headers = {
    'Content-Type': 'application/json',
  };

  if (localStorage.token) {
    headers['Authorization'] = 'Bearer ' + localStorage.token;
  }

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const finalResult = await JSON.parse(result)
    displayApiResponseMessage(response, finalResult);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};