import styles from './Reaction.module.scss'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faThumbsUp as solidFaThumbsUp, faThumbsDown as solidFaThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularFaThumbsUp, faThumbsDown as regularFaThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { deletePost, handleUserReaction, handleLikeHateOwn } from '../../utils/posts';
import { useDispatch } from "react-redux";
import { updateNews } from '../../../redux/reducers/newsReducer';
import { deleteReaction } from '../../utils/reactions';
import { Link } from 'react-router-dom';
import { settings } from '../../../settings'
import { ConfirmToast } from 'react-confirm-toast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createNotification } from '../../utils/notifications';

const Reaction = props => {

  const [show, setShow] = useState(false)

  const [userLikedReaction, setUserLikedReaction] = useState(false);
  const [likesCounter, setLikesCounter] = useState(props.r.likes.length);
  const [userHatedReaction, setUserHatedReaction] = useState(false);
  const [hatesCounter, setHatesCounter] = useState(props.r.hates.length);

  useEffect(() => {
    if (props.userData) {
      const isReactionLiked = props.r.likes.some(likeUserId => likeUserId === props.userData.id);
      const isReactionHated = props.r.hates.some(hateUserId => hateUserId === props.userData.id);
      setUserLikedReaction(isReactionLiked);
      setUserHatedReaction(isReactionHated);
    }
  }, [props.r.likes, props.r.hates]);

  const dispatch = useDispatch();

  const handleDeleteReaction = () => {

    deleteReaction(props.r.id);

    const updatedNews = props.news.map(n => {
      if (n.id === props.n.id) {
        const updatedReactions = n.reactions.filter(r => r.id !== props.r.id);
        return { ...n, reactions: updatedReactions };
      } else {
        return n;
      }
    });

    dispatch(updateNews(updatedNews));
    toast.success('Reaction deleted');
  };

  const handleLikes = () => {
    if (userHatedReaction) {
      handleUserReaction('reactions', 'hate', props.r.id, userHatedReaction, setUserHatedReaction, setHatesCounter);
    }
    handleUserReaction('reactions', 'like', props.r.id, userLikedReaction, setUserLikedReaction, setLikesCounter);
  };

  const handleHates = () => {
    if (userLikedReaction) {
      handleUserReaction('reactions', 'like', props.r.id, userLikedReaction, setUserLikedReaction, setLikesCounter);
    }
    handleUserReaction('reactions', 'hate', props.r.id, userHatedReaction, setUserHatedReaction, setHatesCounter);
  };
  

  return (
    <div className={styles.reaction}>

      <div className={styles.content}>
        <p>{props.r.content}</p>

        <p className={styles.reaction_author}>Author: {props.r.author ? props.r.author : props.r.guest_author ? `${props.r.guest_author} (Guest)` : 'Guest'}</p>

        {props.r.creation_date ? <i>Created {props.r.creation_date}</i> : ''}
        {props.r.last_update ? <i>Modified {props.r.last_update}</i> : ''}

        <i onClick={props.userData && (props.userData.id !== props.r.user_id) ? handleLikes : handleLikeHateOwn}><FontAwesomeIcon icon={userLikedReaction ? solidFaThumbsUp : regularFaThumbsUp} />{likesCounter > 0 ? likesCounter : null}</i>
        <i onClick={props.userData && (props.userData.id !== props.r.user_id) ? handleHates : handleLikeHateOwn}><FontAwesomeIcon icon={userHatedReaction ? solidFaThumbsDown : regularFaThumbsDown} />{hatesCounter > 0 ? hatesCounter : null}</i>

      </div>

      {props.userData ?
        <div className={styles.buttons_for_users}>
          {props.r.user_id === props.userData.id || props.userData.id === settings.adminId || props.n.user_id === props.userData.id ?
            (<div><div onClick={() => setShow(true)} className={styles.button_remove}><i><FontAwesomeIcon icon={faTrashCan} /></i></div>
              <ConfirmToast
                asModal={true}
                customFunction={handleDeleteReaction}
                setShowConfirmToast={setShow}
                showConfirmToast={show}
              /></div>)
            : null}
          {props.r.user_id === props.userData.id || props.userData.id === settings.adminId ?
            <Link to={`/editreaction/${props.r.id}`}><i><FontAwesomeIcon icon={faEdit} /></i></Link>
            : null}
        </div>
        : null}

    </div>
  );
}

export default Reaction;