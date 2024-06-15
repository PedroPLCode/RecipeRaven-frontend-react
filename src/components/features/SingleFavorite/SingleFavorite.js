import styles from './SingleFavorite.module.scss';
import { clsx } from "clsx";
import { updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { elementsNames, parametersNames } from '../../../settings';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import { deleteFavorite } from '../../utils/favorites'
import { updateNote } from '../../utils/notes'

const SingleFavorite = props => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showNote, setShowNote] = useState(false);

  const toggleNote = () => {
    setShowNote(!showNote);
  };

  const [note, setNote] = useState(props.favorite['note'] ? props.favorite['note'].content : '');

  const handleUpdateNote = async (event) => {
    event.preventDefault();
    const updatedNote = {
      content: note,
      favorite_id: props.favorite.id,
    };
    const updatedFavorites = props.favorites.map(favorite => 
      favorite.id === props.favorite.id ? { ...favorite, note: updatedNote } : favorite
    );
    dispatch(updateFavorites(updatedFavorites));
    await updateNote(updatedNote);
    setNote(updatedNote.content);
  };

  const handleRemoveFavorites = () => {
    deleteFavorite(props.favorite.id);
    dispatch(updateFavorites(props.favorites));
    props.setReload(!props.reload);
    navigate(elementsNames.favorites);
  }

  const SingleFavoriteObject = props.favorite['data'];

  console.log(SingleFavoriteObject)

  return (
    <div className={clsx(styles.single_favorite, styles.hidden)}>
      
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


          <button onClick={toggleNote}>
      {showNote ? (
        <span>Hide Note</span>
      ) : (
        <span>Show Note</span>
      )
      }
      </button>

      {showNote ? (
      <div>
        <input 
            id="note"
            type="text"
            name="note" 
            placeholder="your note.." 
            title="Your Note"
            value={note} 
            onChange={event => setNote(event.target.value)} 
          />
      <button onClick={(event) => handleUpdateNote(event)}>Save Note</button>
      </div>
    ) : '' }

          



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