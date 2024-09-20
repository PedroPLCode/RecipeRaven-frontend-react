import { updateFavorites } from '../redux/reducers/favoritesReducer';
import { settings } from '../settings';
import { displayApiResponseMessage } from './utlis.js'

export const fetchFavorites = async dispatch => {
  const url = `${settings.backendUrl}/api/favorites`;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.token,
    }
  }; 
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const finalResponse = await JSON.parse(result)
    if (response.ok) {
      dispatch(updateFavorites(finalResponse));
    }
    displayApiResponseMessage(response, finalResponse);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export const createFavorite = async payload => {
  const url = `${settings.backendUrl}/api/favorites`;
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token,
    },
    body: JSON.stringify(payload)
  }; 
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    displayApiResponseMessage(response, data);
    return data;
  } catch (error) {
    return { msg: 'Failed to add favorite' };
  }
};

export const deleteFavorite = async favoriteId => {
  const url = `${settings.backendUrl}/api/favorites/${favoriteId}`;
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
    displayApiResponseMessage(response, finalResult);
    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export const changeFavoriteStarred = async (favoriteId)=> {
  const url = `${settings.backendUrl}/api/favorites/starred/${favoriteId}`;
  const options = {
    method: 'POST',
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
    displayApiResponseMessage(response, result);
    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}