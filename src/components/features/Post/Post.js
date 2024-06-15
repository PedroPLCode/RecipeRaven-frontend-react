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

const Post = (props) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState(props.userData ? (props.userData.name ? props.userData.name : props.userData.login) : "");
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleSendNewComment = (event) => {
    event.preventDefault();
    const newComment = {
      content: newCommentContent,
      post_id: props.post.id,
      guest_author: localStorage.token ? null : newCommentAuthor,
      author: localStorage.token ? (props.userData.name ? props.userData.name : props.userData.login) : null,
      user_id: localStorage.token ? props.userData.id : null,
    };
    console.log(newComment);
    const updatedPosts = props.posts.map(post => 
      post.id === props.post.id ? { ...post, comments: [...post.comments, newComment] } : post
    );
    dispatch(updatePosts(updatedPosts));
    createComment(newComment);
    setNewCommentContent('');
    setNewCommentAuthor('');
    setReloadTrigger(!reloadTrigger);
  };

  const handleDeletePost = () => {
    if (props.post.comments.length <= 1) {
      deletePost(props.post.id);
      const updatedPosts = props.posts.filter(post => post.id !== props.post.id);
      dispatch(updatePosts(updatedPosts));
    } else {
      alert(`Post have ${props.post.comments.length} comments already`)
    }
  };

  return (
    <div className={styles.post}>
      <strong>{props.post.title}</strong>

      {props.userData ?  
      (props.post.user_id === props.userData.id ? 
      <div>
      <div onClick={handleDeletePost} className={styles.button_remove}><i>Delete Post <FontAwesomeIcon icon={faTrashCan} /></i></div>
      <Link to={`/addeditpost/${props.post.id}`}>Edit post</Link>
      </div>
       : '')
       : 
      ''}

      <p>Created {props.post.creation_date}</p>
      { props.post.last_update ? <p>Modified {props.post.last_update}</p> : '' }
      <p>{props.post.content}</p>
      <p>Author: {props.post.author ? props.post.author : props.post.guest_author ? `${props.post.guest_author} (Guest)` : 'Guest'}</p>
      <img src={`http://localhost:5000/static/profile_pictures/${props.post.author ? props.post.author_picture : 'anonymous.jpg'}`} alt="profile" />

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
    </div>
  </>
)}


    </div>
  );
};

export default Post;
