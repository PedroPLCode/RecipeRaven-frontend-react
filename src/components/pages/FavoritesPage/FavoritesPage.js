import styles from './FavoritePage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { getFavorites, updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import SingleFavorite from '../../features/SingleFavorite/SingleFavorite';

const FavoritesPage = () => {

  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
//  const favorites = useSelector(state => getFavorites(state));
//  const favoriteKeys = Object.keys(favorites);
  


//devPedro
//from here
const fetchFavorites = async () => {
  const url = `http://localhost:5000/favorites`;
  const options = {
	  method: 'GET',
	  //headers: '',
  }; 
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const finalResponse = await JSON.parse(result)
    //console.log(finalResponse)
    dispatch(updateFavorites(finalResponse));
    return finalResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//console.log(favorites)
const loadedFavorites = fetchFavorites();
//console.log(loadedFavorites)
const favorites = useSelector(state => getFavorites(state));
const favoriteKeys = Object.keys(favorites)
//console.log(favorites)
//console.log(favoriteKeys)
//if (loadedFavorites) {
  for (let singleKey in favoriteKeys) {
//    favorites[singleLoad['recipe']['recipe']['label']] = singleLoad['recipe']['recipe']
    console.log(favorites[singleKey])
  }
//}
//to here



  if (favorites.length !== 0 && favoriteKeys.length !== 0) {
    return (
      <div className={styles.favorite}>
        <h3>Yours favorite recipes</h3>
        <h5>You have {favoriteKeys.length} saved recipes</h5>
          {favoriteKeys.map(singleKey => (
            <SingleFavorite key={singleKey} 
                            favorites={favorites} 
                            singleKey={singleKey} 
                            reload={reload} 
                            setReload={setReload} />
          ))}  
        {favoriteKeys.length !== 0 ? <h3 className={styles.bottom}>{favoriteKeys.length} recipes saved.</h3> : ''}
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
    
export default FavoritesPage;