import styles from './BoardPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getPosts, updatePosts } from '../../../redux/reducers/postsReducer';
import { getComments, updateComments } from '../../../redux/reducers/commentsReducer';
import { getUser, updateUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { messages } from '../../../settings';
import Post from '../../features/Post/Post';
import { fetchPosts, createPost } from '../../utils/posts';

const BoardPage = () => {

  const dispatch = useDispatch();
  const userData = useSelector(state => getUser(state));
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState(userData ? userData.name : "");
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const handleSendNewPost = () => {
    const newPost = {
      title: newPostTitle,
      content: newPostContent,
      author: userData ? userData.name : newPostAuthor,
    }
    posts.push(newPost);
    dispatch(updatePosts(posts));
    createPost(newPost);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostAuthor('');
    setReloadTrigger(!reloadTrigger);
  }

  useEffect(() => {
    fetchPosts(dispatch);
  }, [reloadTrigger]);
  const posts = useSelector(state => getPosts(state));
  
  if (posts) {    
    return (
      <div className={styles.board}>
        <h3>BoardPage component</h3>

        {posts.map(post => (
          <Post post={post} />
        ))}

        <input id="new-post-title" type="text" placeholder={messages.newPost.title} 
              title={messages.newPost.text} value={newPostTitle} 
              onChange={event => setNewPostTitle(event.target.value)} />
        <input id="new-post-content" type="text" placeholder={messages.newPost.content} 
              title={messages.newPost.text} value={newPostContent} 
              onChange={event => setNewPostContent(event.target.value)} />
        {userData ? `Author: ${userData.name}` : 
              <input id="new-post-author" type="text" placeholder={messages.newPost.author} 
                    title={messages.newPost.author} value={""} 
                    onChange={event => setNewPostAuthor(event.target.value)} />
        } 
        <div onClick={handleSendNewPost}>send post</div>

        <RandomQuote />
      </div>
    );
  } else {
    return (
      <div className={styles.board}>
        <h3>BoardPage component</h3>
        <h5>No posts found</h5>
      </div>
    )
  }
}    

export default BoardPage;