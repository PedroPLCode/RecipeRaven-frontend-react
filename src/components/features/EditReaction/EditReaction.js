import styles from './EditReaction.module.scss';
import RandomQuote from '../RandomQuote/RandomQuote';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getNews, updateNews } from '../../../redux/reducers/newsReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { updateReaction } from '../../../utils/reactions';
import { fetchNews } from '../../../utils/news';
import { ConfirmToast } from 'react-confirm-toast'
import { toast } from 'react-toastify';

const EditReaction = () => {
  const { reactionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const news = useSelector(state => getNews(state));
  const [newReactionContent, setNewReactionContent] = useState('');
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
    if (reactionId) {
      const reaction = news
        .flatMap(n => n.reactions)
        .find(reaction => reaction.id === parseInt(reactionId));

      if (reaction) {
        setNewReactionContent(reaction.content);
      }
    }
  }, [reactionId, news]);

  const handleEditReaction = () => {

    const newReaction = {
      content: newReactionContent,
    };
    if (reactionId) {
      updateReaction(reactionId, newReaction)
        .then(() => {
          const updatedNews = news.map(n => 
            n.reactions.some(reaction => reaction.id === parseInt(reactionId)) 
              ? { ...n, reactions: n.reactions.map(reaction => reaction.id === parseInt(reactionId) ? newReaction : reaction) } 
              : n
          );
          dispatch(updateNews(updatedNews));
          navigate(-1);
        })
        .catch(error => console.error('Error updating reaction:', error));
      }

    setNewReactionContent('');
    setReloadTrigger(!reloadTrigger);
  }

  const handleBack = () => {
    navigate(-1);
    
  }

  const handleClickEditReaction = () => {
    if (!newReactionContent) {
      toast.error('Error. No Reaction content.')
    } else {
      setShowToast(true)
    }
  }

  return (
    <div className={styles.editreaction}>
      <h3>{reactionId ? 'Edit reaction' : 'Add reaction'}</h3>
      <input 
        id="new-reaction-content" 
        type="text" 
        placeholder="Your reaction" 
        value={newReactionContent} 
        onChange={event => setNewReactionContent(event.target.value)} 
      />

      <button onClick={handleClickEditReaction}>
        Save
      </button>
      <ConfirmToast
        asModal={true}
        toastText='Are you sure?'
        customFunction={handleEditReaction}
        setShowConfirmToast={setShowToast}
        showConfirmToast={showToast}
      />
      <button onClick={handleBack}>Back</button>
      <RandomQuote />
    </div>
  );
};

export default EditReaction;