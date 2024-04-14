import styles from './FavoritesCheck.module.scss';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getFavorites, updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { getSearchResult } from '../../../redux/reducers/searchResultReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { parametersNames, settings } from '../../../settings';
import PropTypes from "prop-types";
import { fetchFavorites } from '../../utils/favorites'

const FavoritesCheck = props => {

  const dispatch = useDispatch();
  const searchResult = useSelector(state => getSearchResult(state));

  console.log(searchResult)

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const checkIfAlreadyInFavorites = favorites => {
    for (let singleHit of searchResult.hits) {
      for (let singleKey of favoriteKeys) {
        if ((favorites[singleKey]['data']) && (singleHit.calories === favorites[singleKey]['data'][parametersNames.calories])) {
          props.changeButtonStyle(singleHit.calories);
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

  const bottomText = searchResult.count <= searchResult.hits.length ? "That's it.. Lets search again!" : "Click button to load more!";

  return (
    <div>
      <h3 className={styles.favorites_top}>{bottomText}</h3>
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