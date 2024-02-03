import styles from './FavoritesCheck.module.scss';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getFavorites, updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { getSearchResult } from '../../../redux/reducers/searchResultReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { parametersNames, settings } from '../../../settings';
import PropTypes from "prop-types";

const FavoritesCheck = props => {

  const dispatch = useDispatch();
  const searchResult = useSelector(state => getSearchResult(state));

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const fetchFavorites = async () => {
    const url = `http://localhost:5000/favorites`;
    const options = {
      method: 'GET',
    }; 
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const finalResponse = await JSON.parse(result)
      dispatch(updateFavorites(finalResponse));
      return finalResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const checkIfAlreadyInFavorites = favorites => {
    for (let singleHit of searchResult.hits) {
      for (let singleKey of favoriteKeys) {
        if ((favorites[singleKey]['data']) && (singleHit.recipe.calories === favorites[singleKey]['data'][parametersNames.recipe][parametersNames.calories])) {
          props.changeButtonStyle(singleHit.recipe.calories);
        }
      }
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);
  const favorites = useSelector(state => getFavorites(state));
  const favoriteKeys = Object.keys(favorites);

  (async()=>{
    await sleep(settings.delay);
    checkIfAlreadyInFavorites(favorites);
  })()

  return (
    <div>
      <h3 className={styles.favorites_top} >That's it.. Lets search again!</h3>
      {props.favoriteKeys.length !== 0 ? <h3 className={styles.favorites_bottom}>{props.favoriteKeys.length} recipes saved in favorites</h3> : <h3>And let's save something in favorites</h3>}
    </div>
  )
}

FavoritesCheck.propTypes = {
    changeButtonStyle: PropTypes.func.isRequired,
    favoriteKeys: PropTypes.array.isRequired,
    favorites: PropTypes.array.isRequired,
};

export default FavoritesCheck;