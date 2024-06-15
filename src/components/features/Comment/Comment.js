import styles from './Comment.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { updatePosts } from '../../../redux/reducers/postsReducer';
import { deleteComment } from '../../utils/comments';
import { Link } from 'react-router-dom';

const Comment = props => {

  console.log(props.comment)
  
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
  };
  
    return (
      <div className={styles.comment}>

      {props.userData && props.comment.user_id === props.userData.id ? 
      <div>
      <div onClick={handleDeleteComment} className={styles.button_remove}><i>Delete Comment <FontAwesomeIcon icon={faTrashCan} /></i></div>
      <Link to={`/editcomment/${props.comment.id}`}>Edit comment</Link>
      </div>
       : ''}

        { props.comment.creation_date ? <p>Created {props.comment.creation_date}</p> : '' }
        { props.comment.last_update ? <p>Modified {props.comment.last_update}</p> : '' }
        <p>{props.comment.content}</p>
        <p>Author: {props.comment.author ? props.comment.author : props.comment.guest_author ? `${props.comment.guest_author} (Guest)` : 'Guest'}</p>
      </div>
    );
  }
        
  export default Comment;