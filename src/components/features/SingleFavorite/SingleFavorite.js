import styles from './SingleFavorite.module.scss';
import { clsx } from "clsx";
import { updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { elementsNames, parametersNames } from '../../../settings';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

const SingleFavorite = props => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFavorites = () => {
    delete props.favorites[`${props.singleKey}`];
    dispatch(updateFavorites(props.favorites));
    props.setReload(true);
    navigate(elementsNames.favorites);
  }

  return (
    <div className={clsx(styles.single_favorite, styles.hidden)}>
      <div className={styles.image}>
        <a href={props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.url]} target='_blank' rel="noreferrer">
          <i>Click for full receipe!</i>
          <img src={props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.images][parametersNames.SMALL][parametersNames.url]} 
               alt={props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.images][parametersNames.REGULAR][parametersNames.url]} 
               width='400' height='400' />
        </a>
      </div>  
      <div className={styles.description}>
        <p><strong className={styles.blue}>{props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.label]}</strong></p>
        <p><span className={styles.blue}>Dist Type: </span> 
          <strong>{props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.dishType]} / {props.favorites[props.singleKey][parametersNames.recipe][parametersNames.mealType]}</strong>
        </p>
        <p><span className={styles.blue}>Cuisine Type: </span>  
          <strong>{props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.cuisineType]}</strong>
        </p>
        <p><span className={styles.blue}>Cautions:</span>  
          <strong>{props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.cautions].map(singleCaution => ` ${singleCaution},`)}</strong>
        </p>
        <p><span className={styles.blue}>Prep Time: </span>  
          <strong>{props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.totalTime]} min</strong>
        </p>
        <p><span className={styles.blue}>Diet Info: </span>  
          <strong>{props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.dietLabels]}</strong>
        </p>
        <p><span className={styles.blue}>Health Info:</span> 
          <strong>{props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.healthLabels].map(singleHealthLabel => ` ${singleHealthLabel},`)}</strong>
        </p>
        <p><span className={styles.blue}>Calories per one portion: </span> 
          <strong>{props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.calories]}</strong>
        </p>
          <a href={props.favorites[props.singleKey]['recipe'][parametersNames.recipe][parametersNames.url]} target='_blank' rel="noreferrer"><i>Click for full receipe!</i></a>
          <div onClick={handleRemoveFavorites} className={styles.button_remove}><i>Remove from favorites <FontAwesomeIcon icon={faTrashCan} /></i></div>
      </div>
    </div>
  )
}

SingleFavorite.propTypes = {
  favorites: PropTypes.object.isRequired,
  singleKey: PropTypes.string.isRequired,
};

export default SingleFavorite;