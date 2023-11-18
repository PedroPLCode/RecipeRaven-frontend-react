import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button } from "react-bootstrap";
import { updateIngredients, getIngredients } from '../../../redux/reducers/ingredientsReducer';
import { updateDiet, getDiet } from "../../../redux/reducers/dietReducer";
import { updateResponse, getResponse } from '../../../redux/reducers/responseReducer';
import styles from './SearchPage.module.scss';

import { PRIVATE_API_KEY } from "../../../API_PRIVATE_KEY";
import SearchResults from "../../features/SearchResults/SearchResults";

import { responseForTest } from "../../../responseForTest1";
const testResponse = JSON.parse(responseForTest);

const SearchPage = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => getIngredients(state));
  const diet = useSelector(state => getDiet(state));
  const dietKeys = Object.keys(diet)
  const searchResponse = useSelector(state => getResponse(state));

  const handleIngredientsSet = value => {
    dispatch(updateIngredients(value));
  }

  const handleDietClick = event => {
    const clickedDiv = event.target;
    const clickedId = clickedDiv.getAttribute('id');

    if (!clickedDiv.classList.contains(styles.active)) {
      clickedDiv.classList.add(styles.active);
      diet[clickedId]['value'] = true;
    } else {
      clickedDiv.classList.remove(styles.active);
      diet[clickedId]['value'] = false;
    }
    dispatch(updateDiet(diet));
    prepareSearchString();
  }

  const prepareSearchString = () => {
    let searchString = ''; 
    searchString += ingredients.replaceAll(' ', '%20');
    for(let singleKey of dietKeys) {
      diet[`${singleKey}`]['value'] ? searchString += `%20${diet[`${singleKey}`]['string']}` : searchString += '';
    }
    return searchString;
  }

  const searchReceipes = async searchString => {
    const url = `https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=${searchString}`;
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
        <form className="">
          <div className="">
            <h5>Ingredients</h5> 
            <input type="text" placeholder="Inigredients..." value={ingredients} onChange={event => handleIngredientsSet(event.target.value)} />
              <div className={styles.diet} >
                {dietKeys.map(singleKey => (
                  <div className={styles.button} id={diet[`${singleKey}`][`id`]} onClick={event => handleDietClick(event)} >
                    {diet[`${singleKey}`][`description`]}
                  </div>
  ))}
              </div>
          </div> 
        </form>
        <Button className='' variant="primary">
            SEARCH
        </Button>

        <SearchResults response={testResponse}/>
      </div>
    </article>
  );
}

export default SearchPage;