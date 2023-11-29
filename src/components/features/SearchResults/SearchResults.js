import { getSearchResult } from '../../../redux/reducers/searchResultReducer';
import { getServerResponse } from '../../../redux/reducers/serverResponseReducer';
import { getServerError } from '../../../redux/reducers/serverErrorReducer';
import { getFavorites } from '../../../redux/reducers/favoritesReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { messages } from '../../../settings';
import { useEffect } from 'react';
import { stylesParams, classNames } from '../../../settings';
import styles from './SeachResult.module.scss';
import SingleResult from '../SingleResult/SingleResult';
import ErrorPage from "../../features/ErrorPage/ErrorPage";
import NoResultsPage from "../../features/NoResultsPage/NoResultsPage";
import FavoritesCheck from '../../features/FavoritesCheck/FavoritesCheck';

const SearchResults = () => {

  const searchResult = useSelector(state => getSearchResult(state));
  const serverResponse = useSelector(state => getServerResponse(state));
  const serverError = useSelector(state => getServerError(state));
  const favorites = useSelector(state => getFavorites(state));
  const favoriteKeys = Object.keys(favorites);

  useEffect(() => {
    const resultBoxes = document.querySelectorAll(classNames.resultBoxes);
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;
    window.addEventListener('scroll', function (event) {
      currentScrollPosition = window.pageYOffset;
      if (previousScrollPosition - currentScrollPosition < 0) {
        if (resultBoxes) {
          for (let singleBox of resultBoxes) {
            const rect = singleBox.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= ((window.innerHeight * 2) || (document.documentElement.clientHeight * 2))) {
              singleBox.classList.remove(classNames.resultBoxes);
              singleBox.classList.add(styles.visible);
            }
          }
        }
      }
      previousScrollPosition = currentScrollPosition;
    });
  }, []);
  
  const prepDishesInfo = () => {
    for(let singleHit of searchResult.hits) {
      if (singleHit.recipe.totalTime === 0 || !singleHit.recipe.totalTime) {
        singleHit.recipe.totalTime = 15;
      }
      if (singleHit.recipe.dietLabels.length === 0) {
        singleHit.recipe.dietLabels.push(messages.noInfoProvided);
      }
      singleHit.recipe.calories = parseInt(singleHit.recipe.calories);
      if (singleHit.recipe.calories === 0 || !singleHit.recipe.calories) {
        singleHit.recipe.calories = messages.noInfoProvided;
      }
    }
  }

  const changeButtonStyle = id => {
    const activeButton = document.getElementById(id);
    if (activeButton !== null) {
      activeButton.style.backgroundPosition = stylesParams.clickedButton;
    }
  }

  if (!navigator.onLine || serverError || serverResponse.headers.ok === false) {
    return <ErrorPage navigator={navigator} 
            serverResponse={serverResponse ? serverResponse : undefined}
            serverError={serverError ? serverError : undefined} />
  } else {
    if (searchResult.count === 0) {
      return <NoResultsPage />
    } else {
      prepDishesInfo();
      return (
        <div className={styles.results_wrapper}>
          <h3>Found {searchResult.count} receipes..</h3>
          {searchResult.count >= 21 ? <h3>{messages.showOnly20}</h3> : ''}
          <h3>{messages.takeALook}</h3>
          {searchResult.hits.map(singleHit => (
            <SingleResult key={singleHit.recipe.calories}
                          singleHit={singleHit} 
                          favorites={favorites} 
                          changeButtonStyle={changeButtonStyle} />
          ))}  
          <FavoritesCheck changeButtonStyle={changeButtonStyle} 
                          favorites={favorites} 
                          favoriteKeys={favoriteKeys}/>
        </div>
    )}
  }
}

export default SearchResults;