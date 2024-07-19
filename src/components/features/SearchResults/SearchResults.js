import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getSearchResult } from '../../../redux/reducers/searchResultReducer';
import { getServerResponse } from '../../../redux/reducers/serverResponseReducer';
import { getServerError } from '../../../redux/reducers/serverErrorReducer';
import { getFavorites } from '../../../redux/reducers/favoritesReducer';
import { getLinkNextPage } from '../../../redux/reducers/nextResultsPageReducer';
import { messages, stylesParams, classNames } from '../../../settings';
import styles from './SeachResults.module.scss';
import SingleResult from '../SingleResult/SingleResult';
import ErrorPage from "../../features/ErrorPage/ErrorPage";
import NoResultsPage from "../../features/NoResultsPage/NoResultsPage";
import RandomQuote from '../RandomQuote/RandomQuote';
import FavoritesCheck from '../../features/FavoritesCheck/FavoritesCheck';
import { createFavorite } from '../../utils/favorites';
import { fetchMoreReceipes } from '../../utils/recipes';

const SearchResults = () => {
  const dispatch = useDispatch();
  const [changeIndicator, setChangeIndicator] = useState(false);
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
    const handleScroll = () => {
      currentScrollPosition = window.pageYOffset;
      if (previousScrollPosition !== currentScrollPosition) {
        checkAndChangeResultBoxesVisibility(resultBoxes);
      }
      previousScrollPosition = currentScrollPosition;
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [changeIndicator]);

  const checkAndChangeResultBoxesVisibility = resultBoxes => {
    resultBoxes.forEach(singleBox => {
      const rect = singleBox.getBoundingClientRect();
      if ((rect.top + window.innerHeight) >= 0 && rect.bottom <= (window.innerHeight * 2 || document.documentElement.clientHeight * 2)) {
        singleBox.style.filter = stylesParams.resultVisible.filter;
        singleBox.style.transform = stylesParams.resultVisible.transform;
      } else {
        singleBox.style.filter = stylesParams.resultHidden.filter;
        singleBox.style.transform = stylesParams.resultHidden.transform;
      }
    });
  };

  const prepDishesInfo = hits => {
    return hits.map(singleHit => {
      if (!singleHit.totalTime) singleHit.totalTime = 15;
      if (!singleHit.dietLabels.length) singleHit.dietLabels.push(messages.noInfoProvided);
      if (!singleHit.cautions.length) singleHit.cautions.push(messages.noInfoProvided);
      singleHit.calories = parseInt(singleHit.calories) || messages.noInfoProvided;
      return singleHit;
    });
  };

  const changeButtonStyle = id => {
    const activeButton = document.getElementById(id);
    if (activeButton) {
      activeButton.style.backgroundPosition = stylesParams.clickedButtonBckr;
    }
  };

  const handleFetchMoreReceipes = () => {
    fetchMoreReceipes(dispatch, setLoading, changeIndicator, setChangeIndicator, searchResult, link_next_page);
  };

  const bottomButtonText = loading ? 'Loading...' : 'Click to load more!';

  if (!navigator.onLine || serverError || serverResponse.headers.ok === false) {
    return <ErrorPage navigator={navigator} serverResponse={serverResponse} serverError={serverError} />;
  } else if (searchResult.count === 0) {
    return <NoResultsPage />;
  } else {
    const preppedHits = prepDishesInfo(searchResult.hits);
    return (
      <div className={styles.results_wrapper}>
        <h3>Found {searchResult.count} receipes..</h3>
        <h3>{messages.takeALook}</h3>
        {preppedHits.map(singleHit => (
          <SingleResult key={singleHit.calories} singleHit={singleHit} favorites={favorites} changeButtonStyle={changeButtonStyle} createFavorite={createFavorite} />
        ))}
        {searchResult.count > searchResult.hits.length && (
          <h3 className={clsx(styles.button_nextpage, loading && styles.loading)} onClick={handleFetchMoreReceipes}>
            {bottomButtonText}
          </h3>
        )}
        <FavoritesCheck changeButtonStyle={changeButtonStyle} favorites={favorites} favoriteKeys={favoriteKeys} />
        <RandomQuote />
      </div>
    );
  }
};

export default SearchResults;