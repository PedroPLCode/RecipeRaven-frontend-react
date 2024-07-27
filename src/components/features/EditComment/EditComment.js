import styles from './EditComment.module.scss';
import RandomQuote from '../RandomQuote/RandomQuote';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getPosts, updatePosts } from '../../../redux/reducers/postsReducer';
import { getUser } from '../../../redux/reducers/userReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { updateComment } from '../../utils/comments';
import { fetchPosts } from '../../utils/posts';
import { ConfirmToast } from 'react-confirm-toast'

const EditComment = () => {
  const { commentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(state => getPosts(state));
  const userData = useSelector(state => getUser(state));

  const [newCommentContent, setNewCommentContent] = useState('');
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.token) {
        await fetchPosts(dispatch);
      }
    };

    fetchData();
  }, [dispatch, reloadTrigger]);

  useEffect(() => {
    if (commentId) {
      const comment = posts
        .flatMap(post => post.comments)
        .find(comment => comment.id === parseInt(commentId));

      if (comment) {
        setNewCommentContent(comment.content);
      }
    }
  }, [commentId, posts]);

  const handleEditComment = () => {

    const newComment = {
      content: newCommentContent,
    };
    if (commentId) {
      updateComment(commentId, newComment)
        .then(() => {
          const updatedPosts = posts.map(post => 
            post.comments.some(comment => comment.id === parseInt(commentId)) 
              ? { ...post, comments: post.comments.map(comment => comment.id === parseInt(commentId) ? newComment : comment) } 
              : post
          );
          dispatch(updatePosts(updatedPosts));
          navigate(-1);
        })
        .catch(error => console.error('Error updating comment:', error));
      }

    setNewCommentContent('');
    setReloadTrigger(!reloadTrigger);
  }

  const handleBack = () => {
    navigate(-1);
    
  }

  const handleClickEditComment = () => {
    setShowToast(true)
  }

  return (
    <div className={styles.board}>
      <h3>{commentId ? 'Edit Comment' : 'Add Comment'}</h3>
      <input 
        id="new-comment-content" 
        type="text" 
        placeholder="Enter your comment" 
        value={newCommentContent} 
        onChange={event => setNewCommentContent(event.target.value)} 
      />

      <button onClick={handleClickEditComment}>
        Edit Comment
      </button>
      <ConfirmToast
        asModal={true}
        toastText='Are you sure?'
        customFunction={handleEditComment}
        setShowConfirmToast={setShowToast}
        showConfirmToast={showToast}
      />
      <button onClick={handleBack}>Back</button>
      <RandomQuote />
    </div>
  );
};

export default EditComment;