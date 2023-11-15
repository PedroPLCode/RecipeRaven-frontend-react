import { PRIVATE_API_KEY } from "../../API_PRIVATE_KEY";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from "react-redux";
import { updateIngredients, getIngredients } from '../../redux/ingredientsReducer';
import { updateGlutenFree, getGlutenFree } from "../../redux/glutenFreeReducer";
import { updateVegan, getVegan } from "../../redux/veganReducer";
import { updateVegetarian, getVegetarian } from "../../redux/vegetarianReducer";
import { updateSearchResponse, getSearchResponse } from '../../redux/searchResponseReducer';
import SingleReceipe from "../SingleReceipe/SingleReceipe";

import { responseforTest } from "../../responseForTest";

const SearchOutput = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => getIngredients(state));
  const glutenFree = useSelector(state => getGlutenFree(state));
  const vegan = useSelector(state => getVegan(state));
  const vegetarian = useSelector(state => getVegetarian(state));
  const searchResponse = useSelector(state => getSearchResponse(state));

  const testResponse = JSON.parse(responseforTest);
  console.log(testResponse.hits);

  const prepareSearchString = (ingredients, vegan, vegetarian, glutenFree) => {
    let searchString = ingredients.replaceAll(' ', '%20');
    searchString += vegan ? '%20vegan' : '';
    searchString += vegetarian ? '%20vegetarian' : '';
    searchString += glutenFree ? '%20glutenfree' : '';
    console.log(searchString);
    return searchString;
  }

  const handleSearchButton = () => {
    const searchString = prepareSearchString(ingredients, vegan, vegetarian, glutenFree);
    const searchResult = searchReceipes(searchString);
    dispatch(updateSearchResponse(searchResult));
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
    dispatch(updateSearchResponse(result))
    return result;
  } catch (error) {
    console.error(error);
  }
}


 

  if (!searchResponse) {}

  return (
    <div className="m-5 d-flex flex-column justify-content-center align-items-center gap-4">
      <h3>SearchOutput component</h3>  
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h4>Search Parameters</h4>
        <h3>{ingredients}</h3>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h4>Search Results</h4>
        <h5>glutenfree {glutenFree.toString()}</h5>
        <h5>vegan {vegan.toString()}</h5>
        <h5>vegetarian {vegetarian.toString()}</h5>

        {testResponse.hits.map(singleHit => (
          <SingleReceipe {...singleHit}/>
        ))}

      </div>
    </div>
  );
}
  
export default SearchOutput;