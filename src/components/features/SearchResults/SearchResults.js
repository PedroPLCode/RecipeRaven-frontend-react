import { getSearchResult } from '../../../redux/reducers/searchResultReducer';
import { getServerResponse } from '../../../redux/reducers/serverResponseReducer';
import { getServerError } from '../../../redux/reducers/serverErrorReducer';
import { getFavorites } from '../../../redux/reducers/favoritesReducer';
import { getLinkNextPage } from '../../../redux/reducers/nextResultsPageReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { messages } from '../../../settings';
import { useEffect, useState } from 'react';
import { stylesParams, classNames } from '../../../settings';
import styles from './SeachResults.module.scss';
import clsx from 'clsx';
import SingleResult from '../SingleResult/SingleResult';
import ErrorPage from "../../features/ErrorPage/ErrorPage";
import NoResultsPage from "../../features/NoResultsPage/NoResultsPage";
import RandomQuote from '../RandomQuote/RandomQuote';
import FavoritesCheck from '../../features/FavoritesCheck/FavoritesCheck';
import { createFavorite } from '../../utils/favorites';
import { fetchMoreReceipes } from '../../utils/recipes';

const SearchResults = () => {

  const [changeIndicator, setChangeIndicator] = useState(false)
  const [loading, setLoading] = useState(false);
  const searchResult = useSelector(state => getSearchResult(state));
  const serverResponse = useSelector(state => getServerResponse(state));
  const serverError = useSelector(state => getServerError(state));
  const favorites = useSelector(state => getFavorites(state));
  const favoriteKeys = Object.keys(favorites);
  const link_next_page = useSelector(state => getLinkNextPage(state));

  useEffect(() => {
    const resultBoxes = document.querySelectorAll(classNames.resultBoxes);
    checkAndChangeResultBoxesVisibility(resultBoxes);
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;
    window.addEventListener('scroll', function (event) {
      currentScrollPosition = window.pageYOffset;
      if (resultBoxes) {
        if (previousScrollPosition !== currentScrollPosition) {
          checkAndChangeResultBoxesVisibility(resultBoxes);
        } 
      }
      previousScrollPosition = currentScrollPosition;
    });
  }, [changeIndicator]);

  const checkAndChangeResultBoxesVisibility = resultBoxes => {
    for (let singleBox of resultBoxes) {
      const rect = singleBox.getBoundingClientRect();
      if ((rect.top + (window.innerHeight ) ) >= 0 && rect.bottom <= (window.innerHeight * 2 || document.documentElement.clientHeight * 2)) {
        singleBox.style.filter = stylesParams.resultVisible.filter;
        singleBox.style.transform = stylesParams.resultVisible.transform;
      } else {
        singleBox.style.filter = stylesParams.resultHidden.filter;
        singleBox.style.transform = stylesParams.resultHidden.transform;
      }
    }
  }
  
  const prepDishesInfo = () => {
    for(let singleHit of searchResult.hits) {
      if (singleHit.totalTime === 0 || !singleHit.totalTime) {
        singleHit.totalTime = 15;
      }
      if (singleHit.dietLabels.length === 0) {
        singleHit.dietLabels.push(messages.noInfoProvided);
      }
      if (singleHit.cautions.length === 0) {
        singleHit.cautions.push(messages.noInfoProvided);
      }
      singleHit.calories = parseInt(singleHit.calories);
      if (singleHit.calories === 0 || !singleHit.calories) {
        singleHit.calories = messages.noInfoProvided;
      }
    }
  }

  const changeButtonStyle = id => {
    const activeButton = document.getElementById(id);
    if (activeButton !== null) {
      activeButton.style.backgroundPosition = stylesParams.clickedButtonBckr;
    }
  }

  const handlefetchMoreReceipes = (dispatch, setLoading, changeIndicator, setChangeIndicator, searchResult, link_next_page) => {
    fetchMoreReceipes(dispatch, setLoading, changeIndicator, setChangeIndicator, searchResult, link_next_page)
  }

  const bottomButtonText = loading ? 'Loading...' : 'Click to load more!';

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
          <h3>{messages.takeALook}</h3>
          {searchResult.hits.map(singleHit => (
            <SingleResult key={singleHit.calories}
                          singleHit={singleHit} 
                          favorites={favorites} 
                          changeButtonStyle={changeButtonStyle} 
                          createFavorite={createFavorite} />
          ))}
          {searchResult.count > searchResult.hits.length ?
            <h3 className={clsx(styles.button_nextpage, loading ? styles.loading : '')} 
              onClick={handlefetchMoreReceipes}>{bottomButtonText}</h3> : ''}
          <FavoritesCheck changeButtonStyle={changeButtonStyle} 
                          favorites={favorites} 
                          favoriteKeys={favoriteKeys}/>
          <RandomQuote />
        </div>
    )}
  }
}

export default SearchResults;