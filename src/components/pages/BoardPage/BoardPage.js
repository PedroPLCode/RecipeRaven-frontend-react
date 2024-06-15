import styles from './BoardPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getPosts, updatePosts } from '../../../redux/reducers/postsReducer';
import { getUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import Post from '../../features/Post/Post';
import { fetchPosts, createPost } from '../../utils/posts';

const BoardPage = () => {

  const dispatch = useDispatch();
  const posts = useSelector(state => getPosts(state));
  const userData = useSelector(state => getUser(state));
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState(userData ? `${userData.name ? userData.name : userData.login}` : "");
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const [filterPostsString, setFilterPostsString] = useState('');
  const [filterAuthorsString, setFilterAuthorsString] = useState('');
  const [sortByNewest, setSortByNewest] = useState(true);

  const handleSortPosts = () => {
    setSortByNewest(!sortByNewest)
  }
  
  const handleFilterPosts = () => {
    return posts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(filterPostsString.toLowerCase());
      const contentMatch = post.content.toLowerCase().includes(filterPostsString.toLowerCase());
      const authorMatch = (post.author && post.author.toLowerCase().includes(filterAuthorsString.toLowerCase())) ||
                          (post.guest_author && post.guest_author.toLowerCase().includes(filterAuthorsString.toLowerCase()));
  
      return (titleMatch || contentMatch) && authorMatch;
    });
  };
  

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
          console.log(userData)
        }
        
        fetchPosts(dispatch);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [reloadTrigger]);

  console.log(userData)

  if (posts.length >= 1) {    
    return (
      <div className={styles.board}>
        <h3>BoardPage component</h3>

        <input id="filter" type="text" placeholder='filter posts' 
                     title='filter posts' value={filterPostsString} 
                     onChange={event => setFilterPostsString(event.target.value)} />
        <input id="authors" type="text" placeholder='filter authors' 
                     title='filter authors' value={filterAuthorsString} 
                     onChange={event => setFilterAuthorsString(event.target.value)} />
        <button onClick={handleSortPosts}>
        Sorted by - {sortByNewest ? 'newest' : 'oldest'} - click to change
        </button>

      <a href="/addeditpost">New Post</a>

      {handleFilterPosts()
      .slice()
      .sort(sortByNewest ? (a, b) => new Date(b.creation_date) - new Date(a.creation_date) : (a, b) => new Date(a.creation_date) - new Date(b.creation_date))
      .map(post => (
        <Post key={post.id} post={post} posts={posts} userData={userData} />
      ))}

      <a href="/addeditpost">New Post</a>

        <RandomQuote />
      </div>
    );
  } else {
    return (
      <div className={styles.board}>
        <h3>BoardPage component</h3>
        <h5>No posts found</h5>

        
        <a href="/addeditpost">Add first Post</a>


        <RandomQuote />
      </div>
    )
  }
}    

export default BoardPage;