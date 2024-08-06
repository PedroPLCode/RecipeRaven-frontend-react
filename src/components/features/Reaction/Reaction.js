import styles from './Reaction.module.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
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

  const dispatch = useDispatch();

  const handleDeleteReaction = () => {

    deleteReaction(props.comment.id);

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

  return (
    <div className={styles.reaction}>

      <div className={styles.content}>
        <p>{props.r.content}</p>

        <p className={styles.reaction_author}>Author: {props.r.author ? props.r.author : props.r.guest_author ? `${props.comment.guest_author} (Guest)` : 'Guest'}</p>

        {props.r.creation_date ? <i>Created {props.r.creation_date}</i> : ''}
        {props.r.last_update ? <i>Modified {props.r.last_update}</i> : ''}
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