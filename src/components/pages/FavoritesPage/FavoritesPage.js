import styles from './FavoritePage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getFavorites, updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import SingleFavorite from '../../features/SingleFavorite/SingleFavorite';
import { fetchFavorites, deleteFavorite } from '../../utils/favorites';

const FavoritesPage = props => {

  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (props.token) {
      fetchFavorites(dispatch);
    }
  }, [reload]);
  const favorites = useSelector(state => getFavorites(state));
  //const favoriteKeys = Object.keys(favorites)

  if (!props.token) {
    return (
      <div className={styles.favorite}>
        <h3>You must login to save favorite recipes</h3>
        <h5>Your saved recipes will be shown here</h5>
        <RandomQuote />
      </div>
    )
  } else {
    if (favorites.length !== 0) {
      return (
        <div className={styles.favorite}>
          <h3>Yours favorite recipes</h3>
          <h5>You have {favorites.length} saved recipes</h5>
            {favorites.map(favorite => (
              <SingleFavorite key={favorite.id} 
                              favorite={favorite}
                              favorites={favorites} 
                              reload={reload} 
                              setReload={setReload}
                              deleteFavorite={deleteFavorite} 
                              fetchFavorites={fetchFavorites} />
            ))}  
          {favorites.length !== 0 ? <h3 className={styles.bottom}>{favorites.length} recipes saved.</h3> : ''}
          <RandomQuote />
        </div>
      );
    } else {
      return (
        <div className={styles.favorite}>
          <h3>You have no favorite recipes</h3>
          <h5>Your saved recipes will be shown here</h5>
          <RandomQuote />
        </div>
      );
    }
  }
}
    
export default FavoritesPage;