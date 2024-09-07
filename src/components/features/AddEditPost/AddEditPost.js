import styles from './AddEditPost.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getPosts, updatePosts } from '../../../redux/reducers/postsReducer';
import { getUser } from '../../../redux/reducers/userReducer';
import { messages } from '../../../settings';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchPosts, createPost, updatePost } from '../../../utils/posts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ConfirmToast } from 'react-confirm-toast'

const AddEditPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(state => getPosts(state));
  const userData = useSelector(state => getUser(state));
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState(userData ? (userData.name || userData.login) : '');
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.token) {
        await fetchPosts(dispatch);
      }
    };
    fetchData();
  }, [dispatch, reloadTrigger]);

  useEffect(() => {
    if (postId) {
      const post = posts.find(post => post.id === parseInt(postId));
      if (post) {
        setNewPostTitle(post.title);
        setNewPostContent(post.content);
        setNewPostAuthor(post.guest_author);
      }
    }
  }, [postId, posts]);

  const handleSendNewPost = async () => {
    const newPost = {
      title: newPostTitle,
      content: newPostContent,
      guest_author: newPostAuthor,
    };

    if (postId) {
      const updatedPosts = posts.map(post => 
        post.id === parseInt(postId) ? { ...post, ...newPost } : post
      );
      dispatch(updatePosts(updatedPosts));
      updatePost(postId, newPost);
    } else {
      dispatch(updatePosts([...posts, newPost]));
      try {
        await toast.promise(
          createPost(newPost),
          {
            pending: 'Creating comment',
            success: 'comment created',
            error: 'Error',
          }, {toastId: 4}
        );
      } catch (error) {
        console.error('Error during creation:', error);
        toast.error('Error during creation');
      }
    }
    navigate(-1)
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostAuthor(userData ? (userData.name || userData.login) : '');
    setReloadTrigger(!reloadTrigger);
  };

  const handleBack = () => {
    navigate(-1)
  }

  const handleClickAddEditPost = () => {
    if (!newPostTitle) {
      toast.error('Error. No title.')
    } else if (!newPostContent) {
      toast.error('Error. No post content.')
    } else {
      setShowToast(true)
    }
  }

  return (
    <div className={styles.addeditpost}>
      <h3>{postId ? `Edit Post ${postId} component` : 'Add Post component'}</h3>
      <input
        id="new-post-title"
        type="text"
        placeholder={messages.newPost.title}
        title={messages.newPost.text}
        value={newPostTitle}
        onChange={event => setNewPostTitle(event.target.value)}
      />
      <input
        id="new-post-content"
        type="text"
        placeholder={messages.newPost.content}
        title={messages.newPost.text}
        value={newPostContent}
        onChange={event => setNewPostContent(event.target.value)}
      />
      {userData ? (
        <p className={styles.post_author_user}>Author: {userData.name || userData.login}</p>
      ) : (
        <input
          id="new-post-author"
          type="text"
          placeholder={messages.newPost.author}
          title={messages.newPost.author}
          value={newPostAuthor}
          onChange={event => setNewPostAuthor(event.target.value)}
        />
      )}
      <button onClick={handleClickAddEditPost}>{postId ? 'Update post' : 'Add post'}</button>
      <ConfirmToast
        asModal={true}
        toastText='Are you sure?'
        customFunction={handleSendNewPost}
        setShowConfirmToast={setShowToast}
        showConfirmToast={showToast}
      />
      <button onClick={handleBack}>back</button>
      <RandomQuote />
    </div>
  );
};

export default AddEditPost;