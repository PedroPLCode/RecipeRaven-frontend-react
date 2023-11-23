import styles from './SearchPage.module.scss';
import BottomPart from "../../features/BottomPart/BottomPart";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { clsx } from "clsx";
import { updateIngredients, getIngredients } from '../../../redux/reducers/ingredientsReducer';
import { updateExcluded, getExcluded } from '../../../redux/reducers/excludedReducer';
import { updateDiet, getDiet } from "../../../redux/reducers/dietReducer";
import { updateSearchResult } from '../../../redux/reducers/searchResultReducer';
import { updateServerResponse } from '../../../redux/reducers/serverResponseReducer';
import { updateServerError } from '../../../redux/reducers/serverErrorReducer'
import { parametersNames, ApiSettings, messages } from '../../../settings';

//import { responseForTest } from "../../../responseForTest2";
//const response = JSON.parse(responseForTest);
//const response = undefined;

const SearchPage = () => {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector(state => getIngredients(state));
  const excluded = useSelector(state => getExcluded(state));
  const diet = useSelector(state => getDiet(state));
  const dietKeys = Object.keys(diet)

  const handleIngredientsSet = value => {
    dispatch(updateIngredients(value));
  }

  const handleExcludedSet = value => {
    dispatch(updateExcluded(value));
  }

  const handleDietClick = element => {
    if (element.classList.contains(styles.button)) {
      const clickedId = element.getAttribute(parametersNames.id);
      if (!element.classList.contains(styles.active)) {
        element.classList.add(styles.active);
        diet[clickedId][parametersNames.value] = true;
      } else {
        element.classList.remove(styles.active);
        diet[clickedId][parametersNames.value] = false;
      }
    dispatch(updateDiet(diet));
    }
  }

  const prepareSearchString = () => {
    let searchString = ''; 
    //ingredients.replaceAll(',', '');
    //ingredients.replaceAll('.', '');
    searchString += `${ApiSettings.question}${ingredients.replaceAll(' ', ApiSettings.and)}`;
    for(let singleKey of dietKeys) {
      diet[`${singleKey}`][parametersNames.value] ? searchString += `${ApiSettings.and}${diet[`${singleKey}`][parametersNames.string]}` : searchString += '';
    }
    return searchString;
  }

  const prepareExcludedString = () => {
    if (excluded !== undefined) {
      let excludedString = ''; 
      excludedString += `${ApiSettings.excluded}${excluded.replaceAll(' ', ApiSettings.and)}`;
      return excludedString;
    }
  }

  const searchReceipes = async () => {
    const searchString = prepareSearchString(ingredients);
    const exccludedString = prepareExcludedString(excluded);
    const url = `${ApiSettings.mainUrl}${searchString}${exccludedString}`;
    const options = {
	  method: ApiSettings.methodGET,
	  headers: ApiSettings.headers,
  };
  setLoading(true); 
  try {
    const response = await fetch(url, options);
    console.log(response); //temp here
    dispatch(updateServerResponse(response));
    const result = await response.text();
    const searchResponse = JSON.parse(result)
    dispatch(updateSearchResult(searchResponse));
    setLoading(false); 
    setSuccess(true); 
    return result;
  } catch (error) {
    console.log(error); //temp here
    dispatch(updateServerError(error));
    setLoading(false); 
    setSuccess(true); 
  }
}

  return (
    <article className={styles.searchpage}>
      <div className={styles.wrapper}>
        <h3>Food Search component</h3>  
        <form className={styles.form}>
          <div className={styles.form_inner}>
            <input type="text" placeholder={messages.putIngredients} title={messages.putIngredients} value={ingredients} onChange={event => handleIngredientsSet(event.target.value)} />
            <input type="text" placeholder={messages.putExcluded} title={messages.putExcluded} value={excluded} onChange={event => handleExcludedSet(event.target.value)} />  
            <div className={styles.diet} >
              {dietKeys.map(singleKey => (
                <div className={clsx(styles.button, diet[singleKey][parametersNames.value] ? styles.active : '')} id={diet[`${singleKey}`][parametersNames.id]} onClick={event => handleDietClick(event.target)} >
                  <p onClick={event => handleDietClick(event.target.parentElement)}>{diet[`${singleKey}`][parametersNames.description]}</p>
                </div>))}
            </div>
          </div> 
        </form>
        <div onClick={searchReceipes} className={styles.search_button} variant="primary">
            <p>Search</p>
        </div>
          <BottomPart loading={loading} success={success} />
      </div>
    </article>
  );
}

export default SearchPage;