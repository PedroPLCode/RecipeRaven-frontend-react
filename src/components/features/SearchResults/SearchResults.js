import { addMoreSearchResults, updateSearchResult, getSearchResult } from '../../../redux/reducers/searchResultReducer';
import { updateServerResponse, getServerResponse } from '../../../redux/reducers/serverResponseReducer';
import { updateServerError, getServerError } from '../../../redux/reducers/serverErrorReducer';
import { getFavorites } from '../../../redux/reducers/favoritesReducer';
import { updateLinkNextPage, getLinkNextPage } from '../../../redux/reducers/nextResultsPageReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { messages } from '../../../settings';
import { useEffect } from 'react';
import { stylesParams, classNames } from '../../../settings';
import styles from './SeachResults.module.scss';
import SingleResult from '../SingleResult/SingleResult';
import ErrorPage from "../../features/ErrorPage/ErrorPage";
import NoResultsPage from "../../features/NoResultsPage/NoResultsPage";
import RandomQuote from '../RandomQuote/RandomQuote';
import FavoritesCheck from '../../features/FavoritesCheck/FavoritesCheck';

const SearchResults = () => {

  const dispatch = useDispatch();
  const searchResult = useSelector(state => getSearchResult(state));
  const serverResponse = useSelector(state => getServerResponse(state));
  const serverError = useSelector(state => getServerError(state));
  const favorites = useSelector(state => getFavorites(state));
  const favoriteKeys = Object.keys(favorites);
  const link_next_page = useSelector(state => getLinkNextPage(state));

  useEffect(() => {
    const resultBoxes = document.querySelectorAll(classNames.resultBoxes);
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;
    window.addEventListener('scroll', function (event) {
      currentScrollPosition = window.pageYOffset;
      if (resultBoxes) {
        if (previousScrollPosition !== currentScrollPosition) {
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
      }
      previousScrollPosition = currentScrollPosition;
    });
  }, []);
  
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

  const addFavoriteToAPI = async payload => {
    const url = `http://localhost:5000/favorites`;
    const options = {
      method: 'POST',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(payload)
    }; 
    fetch(url, options)
    .then(function(response) {
      return response;
    })
    .then(function(parsedResponse) {
    })
    .catch((error) => {
      console.log(error);
    });
  }


  const fetchMoreReceipes = async () => {
    const preparedRequestBody = {
      link_next_page: link_next_page,
    }
    const url = 'http://localhost:5000/more'
    const options = {
	    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(preparedRequestBody),
      }; 
    try {
      const response = await fetch(url, options);
      dispatch(updateServerResponse(response));
      const result = await response.text();
      const searchResponse = JSON.parse(result);
      console.log(searchResponse)
      searchResult['hits'].push(...searchResponse['hits']);
      searchResult['_links'] = searchResponse['_links'];
      searchResult['headers'] = searchResponse['headers'];
      dispatch(updateSearchResult(searchResult));
      dispatch(updateLinkNextPage(searchResponse._links.next));
      return result;
    } catch (error) {
      dispatch(updateServerError(error));
    }
  }

  console.log(searchResult)

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
            <SingleResult key={singleHit.calories}
                          singleHit={singleHit} 
                          favorites={favorites} 
                          changeButtonStyle={changeButtonStyle} 
                          addFavoriteToAPI={addFavoriteToAPI} />
          ))}  
          <h3 className={styles.next_page} onClick={fetchMoreReceipes}>Check for more..</h3>
          <FavoritesCheck changeButtonStyle={changeButtonStyle} 
                          favorites={favorites} 
                          favoriteKeys={favoriteKeys}/>
          <RandomQuote />
        </div>
    )}
  }
}

export default SearchResults;