import styles from './News.module.scss';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { createReaction } from '../../utils/reactions.js';
import Reaction from '../Reaction/Reaction.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteNews } from '../../utils/news.js';
import { Link } from 'react-router-dom';
import { updateNews } from '../../../redux/reducers/newsReducer.js';
import { settings } from '../../../settings.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createNotification } from '../../utils/notifications.js';
import { ConfirmToast } from 'react-confirm-toast'
import clsx from 'clsx';

const News = (props) => {
  const dispatch = useDispatch();
  const [showReactions, setShowReactions] = useState(false);
  const [newReactionContent, setNewReactionContent] = useState('');
  const [newReactionAuthor, setNewReactionAuthor] = useState(props.userData ? (props.userData.name ? props.userData.name : props.userData.login) : "");
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [showToast, setShowToast] = useState(false)

  const toggleReactions = () => {
    setShowReactions(!showReactions);
  };

  const handleSendNewReaction = async (event) => {
    event.preventDefault();

    if (!newReactionContent) {
      toast.error('Error. No Reaction content.')
    } else {
      const newReaction = {
        content: newReactionContent,
        news_id: props.n.id,
        guest_author: localStorage.token ? null : newReactionAuthor,
        author: localStorage.token ? (props.userData.name ? props.userData.name : props.userData.login) : null,
        user_id: localStorage.token ? props.userData.id : null,
      };
  
      const updatedNews = props.news.map(n => 
        n.id === props.n.id ? { ...n, comments: [...n.reactions, newReaction] } : n
      );
      dispatch(updateNews(updatedNews));
  
      try {
        await toast.promise(
          createReaction(newReaction),
          {
            pending: 'Creating Reaction',
            success: 'Reaction created',
            error: 'Error',
          }, {toastId: 4}
        );
      } catch (error) {
        console.error('Error during delete:', error);
        toast.error('Error during delete');
      }
  
      setNewReactionContent('');
      setNewReactionAuthor('');
      setReloadTrigger(!reloadTrigger);
    }
  };

  const handleClickDeleteNews = () => {
    setShowToast(true)
  }

  const handleDeleteNews = () => {
    if (props.n.reactions.length === 0) {
      deleteNews(props.n.id);
      const updatedNews = props.news.filter(n => n.id !== props.n.id);
      dispatch(updateNews(updatedNews));
    } else {
      alert(`News have ${props.n.comments.length} Reactions already`)
    }
  };


  return (
    <div className={styles.news}>

      {props.userData ?  
            (props.n.user_id === props.userData.id || props.userData.id === settings.adminId ? 
            <div className={styles.buttons_for_admin}>
            <div onClick={handleClickDeleteNews} className={styles.button_remove}><i>Delete <FontAwesomeIcon icon={faTrashCan} /></i></div>
            <ConfirmToast
              asModal={true}
              customFunction={handleDeleteNews}
              setShowConfirmToast={setShowToast}
              showConfirmToast={showToast}
            />
            <Link to={`/addeditnews/${props.n.id}`}><i>Edit <FontAwesomeIcon icon={faEdit} /></i></Link>
            </div>
            : null)
            : 
            null}

      <div className={styles.news_content}>
        <div className={styles.news_text}>
          <p>{props.n.title}</p>
          <p>{props.n.content}</p>

          <i>Created {props.n.creation_date}</i>
          { props.n.last_update ? <i>Modified {props.n.last_update}</i> : '' }
        </div>
      </div>

      <button onClick={toggleReactions} className={clsx(showReactions ? styles.reactrions_show : '')}>
      {props.n.reactions ? 
      (showReactions ? (
        <span>Hide Reactions</span>
      ) : (
        <span>
          {props.n.reactions && props.n.reactions.length > 0 
            ? `${props.n.reactions.length} ${props.n.reactions.length > 1 ? 'Reactions' : 'Reaction'} - Show`
            : 'Add Reaction'}
        </span>
      ))
      : ''}
      
      </button>

      {showReactions && (
  <>
    {props.n.reactions && props.n.reactions.length > 0 ? (
      props.n.reactions.map((r, index) => (
        <Reaction key={index} r={r} n={props.n} news={props.news} userData={props.userData} />
      ))
    ) : (
      <p className={styles.no_reactions}>No reactions to this post. Be the first!</p>
    )}

    <div className={styles.addreaction}>
      <input 
        id="new-reaction-content" 
        type="text" 
        placeholder="Enter your reaction" 
        value={newReactionContent} 
        onChange={event => setNewReactionContent(event.target.value)} 
      />
      
      {props.userData ? (
        <p>Author: {props.userData.name ? props.userData.name : props.userData.login}</p>
      ) : (
        <input 
          id="new-reaction-author" 
          type="text" 
          placeholder="Your name" 
          value={newReactionAuthor} 
          onChange={event => setNewReactionAuthor(event.target.value)} 
        />
      )}

      <button className={styles.add_reaction} onClick={handleSendNewReaction}>
      {props.n.reactions.length > 0 ? (
        <span>Add Reaction</span>
      ) : (
        <span>Add First Reaction</span>
      )}
      </button>
      
    </div>

    <button onClick={toggleReactions} className={clsx(styles.toggle_reactions, showReactions ? styles.reactions_show : '')}>
      {props.n.reactions ? 
      (showReactions ? (
        <span>Hide Reactions</span>
      ) : (
        <span>{props.n.reactions && props.n.reactions.length > 0 ? `${props.n.reactions.length} Reactions - Show` : 'Add Reaction'}</span>
      ))
      : ''}
      
      </button>
  </>
)}


    </div>
  );
};

export default News;
