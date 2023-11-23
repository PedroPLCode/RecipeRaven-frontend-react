import { getSearchResult } from '../../../redux/reducers/searchResultReducer';
import { getServerResponse } from '../../../redux/reducers/serverResponseReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { messages } from '../../../settings';
import styles from './SeachResult.module.scss';
import ErrorPage from "../../features/ErrorPage/ErrorPage";
import NoResultsPage from "../../features/NoResultsPage/NoResultsPage";

const SearchResults = () => {

  const searchResult = useSelector(state => getSearchResult(state));
  console.log('searchResponse', searchResult); //temp here

  const serverResponse = useSelector(state => getServerResponse(state));
  console.log('searchResponse', serverResponse);  //temp here

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

  if (!serverResponse.headers.ok) {
    return <ErrorPage serverResponse={serverResponse} />
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
            <div className={styles.single_result}>
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
      </div>
    )}
  }
}

export default SearchResults;