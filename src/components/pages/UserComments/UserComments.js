import styles from './UserComments.module.scss';
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

const UserComments = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => getPosts(state));
  const userData = useSelector(state => getUser(state));

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
  }, []);

  console.log(userData)

  if (posts) {    
    return (
      <div className={styles.board}>
        <h3>Posts with {userData ? (userData.name ? userData.name : userData.login): 'Your'} comments</h3>

        {posts
        .filter(post => post.comments.some(comment => comment.user_id === userData.id))
        .map(post => (
          <Post key={post.id} post={post} posts={posts} userData={userData} />
        ))}


        <RandomQuote />
      </div>
    );
  } else {
    return (
      <div className={styles.board}>
        <h3>BoardPage component</h3>
        <h5>No posts found</h5>

        <RandomQuote />
      </div>
    )
  }
}    

export default UserComments;