const SingleReceipe = props => {

    return (
        <div>
            <img src={props.recipe.images.REGULAR.url} alt={props.recipe.images.SMALL.url} width='200' height='200' />
            <h4>cautions: {props.recipe.cautions}</h4>
            <h4>label: {props.recipe.label}</h4>
            <h4>type: {props.recipe.mealType}</h4>
            <h4>time: {props.recipe.totalTime}</h4>
            <h4>cuisine: {props.recipe.cuisineType}</h4>
            <h4>diet: {props.recipe.dietLabels}</h4>
            <h4>dish: {props.recipe.dishType}</h4>
            <h4>health: {props.recipe.healthLabels.map(singleHealthLabel => ` ${singleHealthLabel}`)}</h4>
            <a href={props.recipe.url} target='_blank' rel="noreferrer">LINK KLIK</a>
        </div>
    )
}

export default SingleReceipe;