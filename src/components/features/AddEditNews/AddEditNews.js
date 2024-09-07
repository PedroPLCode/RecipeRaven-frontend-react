import styles from './AddEditNews.module.scss';
import RandomQuote from '../RandomQuote/RandomQuote';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getNews, updateNews } from '../../../redux/reducers/newsReducer';
import { messages } from '../../../settings';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchNews, createNews, updateSingleNews } from '../../../utils/news';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ConfirmToast } from 'react-confirm-toast'

const AddEditNews = () => {
  const { newsId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const news = useSelector(state => getNews(state));
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.token) {
        await fetchNews(dispatch);
      }
    };
    fetchData();
  }, [dispatch, reloadTrigger]);

  useEffect(() => {
    if (newsId) {
      const n = news.find(n => n.id === parseInt(newsId));
      if (n) {
        setNewNewsTitle(n.title);
        setNewNewsContent(n.content);
      }
    }
  }, [newsId, news]);

  const handleSendNewNews = async () => {
    const newNews = {
      title: newNewsTitle,
      content: newNewsContent,
    };

    if (newsId) {
      const updatedNews = news.map(n => 
        n.id === parseInt(newsId) ? { ...n, ...newNews } : n
      );
      dispatch(updateNews(updatedNews));
      updateSingleNews(newsId, newNews);
    } else {
      dispatch(updateNews([...news, newNews]));
      try {
        await toast.promise(
          createNews(newNews),
          {
            pending: 'Creating News',
            success: 'News created',
            error: 'Error',
          }, {toastId: 4}
        );
      } catch (error) {
        console.error('Error during creation:', error);
        toast.error('Error during creation');
      }
    }
    navigate(-1)
    setNewNewsTitle('');
    setNewNewsContent('');
    setReloadTrigger(!reloadTrigger);
  };

  const handleBack = () => {
    navigate(-1)
  }

  const handleClickAddEditNews = () => {
    if (!newNewsTitle) {
      toast.error('Error. No News title.')
    } else if (!newNewsContent) {
      toast.error('Error. No News content.')
    } else {
      setShowToast(true)
    }
  }

  return (
    <div className={styles.addeditnews}>
      <h3>{newsId ? `Edit News ${newsId} component` : 'Add News component'}</h3>
      <input
        id="new-news-title"
        type="text"
        placeholder={messages.newNews.title}
        title={messages.newNews.text}
        value={newNewsTitle}
        onChange={event => setNewNewsTitle(event.target.value)}
      />
      <input
        id="new-news-content"
        type="text"
        placeholder={messages.newNews.content}
        title={messages.newNews.text}
        value={newNewsContent}
        onChange={event => setNewNewsContent(event.target.value)}
      />
      
      <button onClick={handleClickAddEditNews}>{newsId ? 'Update News' : 'Add News'}</button>
      <ConfirmToast
        asModal={true}
        toastText='Are you sure?'
        customFunction={handleSendNewNews}
        setShowConfirmToast={setShowToast}
        showConfirmToast={showToast}
      />
      <button onClick={handleBack}>back</button>
      <RandomQuote />
    </div>
  );
};

export default AddEditNews;