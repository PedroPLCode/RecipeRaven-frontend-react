import styles from './Post.module.scss';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { createComment } from '../../utils/comments';
import Comment from '../Comment/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faThumbsUp as solidFaThumbsUp, faThumbsDown as solidFaThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularFaThumbsUp, faThumbsDown as regularFaThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { deletePost, handleUserReaction, handleLikeHateOwn } from '../../utils/posts';
import { Link } from 'react-router-dom';
import { updatePosts } from '../../../redux/reducers/postsReducer';
import { settings } from '../../../settings.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createNotification } from '../../utils/notifications';
import { ConfirmToast } from 'react-confirm-toast'
import clsx from 'clsx';
import { useEffect } from 'react';

const Post = (props) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState(props.userData ? (props.userData.name ? props.userData.name : props.userData.login) : "");
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [showToast, setShowToast] = useState(false)

  const [userLikedPost, setUserLikedPost] = useState(false)
  const [likesCounter, setLikesCounter] = useState(props.post.likes.length)
  const [userHatedPost, setUserHatedPost] = useState(false)
  const [hatesCounter, setHatesCounter] = useState(props.post.hates.length)

  useEffect(() => {
    if (props.userData) {
      const isPostLiked = props.post.likes.some(likeUserId => likeUserId === props.userData.id);
      const isPostHated = props.post.hates.some(hateUserId => hateUserId === props.userData.id);
      setUserLikedPost(isPostLiked)
      setUserHatedPost(isPostHated)
    }
  }, [props.post.likes, props.post.hates]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleSendNewComment = async (event) => {
    event.preventDefault();

    if (!newCommentContent) {
      toast.error('Error. No comment content.')
    } else {
      const newComment = {
        content: newCommentContent,
        post_id: props.post.id,
        guest_author: localStorage.token ? null : newCommentAuthor,
        author: localStorage.token ? (props.userData.name ? props.userData.name : props.userData.login) : null,
        user_id: localStorage.token ? props.userData.id : null,
      };
  
      const updatedPosts = props.posts.map(post => 
        post.id === props.post.id ? { ...post, comments: [...post.comments, newComment] } : post
      );
      dispatch(updatePosts(updatedPosts));
  
      try {
        await toast.promise(
          createComment(newComment),
          {
            pending: 'Creating comment',
            success: 'comment created',
            error: 'Error',
          }, {toastId: 4}
        );
      } catch (error) {
        console.error('Error during delete:', error);
        toast.error('Error during delete');
      }
  
      setNewCommentContent('');
      setNewCommentAuthor('');
      setReloadTrigger(!reloadTrigger);
    }
  };

  const handleClickDeletePost = () => {
    setShowToast(true)
  }

  const handleDeletePost = () => {
    if (props.post.comments.length === 0) {
      deletePost(props.post.id);
      const updatedPosts = props.posts.filter(post => post.id !== props.post.id);
      dispatch(updatePosts(updatedPosts));
    } else {
      alert(`Post have ${props.post.comments.length} comments already`)
    }
  };

  const handleLikes = () => {
    if (userHatedPost) {
      handleUserReaction('posts', 'hate', props.post.id, userHatedPost, setUserHatedPost, setHatesCounter);
    }
    handleUserReaction('posts', 'like', props.post.id, userLikedPost, setUserLikedPost, setLikesCounter);
  };
  
  const handleHates = () => {
    if (userLikedPost) {
      handleUserReaction('posts', 'like', props.post.id, userLikedPost, setUserLikedPost, setLikesCounter);
    }
    handleUserReaction('posts', 'hate', props.post.id, userHatedPost, setUserHatedPost, setHatesCounter);
  };
  
  const displayAuthorName = props.post.author
  ? props.post.author
  : props.post.guest_author
  ? (
    <>
      {props.post.guest_author}<br />(Guest)
    </>
    )
  : 'Guest';

  return (
    <div className={styles.post}>

      {props.userData ?  
            (props.post.user_id === props.userData.id || props.userData.id === settings.adminId ? 
            <div className={styles.buttons_for_users}>
            <div onClick={handleClickDeletePost} className={styles.button_remove}><i>Delete <FontAwesomeIcon icon={faTrashCan} /></i></div>
            <ConfirmToast
              asModal={true}
              customFunction={handleDeletePost}
              setShowConfirmToast={setShowToast}
              showConfirmToast={showToast}
            />
            <Link to={`/addeditpost/${props.post.id}`}><i>Edit <FontAwesomeIcon icon={faEdit} /></i></Link>
            </div>
            : null)
            : 
            null}

      <div className={styles.post_content}>
        <div className={styles.post_text}>
          <p>{props.post.title}</p>
          <p>{props.post.content}</p>

          <i>Created {props.post.creation_date}</i>
          { props.post.last_update ? <i>Modified {props.post.last_update}</i> : '' }

          <i onClick={props.userData && (props.userData.id !== props.post.user_id) ? handleLikes : handleLikeHateOwn}><FontAwesomeIcon icon={userLikedPost ? solidFaThumbsUp : regularFaThumbsUp} />{likesCounter > 0 ? likesCounter : null}</i>
          <i onClick={props.userData && (props.userData.id !== props.post.user_id) ? handleHates : handleLikeHateOwn}><FontAwesomeIcon icon={userHatedPost ? solidFaThumbsDown : regularFaThumbsDown} />{hatesCounter > 0 ? hatesCounter : null}</i>

        </div>
        <div className={styles.post_author}>
          {props.post.author_picture ? (
                <img src={`${(props.post.author_google_user && props.post.author_original_google_picture) ? '' : 'http://localhost:5000/static/uploaded_photos/'}${props.post.author_picture}`} alt='no profile picture' />
              ) : <img src='http://localhost:5000/static/uploaded_photos/guest_author.jpeg' alt='no profile picture'/> }
          <i className={styles.author_name}>Author:<br />{displayAuthorName}</i>
        </div>
      </div>

      <button onClick={toggleComments} className={clsx(showComments ? styles.comments_show : '')}>
      {props.post.comments ? 
      (showComments ? (
        <span>Hide Comments</span>
      ) : (
        <span>
          {props.post.comments && props.post.comments.length > 0 
            ? `${props.post.comments.length} ${props.post.comments.length > 1 ? 'Comments' : 'Comment'} - Show`
            : 'Add Comment'}
        </span>
      ))
      : ''}
      
      </button>

      {showComments && (
  <>
    {props.post.comments && props.post.comments.length > 0 ? (
      props.post.comments.map((comment, index) => (
        <Comment key={index} comment={comment} post={props.post} posts={props.posts} userData={props.userData} />
      ))
    ) : (
      <p className={styles.no_posts}>No comments to this post. Be the first!</p>
    )}

    <div className={styles.addcomment}>
      <input 
        id="new-comment-content" 
        type="text" 
        placeholder="Enter your comment" 
        value={newCommentContent} 
        onChange={event => setNewCommentContent(event.target.value)} 
      />
      
      {props.userData ? (
        <p>Author: {props.userData.name ? props.userData.name : props.userData.login}</p>
      ) : (
        <input 
          id="new-comment-author" 
          type="text" 
          placeholder="Your name" 
          value={newCommentAuthor} 
          onChange={event => setNewCommentAuthor(event.target.value)} 
        />
      )}

      <button className={styles.add_comment} onClick={handleSendNewComment}>
      {props.post.comments.length > 0 ? (
        <span>Add Comment</span>
      ) : (
        <span>Add First Comment</span>
      )}
      </button>
      
    </div>

    <button onClick={toggleComments} className={clsx(styles.toggle_comments, showComments ? styles.comments_show : '')}>
      {props.post.comments ? 
      (showComments ? (
        <span>Hide Comments</span>
      ) : (
        <span>{props.post.comments && props.post.comments.length > 0 ? `${props.post.comments.length} Comments - Show` : 'Add Comment'}</span>
      ))
      : ''}
      
      </button>
  </>
)}


    </div>
  );
};

export default Post;