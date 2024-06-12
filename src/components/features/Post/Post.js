import styles from './Post.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { updatePosts } from '../../../redux/reducers/postsReducer';
import { createComment } from '../../utils/comments';
import { messages } from '../../../settings';
import Comment from '../Comment/Comment';

const Post = (props) => {
  const dispatch = useDispatch();
  const [newCommentId, setNewCommentId] = useState(props.post.id);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState(props.userData ? (props.userData.name ? props.userData.name : props.userData.login) : "");
  const [reloadTrigger, setReloadTrigger] = useState(false);

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

  return (
    <div className={styles.post}>
      <strong>{props.post.title}</strong>
      <p>{props.post.content}</p>
      <p>Author: {props.post.author ? props.post.author : props.post.guest_author ? `${props.post.guest_author} (Guest)` : 'Guest'}</p>
      <img src={`http://localhost:5000/static/profile_pictures/${props.post.author ? props.post.author_picture : 'anonymous.jpg'}`} alt="profile" />
      
      {props.post.comments ? 
        props.post.comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        )) :
        <p>No comments to this post. Be first</p>
      }

      <div>
        <input 
          id="new-post-content" 
          type="text" 
          placeholder={messages.newPost.content} 
          title={messages.newPost.text} 
          value={newCommentContent} 
          onChange={event => setNewCommentContent(event.target.value)} 
        />
        {props.userData ? 
          `Author: ${props.userData.name ? props.userData.name : props.userData.login}` : 
          <input 
            id="new-post-author" 
            type="text" 
            placeholder={messages.newPost.author} 
            title={messages.newPost.author} 
            value={newCommentAuthor} 
            onChange={event => setNewCommentAuthor(event.target.value)} 
          />
        } 

        <button onClick={(event) => handleSendNewComment(event)}>
          Add comment
        </button>
      </div>
    </div>
  );
};

export default Post;
