import styles from './SearchPage.module.scss';
import BottomPart from "../../features/BottomPart/BottomPart";
import React, { useState } from "react";
import { Offline, Online, Detector } from "react-detect-offline";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { clsx } from "clsx";
import { updateIngredients, getIngredients } from '../../../redux/reducers/ingredientsReducer';
import { updateExcluded, getExcluded } from '../../../redux/reducers/excludedReducer';
import { updateDiet, getDiet } from "../../../redux/reducers/dietReducer";
import { getSearchResult, updateSearchResult } from '../../../redux/reducers/searchResultReducer';
import { updateServerResponse } from '../../../redux/reducers/serverResponseReducer';
import { updateServerError } from '../../../redux/reducers/serverErrorReducer'
import { classNames, elementsNames, parametersNames, ApiSettings, messages } from '../../../settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {

  const dispatch = useDispatch();
  const searchResult = useSelector(state => getSearchResult(state));
  const ingredients = useSelector(state => getIngredients(state));
  const excluded = useSelector(state => getExcluded(state));
  const diet = useSelector(state => getDiet(state));
  const dietKeys = Object.keys(diet)

  const [inputOK, setInputOK] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(searchResult ? true : false);

  const handleIngredientsSet = value => {
    validateInputString(value);
    dispatch(updateIngredients(value));
  }

  const handleExcludedSet = value => {
    validateInputString(value);
    dispatch(updateExcluded(value));
  }

  const validateInputString = input => {
    const inputFields = document.querySelectorAll(elementsNames.input);
    let regex = parametersNames.regexString; 
    if (!regex.test(input) || input.includes('  ')) {
      setInputOK(false);
      for (let singleInput of inputFields) {
        singleInput.classList.add(styles.input_error);
      }
      return false;
    } else {
      for (let singleInput of inputFields) {
        singleInput.classList.remove(styles.input_error);
      }
      setInputOK(true);
      return true;
    }
  }

  const handleDietClick = element => {
    if (element.classList.contains(styles.button)) {
      const clickedId = element.getAttribute(parametersNames.id);
      if (!element.classList.contains(styles.active)) {
        const selectedButtons = document.querySelectorAll(classNames.selectedButtons);
        if (selectedButtons.length <= 2) {
          element.classList.add(styles.active);
          diet[clickedId][parametersNames.value] = true;
        } 
      } else {
        element.classList.remove(styles.active);
        diet[clickedId][parametersNames.value] = false;
      }
    dispatch(updateDiet(diet));
    }
  }

  const prepareSearchString = () => {
    let searchString = ''; 
    searchString += `${ApiSettings.query}${ingredients.replaceAll(' ', ApiSettings.and)}`;
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
    if (validateInputString(ingredients) && validateInputString(excluded)) {
      setLoading(true); 
      try {
        const response = await fetch(url, options);
        dispatch(updateServerResponse(response));
        const result = await response.text();
        const searchResponse = JSON.parse(result)
        dispatch(updateSearchResult(searchResponse));
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

  const headerString = inputOK ? messages.foodSearchApp : messages.inputWarning;

  return (
    <Detector
      render={({ online }) => (
        <article className={styles.searchpage}>
        <div className={styles.wrapper}>
          <h3 className={clsx(styles.main_header, inputOK ? '' : styles.header_error)}>{headerString}</h3>  
          <form className={styles.form}>
            <div className={clsx(styles.form_inner, !online ? styles.offline : '', !inputOK ? styles.offline : '', inputOK ? '' : styles.form_error)}>
              <input id="ingredients" type="text" placeholder={messages.putIngredients} 
                     title={messages.putIngredients} value={ingredients} 
                     onChange={event => handleIngredientsSet(event.target.value)} />
              <input id="excluded" type="text" placeholder={messages.putExcluded} 
                     title={messages.putExcluded} value={excluded} 
                     onChange={event => handleExcludedSet(event.target.value)} />  
              <div className={styles.diet} >
                {dietKeys.map(singleKey => (
                  <div key={singleKey} className={clsx(styles.button, diet[singleKey][parametersNames.value] ? styles.active : '')} 
                       id={diet[`${singleKey}`][parametersNames.id]} onClick={event => handleDietClick(event.target)} >
                    <p onClick={event => handleDietClick(event.target.parentElement)}>
                      {diet[`${singleKey}`][parametersNames.description]}
                    </p>
                  </div>))}
              </div>
            </div> 
          </form>
          <div onClick={searchReceipes} className={clsx(styles.search_button, !online ? styles.offline : '')} variant="primary">
              <p>
                <Online><FontAwesomeIcon icon={faMagnifyingGlass} /> {messages.search}</Online>
                <Offline><FontAwesomeIcon icon={faMagnifyingGlass} /> {messages.offline}</Offline>
              </p>
          </div>
            <BottomPart loading={loading} success={success} />
        </div>
      </article>
      )}
    />
  );
}

export default SearchPage;