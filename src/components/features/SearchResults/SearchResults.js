import { getSearchResult } from '../../../redux/reducers/searchResultReducer';
import { getServerResponse } from '../../../redux/reducers/serverResponseReducer';
import { getServerError } from '../../../redux/reducers/serverErrorReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from 'react';
import { clsx } from "clsx";
import { messages } from '../../../settings';
import styles from './SeachResult.module.scss';
import ErrorPage from "../../features/ErrorPage/ErrorPage";
import NoResultsPage from "../../features/NoResultsPage/NoResultsPage";



// test responses only
import { responseForTest } from "../../../responseForTest3";
import { useState } from 'react';
const searchResult = JSON.parse(responseForTest);
const serverResponse = {
  headers: {
    ok: true,
  }
};
const serverError = false;



const SearchResults = () => {

  // real fetch responses
  //const searchResult = useSelector(state => getSearchResult(state));
  console.log('searchResult', searchResult); //temp here
  //const serverResponse = useSelector(state => getServerResponse(state));
  console.log('searchResponse', serverResponse);  //temp here
  //const serverError = useSelector(state => getServerError(state));
  console.log('serverError', serverError);  //temp here

  useEffect(() => {
    const resultBoxes = document.querySelectorAll('.SeachResult_hidden__EFmjh');
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;
    window.addEventListener('scroll', function (event) {
      currentScrollPosition = window.pageYOffset;
      if (previousScrollPosition - currentScrollPosition < 0) {
        if (resultBoxes) {
          for (let singleBox of resultBoxes) {
            const rect = singleBox.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= (window.innerHeight*2 || document.documentElement.clientHeight*2)) {
              singleBox.classList.remove('.SeachResult_hidden__EFmjh');
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

  if (!navigator.onLine || serverError || !serverResponse.headers.ok) {
    return <ErrorPage navigator={navigator} 
            serverResponse={serverResponse ? serverResponse : undefined}
            serverError={serverError ? serverError : undefined} />
  } else {
    if (searchResult.count === 0) {
      return <NoResultsPage />
    } else {
      prepDishesInfo();
      let foundString = '';
      searchResult.count >= 21 ? foundString = messages.showOnly20 + messages.takeALook : foundString =  messages.takeALook;
      return (
        <div className={styles.results_wrapper}>
          <h3>Found {searchResult.count} receipes..</h3>
          <h3>{foundString}</h3>
          {searchResult.hits.map(singleHit => (
            <div className={clsx(styles.single_result, styles.hidden)}>
              <div className={styles.image}>
                <a href={singleHit.recipe.url} target='_blank' rel="noreferrer">
                  <i>Click to see full receipe!</i>
                  <img src={singleHit.recipe.images.SMALL.url} alt={singleHit.recipe.images.REGULAR.url} width='200' height='200' />
                </a>
              </div>  
              <div className={styles.description}>
                <h4><strong className={styles.blue}>{singleHit.recipe.label}</strong></h4>
                <h4><span className={styles.blue}>Dist Type:</span> <strong>{singleHit.recipe.dishType} / {singleHit.recipe.mealType}</strong></h4>
                <h4><span className={styles.blue}>Cuisine Type:</span>  <strong>{singleHit.recipe.cuisineType}</strong></h4>
                <h4><span className={styles.blue}>Cautions:</span>  <strong>{singleHit.recipe.cautions.map(singleCaution => ` ${singleCaution},`)}</strong></h4>
                <h4><span className={styles.blue}>Prep Time:</span>  <strong>{singleHit.recipe.totalTime} min</strong></h4>
                <h4><span className={styles.blue}>Diet Info:</span>  <strong>{singleHit.recipe.dietLabels}</strong></h4>
                <h4><span className={styles.blue}>Health Info:</span> <strong>{singleHit.recipe.healthLabels.map(singleHealthLabel => ` ${singleHealthLabel},`)}</strong></h4>
                <h4><span className={styles.blue}>Calories per one portion:</span> <strong>{singleHit.recipe.calories}</strong></h4>
                <a href={singleHit.recipe.url} target='_blank' rel="noreferrer"><i>Click here to see full receipe!</i></a>
              </div>
            </div>
          ))}  
        <h3>That's it.. Lets search for something again!</h3>
      </div>
    )}
  }
}

export default SearchResults;