import styles from './BoardPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getFavorites, updateFavorites } from '../../../redux/reducers/favoritesReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";

const BoardPage = () => {

  return (
    <div className={styles.board}>
      <h3>BoardPage component</h3>
      <RandomQuote />
    </div>
  );
}
    
export default BoardPage;