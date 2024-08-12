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
import { updateRandom, getRandom } from "../../../redux/reducers/randomReducer";
import { getSearchResult } from '../../../redux/reducers/searchResultReducer';
import { classNames, parametersNames, messages } from '../../../settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { validateInputString } from '../../utils/recipes'
import { fetchReceipes } from '../../utils/recipes'
import { ToastContainer, toast } from 'react-toastify';

const SearchPage = () => {

  const dispatch = useDispatch();
  const searchResult = useSelector(state => getSearchResult(state));
  const ingredients = useSelector(state => getIngredients(state));
  const excluded = useSelector(state => getExcluded(state));
  const diet = useSelector(state => getDiet(state));
  const random = useSelector(state => getRandom(state));
  const dietKeys = Object.keys(diet)

  const [inputOK, setInputOK] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(searchResult ? true : false);

  const handleIngredientsSet = value => {
    validateInputString(value, setInputOK);
    dispatch(updateIngredients(value));
  }

  const handleExcludedSet = value => {
    validateInputString(value, setInputOK);
    dispatch(updateExcluded(value));
  }

  const handleRandomClick = element => {
    if (element.classList.contains(styles.button)) {
      if (element.classList.contains(styles.active)) {
        element.classList.remove(styles.active);
        random['value'] = false;
      } else {
        element.classList.add(styles.active);
        random['value'] = true;
      }
      dispatch(updateRandom(random['value']));
    }
  }

  const handleDietClick = element => {
    if (element.classList.contains(styles.button)) {
      const clickedId = element.getAttribute(parametersNames.id);
      if (!element.classList.contains(styles.active)) {
        const selectedButtons = document.querySelectorAll(classNames.selectedButtons);
        const maxButtonsClicked = Object.values(selectedButtons).some(button => button.id === 'random') ? 3 : 2;
        if (selectedButtons.length <= maxButtonsClicked) {
          element.classList.add(styles.active);
          diet[clickedId][parametersNames.value] = true;
        } else {
          toast.warning('Select max 3', {toastId: 4});
        }
      } else {
        element.classList.remove(styles.active);
        diet[clickedId][parametersNames.value] = false;
      }
    dispatch(updateDiet(diet));
    }
  }

  const handleSearchReceipes = async () => {
    await toast.promise(
      fetchReceipes(ingredients, excluded, diet, dietKeys, random['value'], setLoading, setSuccess, dispatch, setInputOK),
      {
        pending: 'Searching',
        success: 'Search completed',
        error: 'Search error',
      }, {toastId: 5}
    );
  };

  const headerString = inputOK ? messages.foodSearchApp : messages.inputWarning;

  return (
    <Detector
      render={({ online }) => (
        <article className={styles.searchpage}>
        <div className={styles.wrapper}>
          <h3 className={clsx(styles.main_header, inputOK ? '' : styles.header_error)}>{headerString}</h3>  
          <form className={styles.form}>
            <div className={clsx(styles.form_inner, inputOK ? '' : styles.error && styles.form_error)}>
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
                  <div className={clsx(styles.button, random ? styles.active : '')} 
                    id='random' onClick={event => handleRandomClick(event.target)} >
                    <p onClick={event => handleRandomClick(event.target.parentElement)}>
                      Random Search { random['value'] ? 'Active' : 'Inactive' }
                    </p>
                  </div>
              </div>
            </div> 
          </form>
          <div onClick={handleSearchReceipes} className={clsx(styles.search_button, online ? '' : styles.offline)} variant="primary">
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