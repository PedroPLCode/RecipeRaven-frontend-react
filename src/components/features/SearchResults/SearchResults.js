const SearchResults = props => {

  if (props.response) {
    return (

        <div className="">
          <h4>Search Results</h4>
          {props.response.hits.map(singleHit => (

            <div>
                <img src={singleHit.recipe.images.REGULAR.url} alt={singleHit.recipe.images.SMALL.url} width='200' height='200' />
                <h4>cautions: {singleHit.recipe.cautions}</h4>
                <h4>label: {singleHit.recipe.label}</h4>
                <h4>type: {singleHit.recipe.mealType}</h4>
                <h4>time: {singleHit.recipe.totalTime}</h4>
                <h4>cuisine: {singleHit.recipe.cuisineType}</h4>
                <h4>diet: {singleHit.recipe.dietLabels}</h4>
                <h4>dish: {singleHit.recipe.dishType}</h4>
                <h4>health: {singleHit.recipe.healthLabels.map(singleHealthLabel => ` ${singleHealthLabel}`)}</h4>
                <a href={singleHit.recipe.url} target='_blank' rel="noreferrer">LINK KLIK</a>
            </div>


          ))}  
      </div>

    )
  }
}

export default SearchResults;