import { getSearchResponse } from '../../../redux/reducers/searchResponseReducer';
import { getServerResponse } from '../../../redux/reducers/serverResponseReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import styles from './SeachResult.module.scss';
import ErrorPage from "../../features/ErrorPage/ErrorPage";
import NoResultsPage from "../../features/NoResultsPage/NoResultsPage";

const SearchResults = () => {

  const searchResponse = useSelector(state => getSearchResponse(state));
  console.log('searchResponse', searchResponse);

  const serverResponse = useSelector(state => getServerResponse(state));
  console.log('searchResponse', serverResponse);
  /*
headers
: 
Headers {}
ok
: 
true
redirected
: 
false
status
: 
200
statusText
: 
""
type
: 
"cors"
*/

  const prepDishesInfo = () => {
    for(let singleHit of searchResponse.hits) {
      if (singleHit.recipe.totalTime === 0 || !singleHit.recipe.totalTime) {
        singleHit.recipe.totalTime = 15;
      }
      if (singleHit.recipe.dietLabels.length === 0) {
        singleHit.recipe.dietLabels.push('No information provided');
      }
      singleHit.recipe.calories = parseInt(singleHit.recipe.calories);
      if (singleHit.recipe.calories === 0 || !singleHit.recipe.calories) {
        singleHit.recipe.calories = 'No information provided';
      }
    }
  }

  if (!searchResponse) {
    return <ErrorPage />
  } else if (searchResponse.count === 0) {
    return <NoResultsPage />
  } else {
    prepDishesInfo();
    let foundString = '';
    searchResponse.count >= 21 ? foundString = 'But we wil show you only 20.. take a look' : foundString = 'Take a look' ;
    return (
        <div className={styles.results_wrapper}>
          <h3>Found {searchResponse.count} receipes..</h3>
          <h3>{foundString}</h3>
          {searchResponse.hits.map(singleHit => (

            <div className={styles.single_result}>
              <div className={styles.image}>
                <a href={singleHit.recipe.url} target='_blank' rel="noreferrer">
                  <i>Click to see full receipe!</i>
                  <img src={singleHit.recipe.images.REGULAR.url} alt={singleHit.recipe.images.SMALL.url} width='200' height='200' />
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
    )
  } 
}

export default SearchResults;