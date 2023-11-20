import styles from './SeachResult.module.scss';

const SearchResults = props => {

  const prepDishesInfo = () => {
    for(let singleHit of props.response.hits) {
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

  if (props.response) {
    prepDishesInfo();
    return (

        <div className={styles.results_wrapper}>
          <h3>Search Results</h3>
          {props.response.hits.map(singleHit => (

            <div className={styles.single_result}>
              <div className={styles.image}>
                <img  src={singleHit.recipe.images.REGULAR.url} alt={singleHit.recipe.images.SMALL.url} width='200' height='200' />
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