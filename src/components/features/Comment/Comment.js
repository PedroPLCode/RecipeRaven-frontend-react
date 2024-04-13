const Comment = props => {
  
    return (
      <div className={styles.comment}>
        <p>{comment.title}</p>
        <p>{comment.content}</p>
      </div>
    );
  }
        
  export default Comment;