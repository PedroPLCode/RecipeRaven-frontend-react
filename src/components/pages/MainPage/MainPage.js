import styles from './MainPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getNews, updateNews } from '../../../redux/reducers/newsReducer';
import { getUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import News from '../../features/News/News';
import { fetchNews, createNews } from '../../utils/news';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createNotification } from '../../utils/notifications';
import { parse, compareAsc, compareDesc } from 'date-fns';
import { settings } from '../../../settings';

const MainPage = () => {

  const dispatch = useDispatch();
  const news = useSelector(state => getNews(state));
  const userData = useSelector(state => getUser(state));
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [filterNewsString, setFilterNewsString] = useState('');

  const handleFilterNews = () => {
    return news.filter(n => {
      const titleMatch = n.title.toLowerCase().includes(filterNewsString.toLowerCase());
      const contentMatch = n.content.toLowerCase().includes(filterNewsString.toLowerCase());

      return (titleMatch || contentMatch);
    });
  };


  const handleSendNewNews = async () => {
    const newNews = {
      title: newNewsTitle,
      content: newNewsContent,
    }
    news.push(newNews);
    dispatch(updateNews(news));

    try {
      await toast.promise(
        createNews(newNews),
        {
          pending: 'Creating News',
          success: 'News created',
          error: 'Error',
        }, { toastId: 7 }
      );
    } catch (error) {
      console.error('Error during delete:', error);
      toast.error('Error during delete');
    }

    setNewNewsTitle('');
    setNewNewsContent('');
    setReloadTrigger(!reloadTrigger);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.token) {
        }

        fetchNews(dispatch);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [reloadTrigger]);


  if (news.length >= 1) {
    return (
      <div className={styles.news}>
        <h3>Home Page</h3>

        <input id="filter" type="text" placeholder='filter news by title or content'
          title='filter news' value={filterNewsString}
          onChange={event => setFilterNewsString(event.target.value)} />

        { userData ? (userData.id === settings.adminId ? 
          <a href="/addeditnews">Add News</a>
          : null)
          : null
        }

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

        { userData ? (userData.id === settings.adminId ? 
          <a href="/addeditnews">Add News</a>
          : null)
          : null
        }

        <RandomQuote />
      </div>
    )
  }
}

export default MainPage;