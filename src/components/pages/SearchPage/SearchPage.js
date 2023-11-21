import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { clsx } from "clsx";
import { updateIngredients, getIngredients } from '../../../redux/reducers/ingredientsReducer';
import { updateExcluded, getExcluded } from '../../../redux/reducers/excludedReducer';
import { updateDiet, getDiet } from "../../../redux/reducers/dietReducer";
import { updateResponse, getResponse } from '../../../redux/reducers/responseReducer';
import styles from './SearchPage.module.scss';

import { PRIVATE_API_KEY } from "../../../API_PRIVATE_KEY";
import ReadyToSearch from "../../features/ReadyToSearch/ReadyToSearch";
import ErrorPage from "../../features/ErrorPage/ErrorPage";
import SearchResults from "../../features/SearchResults/SearchResults";

import { responseForTest } from "../../../responseForTest2";
const testResponse = JSON.parse(responseForTest);
//const testResponse = undefined;

const SearchPage = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => getIngredients(state));
  const excluded = useSelector(state => getExcluded(state));
  const diet = useSelector(state => getDiet(state));
  const dietKeys = Object.keys(diet)
  const searchResponse = useSelector(state => getResponse(state));

  const handleIngredientsSet = value => {
    dispatch(updateIngredients(value));
  }

  const handleExcludedSet = value => {
    dispatch(updateExcluded(value));
  }

  const handleDietClick = element => {
    if (element.classList.contains(styles.button)) {
      const clickedId = element.getAttribute('id');
      if (!element.classList.contains(styles.active)) {
        element.classList.add(styles.active);
        diet[clickedId]['value'] = true;
      } else {
        element.classList.remove(styles.active);
        diet[clickedId]['value'] = false;
      }
    dispatch(updateDiet(diet));
    }
  }

  const prepareSearchString = () => {
    let searchString = ''; 
    //ingredients.replaceAll(',', '');
    //ingredients.replaceAll('.', '');
    searchString += `&q=${ingredients.replaceAll(' ', '%20')}`;
    for(let singleKey of dietKeys) {
      diet[`${singleKey}`]['value'] ? searchString += `%20${diet[`${singleKey}`]['string']}` : searchString += '';
    }
    return searchString;
  }

  const prepareExcludedString = () => {
    let excludedString = ''; 
    excludedString += `&excluded%5B0%5D=${excluded.replaceAll(' ', '%20')}`;
    return excludedString;
  }

  const searchReceipes = async (searchString, exccludedString) => {
    const url = `https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public${prepareSearchString(ingredients)}${prepareExcludedString(excluded)}`;
    const options = {
	  method: 'GET',
	  headers: {
		  'Accept-Language': 'en',
		  'X-RapidAPI-Key': PRIVATE_API_KEY,
		  'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
	  }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    dispatch(updateResponse(result))
    return result;
  } catch (error) {
    console.error(error);
  }
}

  return (
    <article className={styles.searchpage}>
      <div className={styles.wrapper}>
        <h3>Food Search component</h3>  
        <form className={styles.form}>
          <div className={styles.form_inner}>
            <input type="text" placeholder="Put selected ingredients here..." title="Put selected ingredients here" value={ingredients} onChange={event => handleIngredientsSet(event.target.value)} />
            <input type="text" placeholder="Put excluded ingredients here..." title="Put excluded ingredients here" value={excluded} onChange={event => handleExcludedSet(event.target.value)} />  
            <div className={styles.diet} >
              {dietKeys.map(singleKey => (
                <div className={clsx(styles.button, diet[singleKey]['value'] ? styles.active : '')} id={diet[`${singleKey}`][`id`]} onClick={event => handleDietClick(event.target)} >
                  <p onClick={event => handleDietClick(event.target.parentElement)}>{diet[`${singleKey}`][`description`]}</p>
                </div>))}
            </div>
          </div> 
        </form>
        <div className={styles.search_button} variant="primary">
            <p>Search</p>
        </div>
        {testResponse ? <SearchResults response={testResponse}/> : <ReadyToSearch/>}
      </div>
    </article>
  );
}

export default SearchPage;