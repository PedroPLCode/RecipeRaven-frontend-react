import React, { useState, useCallback, useRef } from 'react';
import styles from './SingleFavorite.module.scss';
import { clsx } from 'clsx';
import { updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { elementsNames, parametersNames } from '../../../settings';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faStickyNote, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import { deleteFavorite, changeFavoriteStarred, fetchFavorites } from '../../../utils/favorites';
import { updateNote } from '../../../utils/notes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { settings } from '../../../settings';

Modal.setAppElement('#root');

const SingleFavorite = React.memo(props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteRef = useRef(null);

  const [animate, setAnimate] = useState(false);
  const [animateDirectionUp, setAnimateDirectionUp] = useState(true);

  const [note, setNote] = useState(props.favorite['note'] ? props.favorite['note'].content : '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleNote = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  const handleUpdateNote = useCallback(async event => {
    event.preventDefault();
    const updatedNote = {
      content: note,
      favorite_id: props.favorite.id,
    };
    const updatedFavorites = props.favorites.map(favorite => 
      favorite.id === props.favorite.id ? { ...favorite, note: updatedNote } : favorite
    );
    dispatch(updateFavorites(updatedFavorites));
    await toast.promise(updateNote(updatedNote), {
      pending: 'Updating note',
      success: updatedNote.content ? 'Note updated.' : 'Note deleted.',
      error: 'Error updating Note',
    }, { toastId: 1 });
    setNote(updatedNote.content);
    setIsModalOpen(false);
  }, [dispatch, note, props.favorite.id, props.favorites]);

  const handleDeleteNote = useCallback(async event => {
    event.preventDefault();
    const deletedNote = {
      content: '',
      favorite_id: props.favorite.id,
    };
    const updatedFavorites = props.favorites.map(favorite => 
      favorite.id === props.favorite.id ? { ...favorite, note: deletedNote } : favorite
    );
    dispatch(updateFavorites(updatedFavorites));
    await toast.promise(updateNote(deletedNote), {
      pending: 'Updating note',
      success: 'Note deleted.',
      error: 'Error deleting Note',
    }, { toastId: 1 });
    setNote('');
    setIsModalOpen(false);
  }, [dispatch, note, props.favorite.id, props.favorites]);

const handleStarredFavorite = async () => {
  setAnimate(true);
  setAnimateDirectionUp(!favoriteStarred);

  setTimeout(async () => {
    await changeFavoriteStarred(props.favorite.id);

    const updatedFavorites = props.favorites.map(favorite => 
      favorite.id === props.favorite.id ? { ...favorite, starred: favoriteStarred } : favorite
    );
    
    await dispatch(updateFavorites(updatedFavorites));
    await fetchFavorites(dispatch);

    setAnimate(false);
  }, 100);
};

  const handleRemoveFavorites = useCallback(async () => {
    try {
      await toast.promise(
        deleteFavorite(props.favorite.id),
        {
          pending: 'Removing favorite',
          success: null,
          error: 'Error',
        },
        { toastId: 2 }
      );
      dispatch(updateFavorites(props.favorites));
      props.setReload(prevReload => !prevReload);
      navigate(elementsNames.favorites);
    } catch (error) {
      console.error('Error during delete:', error);
      toast.error('Error during delete');
    }
  }, [dispatch, navigate, props.favorite.id, props.favorites, props.setReload]);

  const SingleFavoriteObject = props.favorite['data'];
  const imageName = props.favorite['image_name'];
  const favoriteStarred = props.favorite['starred'];

  return (
    <div ref={favoriteRef} id={SingleFavoriteObject[parametersNames.calories]} className={clsx(styles.single_favorite, animate ? (animateDirectionUp ? styles.single_favorite__animatemoveup : styles.single_favorite__animatemovedown) : '')}>
      <div className={styles.image}>
        <a href={SingleFavoriteObject.url} target='_blank' rel='noreferrer'>
          <i>Click for full recipe!</i>
          <img src={`${settings.backendUrl}/static/uploaded_photos/${imageName}`} alt={imageName} width='400' height='400' />
        </a>
      </div>
      
      <div className={styles.description}>
        <p>
          <strong className={styles.blue}>{SingleFavoriteObject[parametersNames.label]}</strong>
          <FontAwesomeIcon className={styles.favoriteStar} onClick={handleStarredFavorite} icon={favoriteStarred ? faStarSolid : faStarRegular} />
        </p>
        <p><span className={styles.blue}>Dish Type: </span> 
          <strong>{SingleFavoriteObject[parametersNames.dishType]} / {SingleFavoriteObject[parametersNames.mealType]}</strong>
        </p>
        <p><span className={styles.blue}>Cuisine Type: </span>  
          <strong>{SingleFavoriteObject[parametersNames.cuisineType]}</strong>
        </p>
        <p><span className={styles.blue}>Cautions:</span>  
          <strong>{SingleFavoriteObject[parametersNames.cautions].map(singleCaution => ` ${singleCaution},`)}</strong>
        </p>
        <p><span className={styles.blue}>Prep Time: </span>  
          <strong>{SingleFavoriteObject[parametersNames.totalTime]} min</strong></p>
        <p><span className={styles.blue}>Diet Info: </span>  
          <strong>{SingleFavoriteObject[parametersNames.dietLabels]}</strong>
        </p>
        <p><span className={styles.blue}>Health Info:</span> 
          <strong>{SingleFavoriteObject[parametersNames.healthLabels].map(singleHealthLabel => ` ${singleHealthLabel},`)}</strong>
        </p>
        <p><span className={styles.blue}>Calories per one portion: </span> 
          <strong>{SingleFavoriteObject[parametersNames.calories]}</strong>
        </p>
        <a href={SingleFavoriteObject[parametersNames.url]} target='_blank' rel='noreferrer'><i>Click for full recipe!</i></a>

        <div>
          <button className={clsx(styles.button_note, isModalOpen ? styles.show_note : '')} onClick={toggleNote}>
            <span>
              <i>{note ? 'Show Note ' : 'Add note '} <FontAwesomeIcon icon={faStickyNote} /></i>
            </span>
            
          </button>
          
          <Modal
            isOpen={isModalOpen}
            onRequestClose={toggleNote}
            contentLabel="Note Modal"
            className={styles.modal}
            overlayClassName={styles.overlay}
          >
            <p>{SingleFavoriteObject[parametersNames.label]}</p>
            <input
              id='note'
              type='text'
              name='note'
              placeholder='Your note..'
              title='Your Note'
              value={note}
              onChange={event => setNote(event.target.value)}
            />
            <button onClick={handleUpdateNote}>
              <i>{note ? 'Update Note ' : 'Save note '} <FontAwesomeIcon icon={faPen} /></i>
            </button>

            {note ?
            <button onClick={handleDeleteNote}>
              <i>Delete Note <FontAwesomeIcon icon={faTrashCan}/> </i>
            </button>
            : null}

            <button onClick={toggleNote}>Close</button>
          </Modal>
        </div>

        <div onClick={handleRemoveFavorites} className={styles.button_remove}>
          <i>Remove from favorites <FontAwesomeIcon icon={faTrashCan} /></i>
        </div>
      </div>
    </div>
  );
});

SingleFavorite.propTypes = {
  favorites: PropTypes.array.isRequired,
  setReload: PropTypes.func.isRequired,
  favorite: PropTypes.shape({
    id: PropTypes.number.isRequired,
    note: PropTypes.shape({
      content: PropTypes.string
    }),
    data: PropTypes.object.isRequired,
    image_name: PropTypes.string.isRequired
  }).isRequired
};

export default SingleFavorite;