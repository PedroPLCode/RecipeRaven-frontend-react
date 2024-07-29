import styles from './Comment.module.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
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
  
    return (
      <div className={styles.comment}>

        <div className={styles.content}>
          <p>{props.comment.content}</p>

            <p className={styles.comment_author}>Author: {props.comment.author ? props.comment.author : props.comment.guest_author ? `${props.comment.guest_author} (Guest)` : 'Guest'}</p>
            
          { props.comment.creation_date ? <i>Created {props.comment.creation_date}</i> : '' }
          { props.comment.last_update ? <i>Modified {props.comment.last_update}</i> : '' }
        </div>

        {props.userData ?  
        (props.comment.user_id === props.userData.id || props.userData.id === settings.adminId ? 
        <div className={styles.buttons_for_users}>

          <div onClick={() => setShow(true)} className={styles.button_remove}><i><FontAwesomeIcon icon={faTrashCan} /></i></div>
          <ConfirmToast
          asModal={true}
            customFunction={handleDeleteComment}
            setShowConfirmToast={setShow}
            showConfirmToast={show}
          />

          <Link to={`/editcomment/${props.comment.id}`}><i><FontAwesomeIcon icon={faEdit} /></i></Link>
          </div>
          : null)
          : 
          null}

      </div>
    );
  }
        
  export default Comment;