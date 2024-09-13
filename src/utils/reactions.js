import { settings } from '../settings';
import { displayApiResponseMessage } from './utlis.js'

export const createReaction = async (payload) => {
    const url = `${settings.backendUrl}/api/reactions`;
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
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      displayApiResponseMessage(response, result);
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  
  
  export const updateReaction = async (reactionId, payload) => {
    const url = `${settings.backendUrl}/api/reactions/${reactionId}`;
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (localStorage.token) {
      headers['Authorization'] = 'Bearer ' + localStorage.token;
    }
  
    const options = {
      method: 'PUT',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify(payload),
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      displayApiResponseMessage(response, result);
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  
  export const deleteReaction = async reactionId => {
    const url = `${settings.backendUrl}/api/reactions/${reactionId}`;
    const options = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token,
      },
    }; 
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const finalResult = await JSON.parse(result);
      displayApiResponseMessage(response, result);
      return finalResult;
    } catch (error) {
      console.error(error);
      return error;
    }
  }