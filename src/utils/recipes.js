import styles from '../components/pages/SearchPage/SearchPage.module.scss'
import { updateSearchResult } from '../redux/reducers/searchResultReducer';
import { updateLinkNextPage } from '../redux/reducers/nextResultsPageReducer';
import { updateServerResponse } from '../redux/reducers/serverResponseReducer';
import { updateServerError } from '../redux/reducers/serverErrorReducer'
import { elementsNames, settings } from '../settings';
import { ToastContainer, toast } from 'react-toastify';

const prepareArrayFromStringInput = string => {
  if (typeof string !== 'string') {
    return [];
  }

  const resultArray = []
  for(let element of string.split(" ")) {
    resultArray.push(element);
  }

  return resultArray
}

const prepareDietArray = (diet, dietKeys) => {
  if (!diet || !dietKeys) {
    return false;
  }

  const dietArray = []
  for(let singleKey of dietKeys) {
    if (diet[singleKey]['value']) {
      dietArray.push(diet[`${singleKey}`]['string']);
    }
  }

  if (dietArray.length === 0) {
    return false
  }

  return dietArray
}

export const validateInputString = (input, setInputOK) => {
  const inputFields = document.querySelectorAll(elementsNames.input);
  const regex = settings.regexIngredientsString; 
  if (!regex.test(input) || input.includes('  ')) {
    setInputOK(false);
    for (let singleInput of inputFields) {
      singleInput.classList.add(styles.input_error);
    }
    toast.warning('Input error - only letters and single space', {toastId: 6});
    return false;
  } else {
    for (let singleInput of inputFields) {
      singleInput.classList.remove(styles.input_error);
    }
    setInputOK(true);
    return true;
  }
}

export const fetchReceipes = async (ingredients, excluded, diet, dietKeys, random, setLoading, setSuccess, dispatch, setInputOK) => {
  const preparedRequestBody = {
    ingredients: ingredients ? ingredients : false,
    excluded: excluded ? prepareArrayFromStringInput(excluded) : false,
    params: diet && dietKeys ? prepareDietArray(diet, dietKeys) : false,
    random: random ? random : false,
  }
  const url = 'http://localhost:5000/api/search'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preparedRequestBody),
  }; 
  if (validateInputString(ingredients, setInputOK) && validateInputString(excluded, setInputOK)) {
    setLoading(true); 
    try {
      const response = await fetch(url, options);
      dispatch(updateServerResponse(response));
      const result = await response.text();
      const searchResponse = JSON.parse(result)
      dispatch(updateSearchResult(searchResponse));
      dispatch(updateLinkNextPage(searchResponse._links.next ? searchResponse._links.next : null));
      dispatch(updateServerError(false));
      setLoading(false); 
      setSuccess(true); 
      return result;
    } catch (error) {
      dispatch(updateServerError(error));
      setLoading(false); 
      setSuccess(true); 
    }
  }
}

export const fetchMoreReceipes = async (dispatch, setLoading, changeIndicator, setChangeIndicator, searchResult, link_next_page) => {
  setLoading(true);
  const preparedRequestBody = {
    link_next_page: link_next_page,
  }
  const url = 'http://localhost:5000/api/search'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(preparedRequestBody),
    }; 
  try {
    const response = await fetch(url, options);
    dispatch(updateServerResponse(response));
    const result = await response.text();
    const searchResponse = JSON.parse(result);
    searchResult['hits'].push(...searchResponse['hits']);
    searchResult['_links'] = searchResponse['_links'];
    searchResult['headers'] = searchResponse['headers'];
    dispatch(updateSearchResult(searchResult));
    dispatch(updateLinkNextPage(searchResponse._links.next ? searchResponse._links.next : null));
    setChangeIndicator(!changeIndicator);
    setLoading(false);
    return result;
  } catch (error) {
    dispatch(updateServerError(error));
    setLoading(false);
  }
}