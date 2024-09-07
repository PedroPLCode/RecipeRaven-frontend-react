import styles from './FavoritesCheck.module.scss';
import { useEffect } from 'react';
import { getFavorites } from '../../../redux/reducers/favoritesReducer';
import { getSearchResult } from '../../../redux/reducers/searchResultReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { parametersNames, settings } from '../../../settings';
import PropTypes from "prop-types";
import { fetchFavorites } from '../../../utils/favorites'
import { useDispatch } from 'react-redux';

const FavoritesCheck = props => {

  const dispatch = useDispatch();

  const searchResult = useSelector(state => getSearchResult(state));

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const checkIfAlreadyInFavorites = favorites => {
    const favoritesMap = new Map();
  
    for (const key of favoriteKeys) {
      const favorite = favorites[key];
      if (favorite && favorite.data) {
        const keyStr = `${favorite.data[parametersNames.calories]}-${favorite.data[parametersNames.label]}`;
        favoritesMap.set(keyStr, true);
      }
    }
  
    for (const singleHit of searchResult.hits) {
      const hitKey = `${singleHit.calories}-${singleHit.label}`;
      if (favoritesMap.has(hitKey)) {
        props.changeButtonStyle(`${singleHit.calories + singleHit.totalTime + singleHit.url}`);
        singleHit.isFavorite = true;
      } else {
        singleHit.isFavorite = false;
      }
    }
  };

  useEffect(() => {
    fetchFavorites(dispatch);
  }, []);
  const favorites = useSelector(state => getFavorites(state));
  const favoriteKeys = Object.keys(favorites);

  (async()=>{
    await sleep(settings.delay);
    checkIfAlreadyInFavorites(favorites);
  })()

  const bottomText = ((searchResult.count <= searchResult.hits.length) || (props.random['value'])) ? "That's it.. Lets search again!" : "Click button to load more!";

  return (
    <div>
      <h3 className={styles.favorites_top}>{bottomText}</h3>
      {localStorage.token ? 
        (props.favoriteKeys.length !== 0 ? <h3 className={styles.favorites_bottom}>{props.favoriteKeys.length} recipes saved in favorites</h3> : <h3>And let's save something in favorites</h3>)
        :
        <a className={styles.favorites_login}href='/login'>Login to save in favorites</a>
      }
    </div>
  )
}

FavoritesCheck.propTypes = {
    changeButtonStyle: PropTypes.func.isRequired,
    favoriteKeys: PropTypes.array.isRequired,
    favorites: PropTypes.array.isRequired,
};

export default FavoritesCheck;