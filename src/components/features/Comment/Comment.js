import styles from './Comment.module.scss'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faThumbsUp as solidFaThumbsUp, faThumbsDown as solidFaThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularFaThumbsUp, faThumbsDown as regularFaThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { deletePost, handleUserReaction, handleLikeHateOwn } from '../../utils/posts';
import { useDispatch } from "react-redux";
import { updatePosts } from '../../../redux/reducers/postsReducer';
import { deleteComment } from '../../utils/comments';
import { Link } from 'react-router-dom';
import { settings } from '../../../settings'
import { ConfirmToast } from 'react-confirm-toast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createNotification } from '../../utils/notifications';

const Comment = props => {

  const [show, setShow] = useState(false)

  const [userLikedComment, setUserLikedComment] = useState(false);
  const [likesCounter, setLikesCounter] = useState(props.comment.likes.length);
  const [userHatedComment, setUserHatedComment] = useState(false);
  const [hatesCounter, setHatesCounter] = useState(props.comment.hates.length);

  useEffect(() => {
    if (props.userData) {
      const isCommentLiked = props.comment.likes.some(likeUserId => likeUserId === props.userData.id);
      const isCommentHated = props.comment.hates.some(hateUserId => hateUserId === props.userData.id);
      setUserLikedComment(isCommentLiked);
      setUserHatedComment(isCommentHated);
    }
  }, [props.comment.likes, props.comment.hates]);

  const dispatch = useDispatch();

  const handleDeleteComment = () => {

    deleteComment(props.comment.id);

    const updatedPosts = props.posts.map(post => {
      if (post.id === props.post.id) {
        const updatedComments = post.comments.filter(comment => comment.id !== props.comment.id);
        return { ...post, comments: updatedComments };
      } else {
        return post;
      }
    });

    dispatch(updatePosts(updatedPosts));
    toast.success('Comment deleted');
  };

  const handleLikes = () => {
    if (userHatedComment) {
      handleUserReaction('comments', 'hate', props.comment.id, userHatedComment, setUserHatedComment, setHatesCounter);
    }
    handleUserReaction('comments', 'like', props.comment.id, userLikedComment, setUserLikedComment, setLikesCounter);
  };

  const handleHates = () => {
    if (userLikedComment) {
      handleUserReaction('comments', 'like', props.comment.id, userLikedComment, setUserLikedComment, setLikesCounter);
    }
    handleUserReaction('comments', 'hate', props.comment.id, userHatedComment, setUserHatedComment, setHatesCounter);
  };
  

  return (
    <div className={styles.comment}>

      <div className={styles.content}>
        <p>{props.comment.content}</p>

        <p className={styles.comment_author}>Author: {props.comment.author ? props.comment.author : props.comment.guest_author ? `${props.comment.guest_author} (Guest)` : 'Guest'}</p>

        {props.comment.creation_date ? <i>Created {props.comment.creation_date}</i> : ''}
        {props.comment.last_update ? <i>Modified {props.comment.last_update}</i> : ''}

        <i onClick={props.userData && (props.userData.id !== props.comment.user_id) ? handleLikes : handleLikeHateOwn}><FontAwesomeIcon icon={userLikedComment ? solidFaThumbsUp : regularFaThumbsUp} />{likesCounter > 0 ? likesCounter : null}</i>
        <i onClick={props.userData && (props.userData.id !== props.comment.user_id) ? handleHates : handleLikeHateOwn}><FontAwesomeIcon icon={userHatedComment ? solidFaThumbsDown : regularFaThumbsDown} />{hatesCounter > 0 ? hatesCounter : null}</i>

      </div>

      {props.userData ?
        <div className={styles.buttons_for_users}>
          {props.comment.user_id === props.userData.id || props.userData.id === settings.adminId || props.post.user_id === props.userData.id ?
            (<div><div onClick={() => setShow(true)} className={styles.button_remove}><i><FontAwesomeIcon icon={faTrashCan} /></i></div>
              <ConfirmToast
                asModal={true}
                customFunction={handleDeleteComment}
                setShowConfirmToast={setShow}
                showConfirmToast={show}
              /></div>)
            : null}
          {props.comment.user_id === props.userData.id || props.userData.id === settings.adminId ?
            <Link to={`/editcomment/${props.comment.id}`}><i><FontAwesomeIcon icon={faEdit} /></i></Link>
            : null}
        </div>
        : null}

    </div>
  );
}

export default Comment;