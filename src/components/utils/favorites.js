import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getFavorites, updateFavorites } from '../../redux/reducers/favoritesReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
//import dispatch from '../pages/FavoritesPage/FavoritesPage'

export const fetchFavorites = async dispatch => {
  const url = `http://localhost:5000/api/favorites/`;
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
    dispatch(updateFavorites(finalResponse));
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const createFavorite = async payload => {
  const url = `http://localhost:5000/api/favorites/`;
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
    return data;
  } catch (error) {
    console.log(error);
    return { msg: 'Failed to add favorite' };
  }
};

export const deleteFavorite = async favoriteId => {
  const url = `http://localhost:5000/api/favorites/${favoriteId}`;
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
    console.log(error);
    return error;
  }
}

