import { PRIVATE_API_KEY } from "../../API_PRIVATE_KEY";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from "react-redux";
import { updateIngredients, getIngredients } from '../../redux/ingredientsReducer';
import { updateGlutenFree, getGlutenFree } from "../../redux/glutenFreeReducer";
import { getAlcoholFree, updateAlcoholFree } from "../../redux/alcoholFreeReducer";
import { updateSulfiteFree, getSulfiteFree } from "../../redux/sulfiteFreeReducer";
import { updateVegan, getVegan } from "../../redux/veganReducer";
import { updateVegetarian, getVegetarian } from "../../redux/vegetarianReducer";
import { updateKetoFriendly, getKetoFriendly } from "../../redux/ketoFriendlyReducer";
import { updateLowCarb, getLowCarb } from "../../redux/lowCarbReducer";
import { updateLowFat, getLowFat } from "../../redux/lowFatReducer";
import { updatePescatarian, getPescatarian } from "../../redux/pestacarianReducer";
import { updatePeenutFree, getPeenutFree } from "../../redux/peenutFreeReducer";
import { updateTreeNutFree, getTreeNutFree } from "../../redux/treeNutFreeReducer";
import { updateImmunoSuportive, getImmunoSuportive } from "../../redux/immunoSuportiveReducer";
import { updateDASH, getDASH } from "../../redux/DASHReducer";

import { updateSearchResponse, getSearchResponse } from '../../redux/searchResponseReducer';
import SingleReceipe from "../SingleReceipe/SingleReceipe";

import { responseForTest } from "../../responseForTest1";

const SearchOutput = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => getIngredients(state));
  const glutenFree = useSelector(state => getGlutenFree(state));
  const vegan = useSelector(state => getVegan(state));
  const vegetarian = useSelector(state => getVegetarian(state));
  const pescatarian = useSelector(state => getPescatarian(state));
  const alcoholFree = useSelector(state => getAlcoholFree(state));
  const sulfiteFree = useSelector(state => getSulfiteFree(state));
  const peenutFree = useSelector(state => getPeenutFree(state));
  const treeNutFree = useSelector(state => getTreeNutFree(state));
  const ketoFriendly = useSelector(state => getKetoFriendly(state));
  const lowCarb = useSelector(state => getLowCarb(state));
  const lowFat = useSelector(state => getLowFat(state));
  const immunoSupportive = useSelector(state => getImmunoSuportive(state));
  const DASH = useSelector(state => getDASH(state));

  const searchResponse = useSelector(state => getSearchResponse(state));

  const testResponse = JSON.parse(responseForTest);
  //console.log(testResponse.hits);

  const prepareSearchString = (ingredients) => {
    let searchString = ''; 
    searchString += ingredients.replaceAll(' ', '%20');
    vegan ? searchString += '%20vegan' : searchString += '';
    vegetarian ? searchString += '%20vegetarian' : searchString += '';
    pescatarian ? searchString += '%20pescatarian' : searchString += '';
    glutenFree ? searchString += '%20gluten-free' : searchString += '';
    alcoholFree ? searchString += '%20alcohol-free' : searchString += '';
    sulfiteFree ? searchString += '%20sulfite-free' : searchString += '';
    peenutFree ? searchString += '%20peenut-free' : searchString += '';
    treeNutFree ? searchString += '%20tree-nut-free' : searchString += '';
    ketoFriendly ? searchString += '%20keto-friendly' : searchString += '';
    lowCarb ? searchString += '%20low-carb' : searchString += '';
    lowFat ? searchString += '%20low-fat' : searchString += '';
    immunoSupportive ? searchString += '%20immuno-suportive' : searchString += '';
    DASH ? searchString += '%20dash' : searchString += '';
    console.log(searchString);
    return searchString;
  }

  const handleTest = (event, ingredients) => {
    event.preventDefault();
    prepareSearchString((ingredients));
  }

  const handleSearchButton = () => {
    //const searchString = prepareSearchString(ingredients);
    const searchResult = searchReceipes(prepareSearchString(ingredients));
    console.log(searchResult);
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
        <h5>alcoholfree {alcoholFree.toString()}</h5>

        {testResponse.hits.map(singleHit => (
          <SingleReceipe {...singleHit}/>
        ))}

      </div>
    </div>
  );
}
  
export default SearchOutput;