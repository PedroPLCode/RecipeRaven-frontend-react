import styles from './Post.module.scss';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { createComment } from '../../utils/comments';
import Comment from '../Comment/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deletePost } from '../../utils/posts';
import { Link } from 'react-router-dom';
import { updatePosts } from '../../../redux/reducers/postsReducer';
import { settings } from '../../../settings.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createNotification } from '../../utils/notifications';

const Post = (props) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState(props.userData ? (props.userData.name ? props.userData.name : props.userData.login) : "");
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleSendNewComment = async (event) => {
    event.preventDefault();
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
  };

  const handleDeletePost = () => {
    if (props.post.comments.length === 0) {
      if (window.confirm("Delete the item?")) {
        deletePost(props.post.id);
        const updatedPosts = props.posts.filter(post => post.id !== props.post.id);
        dispatch(updatePosts(updatedPosts));
      }
    } else {
      alert(`Post have ${props.post.comments.length} comments already`)
    }
  };

  return (
    <div className={styles.post}>

      <div className={styles.post_header}>
        <div>
          <p>{props.post.title}</p>
        </div>
        <div>
          {props.post.author_picture ? (
                <img src={`${(props.post.author_google_user && props.post.author_original_google_picture) ? '' : 'http://localhost:5000/static/uploaded_photos/'}${props.post.author_picture}`} alt='no profile picture' />
              ) : null }
          <i>Author: {props.post.author ? props.post.author : props.post.guest_author ? `${props.post.guest_author} (Guest)` : 'Guest'}</i>
        </div>
      </div>

      {props.userData ?  
      (props.post.user_id === props.userData.id || props.userData.id === settings.adminId ? 
      <div>
      <div onClick={handleDeletePost} className={styles.button_remove}><i>Delete Post <FontAwesomeIcon icon={faTrashCan} /></i></div>
      <Link to={`/addeditpost/${props.post.id}`}>Edit post</Link>
      </div>
       : null)
       : 
      null}

      <p>{props.post.content}</p>

      <i>Created {props.post.creation_date}</i>
      { props.post.last_update ? <i>Modified {props.post.last_update}</i> : '' }

      <button onClick={toggleComments}>
      {props.post.comments ? 
      (showComments ? (
        <span>Hide Comments</span>
      ) : (
        <span>{props.post.comments && props.post.comments.length > 0 ? `${props.post.comments.length} Comments - Show` : 'Add Comment'}</span>
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
      <p>No comments to this post. Be the first!</p>
    )}

    <div>
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

      <button onClick={handleSendNewComment}>
      {props.post.comments.length > 0 ? (
  <span>Add Comment</span>
) : (
  <span>Add First Comment</span>
)}
      </button>

      <button onClick={toggleComments}>
      {props.post.comments ? 
      (showComments ? (
        <span>Hide Comments</span>
      ) : (
        <span>{props.post.comments && props.post.comments.length > 0 ? `${props.post.comments.length} Comments - Show` : 'Add Comment'}</span>
      ))
      : ''}
      
      </button>
      
    </div>
  </>
)}


    </div>
  );
};

export default Post;
