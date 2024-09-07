import styles from './MainPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getNews, updateNews } from '../../../redux/reducers/newsReducer';
import { getUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import News from '../../features/News/News';
import { fetchNews, createNews } from '../../../utils/news';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { settings } from '../../../settings';

const MainPage = () => {

  const dispatch = useDispatch();
  const news = useSelector(state => getNews(state));
  const userData = useSelector(state => getUser(state));
  const [filterNewsString, setFilterNewsString] = useState('');

  const handleFilterNews = () => {
    return news.filter(n => {
      const titleMatch = n.title.toLowerCase().includes(filterNewsString.toLowerCase());
      const contentMatch = n.content.toLowerCase().includes(filterNewsString.toLowerCase());
      return (titleMatch || contentMatch);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchNews(dispatch);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);


  if (news.length >= 1) {
    return (
      <div className={styles.news}>
        <h3>Home Page</h3>

        <input id="filter" type="text" placeholder='filter news by title or content'
          title='filter news' value={filterNewsString}
          onChange={event => setFilterNewsString(event.target.value)} />

        {handleFilterNews().map(n => (
          <News key={n.id} n={n} news={news} userData={userData} />
        ))}

        <RandomQuote />
      </div>
    );
  } else {
    return (
      <div className={styles.news}>
        <h3>Home Page</h3>
        <h5>No news found</h5>
        <RandomQuote />
      </div>
    )
  }
}

export default MainPage;