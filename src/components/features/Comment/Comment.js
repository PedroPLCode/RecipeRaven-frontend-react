import styles from './Comment.module.scss'

const Comment = props => {
  
    return (
      <div className={styles.comment}>
        <p>{props.comment.content}</p>
        <p>Author: {props.comment.author ? props.comment.author : props.comment.guest_author ? `${props.comment.guest_author} (Guest)` : 'Guest'}</p>
      </div>
    );
  }
        
  export default Comment;