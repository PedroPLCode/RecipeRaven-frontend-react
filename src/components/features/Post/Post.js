import styles from './Post.models.scss'

const Post = props => {
  
    return (
      <div className={styles.post}>
        <p>{props.post.title}</p>
        <p>{props.post.content}</p>
        <p>{props.post.author}</p>
      </div>
    );
  }
        
  export default Post;