import styles from './SingleResult.module.scss';
import { updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import { createFavorite } from '../../../utils/favorites';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createNotification } from '../../../utils/notifications';
import { useNavigate } from 'react-router-dom';
import { elementsNames, parametersNames } from '../../../settings';

const SingleResult = props => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToFavorites = async () => {

    if (props.singleHit['isFavorite'] !== true) {
      props.favorites[props.singleHit.label] = props.singleHit;
      dispatch(updateFavorites(props.favorites));
      props.changeButtonStyle(`${props.singleHit.calories+props.singleHit.totalTime+props.singleHit.url}`);
      props.singleHit['user_id'] = localStorage.user_id
      props.singleHit['isFavorite'] = true;
      
      try {
        await toast.promise(
          createFavorite(props.singleHit),
          {
            pending: 'Creating favorite',
            success: null,
            error: 'Error',
          }, {toastId: 3}
        );
  
        navigate(elementsNames.search);
  
      } catch (error) {
        console.error('Error during delete:', error);
        toast.error('Error during delete');
      }
    } else {
      createNotification('success', 'Recipe already saved in favorites', 4);
    }
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
        <p><span className={styles.blue}>Dish Type: </span> 
          <strong>{props.singleHit.dishType} / {props.singleHit.mealType}</strong>
        </p>
        <p><span className={styles.blue}>Cuisine Type: </span>  
          <strong>{props.singleHit.cuisineType}</strong>
        </p>
        <p><span className={styles.blue}>Cautions:</span>  
          <strong>{props.singleHit.cautions.join(', ')}</strong>
        </p>
        <p><span className={styles.blue}>Prep Time: </span>  
          <strong>{props.singleHit.totalTime} min</strong>
        </p>
        <p><span className={styles.blue}>Diet Info: </span>  
          <strong>{props.singleHit.dietLabels.join(', ')}</strong>
        </p>
        <p><span className={styles.blue}>Health Info:</span> 
          <strong>{props.singleHit.healthLabels.join(', ')}</strong>
        </p>
        <p><span className={styles.blue}>Calories per one portion: </span> 
          <strong>{props.singleHit.calories}</strong>
        </p>
        <a href={props.singleHit.url} target='_blank' rel="noreferrer"><i>Click for full receipe!</i></a>

        {localStorage.token ? 
          <div id={`${props.singleHit.calories+props.singleHit.totalTime+props.singleHit.url}`} 
               onClick={handleAddToFavorites}
               className={styles.button_favorites}>
                <i>{props.singleHit['isFavorite'] ? 'Saved' : 'Save'} in favorites 
                  <FontAwesomeIcon icon={faStar} />
                </i>
          </div> 
          : 
          <a href='/login' onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Login to save in favorites</a>
        }
        
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