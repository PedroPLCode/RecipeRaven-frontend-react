import styles from './FavoritePage.module.scss';
import { useState } from 'react';
import { getFavorites } from '../../../redux/reducers/favoritesReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import SingleFavorite from '../../features/SingleFavorite/SingleFavorite';

const FavoritesPage = () => {

  const [reload, setReload] = useState(false);

  const favorites = useSelector(state => getFavorites(state));
  const favoriteKeys = Object.keys(favorites)
  
  if (favorites.length !== 0 && favoriteKeys.length !== 0) {
    return (
      <div className={styles.favorite}>
        <h3>Food Search App</h3>
        <h5>Your favorites</h5>
        <h5>You have {favoriteKeys.length} saved recipes</h5>
        <h5>UNDER CONSTRUCTION</h5>
        <div>
          {favoriteKeys.map(singleKey => (
            <SingleFavorite favorites={favorites} singleKey={singleKey} reload={reload} setReload={setReload} />
          ))}  
        </div>
        <h3>That's it. No more favorites</h3>
      </div>
    );
  } else {
    return (
      <div className={styles.favorite}>
        <h3>Food Search App</h3>
        <h5>No selected favorites</h5>
        <h5>UNDER CONSTRUCTION</h5>
      </div>
    );
  }
}
    
export default FavoritesPage;