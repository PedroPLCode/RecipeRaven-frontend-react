import styles from './Post.module.scss'

const Post = props => {
  
    return (
      <div className={styles.post}>
        <strong>{props.post.title}</strong>
        <p>{props.post.content}</p>
        <p>Author: {props.post.author ? props.post.author : props.post.guest_author ? `${props.post.guest_author} (Guest)` : 'Guest'}</p>
        <img src={`http://localhost:5000/static/profile_pictures/${props.post.author ? props.post.author_picture : 'anonymous.jpg'}`} alt="profile"/>
      </div>
    );
  }

  export default Post;