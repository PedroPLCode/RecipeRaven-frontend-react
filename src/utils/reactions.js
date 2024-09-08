import { toast } from 'react-toastify';
import { settings } from '../settings';

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
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      console.error('Error creating Reaction:', error);
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
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        toast.success('Reaction updated succesfully.');
      }
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      console.error('Error creating comment:', error);
      toast.warning('There was an error updating Reaction. Please try again later.');
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
      const finalResult = await JSON.parse(result)
      return finalResult;
    } catch (error) {
      return error;
    }
  }