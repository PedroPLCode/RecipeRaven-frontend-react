import styles from './SingleResult.module.scss';
import { clsx } from "clsx";
import { updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

const SingleResult = props => {

  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    props.favorites[props.singleHit.recipe.label] = props.singleHit;
    dispatch(updateFavorites(props.favorites));
    props.changeButtonStyle(props.singleHit.recipe.calories);
  }

  return (
    <div className={clsx(styles.single_result, styles.hidden)}>
      <div className={styles.image}>
        <a href={props.singleHit.recipe.url} target='_blank' rel="noreferrer">
          <i>Click for full receipe!</i>
          <img src={props.singleHit.recipe.images.SMALL.url} alt={props.singleHit.recipe.images.REGULAR.url} width='400' height='400' />
        </a>
      </div>  
      <div className={styles.description}>
        <p><strong className={styles.blue}>{props.singleHit.recipe.label}</strong></p>
        <p><span className={styles.blue}>Dist Type: </span> 
          <strong>{props.singleHit.recipe.dishType} / {props.singleHit.recipe.mealType}</strong>
        </p>
        <p><span className={styles.blue}>Cuisine Type: </span>  
          <strong>{props.singleHit.recipe.cuisineType}</strong>
        </p>
        <p><span className={styles.blue}>Cautions:</span>  
          <strong>{props.singleHit.recipe.cautions.map(singleCaution => ` ${singleCaution},`)}</strong>
        </p>
        <p><span className={styles.blue}>Prep Time: </span>  
          <strong>{props.singleHit.recipe.totalTime} min</strong>
        </p>
        <p><span className={styles.blue}>Diet Info: </span>  
          <strong>{props.singleHit.recipe.dietLabels}</strong>
        </p>
        <p><span className={styles.blue}>Health Info:</span> 
          <strong>{props.singleHit.recipe.healthLabels.map(singleHealthLabel => ` ${singleHealthLabel},`)}</strong>
        </p>
        <p><span className={styles.blue}>Calories per one portion: </span> 
          <strong>{props.singleHit.recipe.calories}</strong>
        </p>
        <a href={props.singleHit.recipe.url} target='_blank' rel="noreferrer"><i>Click for full receipe!</i></a>
        <div id={props.singleHit.recipe.calories} onClick={handleAddToFavorites} className={styles.button_favorites}><i>Save in favorites <FontAwesomeIcon icon={faStar} /></i></div>
      </div>
    </div>
  )
}

SingleResult.propTypes = {
  favorites: PropTypes.object.isRequired,
  singleHit: PropTypes.object.isRequired,
  changeButtonStyle: PropTypes.func.isRequired,
};

export default SingleResult;