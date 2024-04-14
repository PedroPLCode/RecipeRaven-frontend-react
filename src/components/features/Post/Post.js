import styles from './Post.module.scss'

const Post = props => {
  
    return (
      <div className={styles.post}>
        <strong>{props.post.title}</strong>
        <p>{props.post.content}</p>
        <p>Author: {props.post.author}</p>
      </div>
    );
  }
        
  export default Post;