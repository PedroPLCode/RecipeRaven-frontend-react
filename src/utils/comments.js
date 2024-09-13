import { settings } from '../settings';
import { displayApiResponseMessage } from './utlis.js'

export const createComment = async (payload) => {
    const url = `${settings.backendUrl}/api/comments`;
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
  
  
  export const updateComment = async (commentId, payload) => {
    const url = `${settings.backendUrl}/api/comments/${commentId}`;
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

  
  export const deleteComment = async commentId => {
    const url = `${settings.backendUrl}/api/comments/${commentId}`;
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