import styles from './SingleResult.module.scss';
import { updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

const SingleResult = props => {

  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    props.favorites[props.singleHit.label] = props.singleHit;
    dispatch(updateFavorites(props.favorites));
    props.changeButtonStyle(props.singleHit.calories);
    props.singleHit['user_id'] = localStorage.user_id
    props.addFavoriteToAPI(props.singleHit);
  }

  return (
    <div className={styles.single_result}>
      <div className={styles.image}>
        <a href={props.singleHit.url} target='_blank' rel="noreferrer">
          <i>Click for full receipe!</i>
          <img src={props.singleHit.image_SMALL_url} alt={props.singleHit.image_REGULAR_url} width='400' height='400' />
        </a>
      </div>  
      <div className={styles.description}>
        <p><strong className={styles.blue}>{props.singleHit.label}</strong></p>
        <p><span className={styles.blue}>Dist Type: </span> 
          <strong>{props.singleHit.dishType} / {props.singleHit.mealType}</strong>
        </p>
        <p><span className={styles.blue}>Cuisine Type: </span>  
          <strong>{props.singleHit.cuisineType}</strong>
        </p>
        <p><span className={styles.blue}>Cautions:</span>  
          <strong>{props.singleHit.cautions.map(singleCaution => ` ${singleCaution},`)}</strong>
        </p>
        <p><span className={styles.blue}>Prep Time: </span>  
          <strong>{props.singleHit.totalTime} min</strong>
        </p>
        <p><span className={styles.blue}>Diet Info: </span>  
          <strong>{props.singleHit.dietLabels}</strong>
        </p>
        <p><span className={styles.blue}>Health Info:</span> 
          <strong>{props.singleHit.healthLabels.map(singleHealthLabel => ` ${singleHealthLabel},`)}</strong>
        </p>
        <p><span className={styles.blue}>Calories per one portion: </span> 
          <strong>{props.singleHit.calories}</strong>
        </p>
        <a href={props.singleHit.url} target='_blank' rel="noreferrer"><i>Click for full receipe!</i></a>
        <div id={props.singleHit.calories} onClick={handleAddToFavorites} className={styles.button_favorites}><i>Save in favorites <FontAwesomeIcon icon={faStar} /></i></div>
      </div>
    </div>
  )
}

SingleResult.propTypes = {
  favorites: PropTypes.array.isRequired,
  singleHit: PropTypes.object.isRequired,
  changeButtonStyle: PropTypes.func.isRequired,
};

export default SingleResult;