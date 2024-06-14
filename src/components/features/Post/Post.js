import styles from './Post.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { createComment } from '../../utils/comments';
import { messages } from '../../../settings';
import Comment from '../Comment/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deletePost } from '../../utils/posts';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getPosts, updatePosts } from '../../../redux/reducers/postsReducer';

const Post = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => getPosts(state));
  const userData = useSelector(state => getUser(state));
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [newCommentId, setNewCommentId] = useState(props.post.id);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState(props.userData ? (props.userData.name ? props.userData.name : props.userData.login) : "");
  const [reloadTrigger, setReloadTrigger] = useState(false);

const post = posts.find(post => post.id === props.post.id);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleSendNewComment = (event) => {
    event.preventDefault();
    const newComment = {
      content: newCommentContent,
      guest_author: newCommentAuthor,
      post_id: props.post.id,
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

      <p>{props.post.content}</p>
      <p>Author: {props.post.author ? props.post.author : props.post.guest_author ? `${props.post.guest_author} (Guest)` : 'Guest'}</p>
      <img src={`http://localhost:5000/static/profile_pictures/${props.post.author ? props.post.author_picture : 'anonymous.jpg'}`} alt="profile" />

      <button onClick={toggleComments}>
      {props.post.comments ? 
      (showComments ? (
        <span>Hide Comments</span>
      ) : (
        <span>{props.post.comments.length} Comments - Show</span>
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
