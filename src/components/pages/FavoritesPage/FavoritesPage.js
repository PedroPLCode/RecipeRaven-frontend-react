import styles from './FavoritePage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getFavorites } from '../../../redux/reducers/favoritesReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import SingleFavorite from '../../features/SingleFavorite/SingleFavorite';
import { fetchFavorites, deleteFavorite } from '../../../utils/favorites';

const FavoritesPage = () => {

  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);

  const [filterFavoritesString, setFilterFavoritesString] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.token) {
        await fetchFavorites(dispatch);
      }
    };
    fetchData();
  }, [reload, dispatch]);
  const favorites = useSelector(state => getFavorites(state));

  const handleFilterFavorites = () => {
    if (localStorage.token && favorites) {
      return favorites.filter(favorite => {
        const labelMatch = favorite.data.label.toLowerCase().includes(filterFavoritesString.toLowerCase());
        const commentMatch = favorite.note ? favorite.note.content.toLowerCase().includes(filterFavoritesString.toLowerCase()) : false;
    
        return labelMatch || commentMatch;
      })
      .sort((a, b) => b.starred - a.starred);
    } else {
      fetchFavorites(dispatch);
      setReload(!reload)
    }
  };

  if (!localStorage.token) {
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

          <input id="filter" type="text" placeholder='filter by label or note' 
                     title='filter by label or note' value={filterFavoritesString} 
                     onChange={event => setFilterFavoritesString(event.target.value)} />

            {handleFilterFavorites().map(favorite => (
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