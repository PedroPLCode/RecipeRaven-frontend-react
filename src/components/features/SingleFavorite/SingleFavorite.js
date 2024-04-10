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
    props.removeFavoriteFromAPI(props.favorite.id);
    dispatch(updateFavorites(props.favorites));
    props.setReload(!props.reload);
    navigate(elementsNames.favorites);
  }

  const SingleFavoriteObject = props.favorite['data'];

  return (
    <div className={clsx(styles.single_favorite, styles.hidden)}>
      <div className={styles.image}>
        <a href={SingleFavoriteObject[parametersNames.url]} target='_blank' rel="noreferrer">
          <i>Click for full receipe!</i>
          <img src={SingleFavoriteObject[parametersNames.image_SMALL]} 
               alt={SingleFavoriteObject[parametersNames.image_REGULAR]} 
               width='400' height='400' />
        </a>
      </div>  
      <div className={styles.description}>
        <p><strong className={styles.blue}>{SingleFavoriteObject[parametersNames.label]}</strong></p>
        <p><span className={styles.blue}>Dist Type: </span> 
          <strong>{SingleFavoriteObject[parametersNames.dishType]} / {SingleFavoriteObject[parametersNames.mealType]}</strong>
        </p>
        <p><span className={styles.blue}>Cuisine Type: </span>  
          <strong>{SingleFavoriteObject[parametersNames.cuisineType]}</strong>
        </p>
        <p><span className={styles.blue}>Cautions:</span>  
          <strong>{SingleFavoriteObject[parametersNames.cautions].map(singleCaution => ` ${singleCaution},`)}</strong>
        </p>
        <p><span className={styles.blue}>Prep Time: </span>  
          <strong>{SingleFavoriteObject[parametersNames.totalTime]} min</strong>
        </p>
        <p><span className={styles.blue}>Diet Info: </span>  
          <strong>{SingleFavoriteObject[parametersNames.dietLabels]}</strong>
        </p>
        <p><span className={styles.blue}>Health Info:</span> 
          <strong>{SingleFavoriteObject[parametersNames.healthLabels].map(singleHealthLabel => ` ${singleHealthLabel},`)}</strong>
        </p>
        <p><span className={styles.blue}>Calories per one portion: </span> 
          <strong>{SingleFavoriteObject[parametersNames.calories]}</strong>
        </p>
          <a href={SingleFavoriteObject[parametersNames.url]} target='_blank' rel="noreferrer"><i>Click for full receipe!</i></a>
          <div onClick={handleRemoveFavorites} className={styles.button_remove}><i>Remove from favorites <FontAwesomeIcon icon={faTrashCan} /></i></div>
      </div>
    </div>
  )
}

SingleFavorite.propTypes = {
  favorites: PropTypes.array.isRequired,
  singleKey: PropTypes.string.isRequired,
};

export default SingleFavorite;