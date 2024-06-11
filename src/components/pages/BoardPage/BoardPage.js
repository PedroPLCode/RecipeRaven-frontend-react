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
import { getUserData, createUser, changeUserDetails } from '../../utils/users'

const BoardPage = () => {

  //let userData = null

  const dispatch = useDispatch();
  const posts = useSelector(state => getPosts(state));
  const userData = useSelector(state => getUser(state));
  //const userData = useSelector(state => getUser(state));
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState(userData ? `${userData.name ? userData.name : userData.login}` : "");
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const handleSendNewPost = () => {
    const newPost = {
      title: newPostTitle,
      content: newPostContent,
      guest_author: newPostAuthor,
    }
    console.log(newPost)
    posts.push(newPost);
    dispatch(updatePosts(posts));
    createPost(newPost);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostAuthor('');
    setReloadTrigger(!reloadTrigger);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.token) {
          //userData = await getUserData(dispatch);
          console.log(userData)
          //setNewPostAuthor(await userData ? `${userData.name ? userData.name : userData.login}` : newPostAuthor)
        }
        
        fetchPosts(dispatch);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [reloadTrigger]);

  console.log(userData)

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
        {userData ? `Author: ${userData.name ? userData.name : userData.login}` : 
              <input id="new-post-author" type="text" placeholder={messages.newPost.author} 
                    title={messages.newPost.author} value={newPostAuthor} 
                    onChange={event => setNewPostAuthor(event.target.value)} />
        } 

        <button onClick={handleSendNewPost}>
        Send post
      </button>

        <RandomQuote />
      </div>
    );
  } else {
    return (
      <div className={styles.board}>
        <h3>BoardPage component</h3>
        <h5>No posts found</h5>

        <input id="new-post-title" type="text" placeholder={messages.newPost.title} 
              title={messages.newPost.text} value={newPostTitle} 
              onChange={event => setNewPostTitle(event.target.value)} />
        <input id="new-post-content" type="text" placeholder={messages.newPost.content} 
              title={messages.newPost.text} value={newPostContent} 
              onChange={event => setNewPostContent(event.target.value)} />
        {userData ? `Author: ${userData.name ? userData.name : userData.login}` : 
              <input id="new-post-author" type="text" placeholder={messages.newPost.author} 
                    title={messages.newPost.author} value={newPostAuthor} 
                    onChange={event => setNewPostAuthor(event.target.value)} />
        } 

        <button onClick={handleSendNewPost}>
        Send post
      </button>


        <RandomQuote />
      </div>
    )
  }
}    

export default BoardPage;