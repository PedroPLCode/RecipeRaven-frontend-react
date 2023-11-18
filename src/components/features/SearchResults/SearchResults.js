import styles from './SeachResult.module.scss';

const SearchResults = props => {

  if (props.response) {
    return (

        <div className="">
          <h4>Search Results</h4>
          {props.response.hits.map(singleHit => (

            <div className={styles.single_result}>
              <div className={styles.image}>
                <img  src={singleHit.recipe.images.REGULAR.url} alt={singleHit.recipe.images.SMALL.url} width='200' height='200' />
              </div>  
              <div className={styles.description}>
                <h4>{singleHit.recipe.label}</h4>
                <h4>{singleHit.recipe.mealType}</h4>
                <h4>{singleHit.recipe.dishType}</h4>
                <h4>{singleHit.recipe.cuisineType}</h4>
                <h4>cautions: {singleHit.recipe.cautions}</h4>
                <h4>time: {singleHit.recipe.totalTime} min</h4>
                <h4>diet: {singleHit.recipe.dietLabels}</h4>
                <h4>health: {singleHit.recipe.healthLabels.map(singleHealthLabel => ` ${singleHealthLabel}`)}</h4>
                <h4>calories:</h4>
                <a href={singleHit.recipe.url} target='_blank' rel="noreferrer">Click here to see full receipe!</a>
              </div>
            </div>


          ))}  
      </div>

    )
  }
}

export default SearchResults;