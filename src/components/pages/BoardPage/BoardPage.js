import styles from './BoardPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getPosts, updatePosts } from '../../../redux/reducers/postsReducer';
import { getUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import Post from '../../features/Post/Post';
import { fetchPosts, createPost } from '../../../utils/posts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { parse, compareAsc, compareDesc } from 'date-fns';

const BoardPage = () => {

  const dispatch = useDispatch();
  const posts = useSelector(state => getPosts(state));
  const userData = useSelector(state => getUser(state));
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [filterPostsString, setFilterPostsString] = useState('');
  const [filterAuthorsString, setFilterAuthorsString] = useState('');
  const [sortByNewest, setSortByNewest] = useState(true);

  const handleSortPosts = () => {
    setSortByNewest(!sortByNewest)
  }

  const handleFilterPosts = () => {
    return posts ? 
    posts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(filterPostsString.toLowerCase());
      const contentMatch = post.content.toLowerCase().includes(filterPostsString.toLowerCase());
      const authorMatch = (post.author && post.author.toLowerCase().includes(filterAuthorsString.toLowerCase())) ||
        (post.guest_author && post.guest_author.toLowerCase().includes(filterAuthorsString.toLowerCase()));
      return (titleMatch || contentMatch) && authorMatch;
    }) 
    : false;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchPosts(dispatch);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [reloadTrigger]);

  const parseDate = (dateString) => {
    return parse(dateString.replace(' ', 'T').replace(' CET', 'Z'), 'yyyy-MM-dd\'T\'HH:mm:ssX', new Date());
  };

  const sortedPosts = posts ? 
  handleFilterPosts()
    .slice()
    .sort((a, b) => {
      const dateA = parseDate(a.creation_date);
      const dateB = parseDate(b.creation_date);
      return sortByNewest ? compareDesc(dateA, dateB) : compareAsc(dateA, dateB);
    }) 
    : false;

  if (posts.length >= 1) {
    return (
      <div className={styles.board}>
        <h3>BoardPage component</h3>

        <input id="filter" type="text" placeholder='filter posts by title or content'
          title='filter posts' value={filterPostsString}
          onChange={event => setFilterPostsString(event.target.value)} />
        <input id="authors" type="text" placeholder='filter posts by authors'
          title='filter authors' value={filterAuthorsString}
          onChange={event => setFilterAuthorsString(event.target.value)} />
        <button onClick={handleSortPosts}>
          Sorted by - {sortByNewest ? 'newest' : 'oldest'} - click to change
        </button>

        <a href="/addeditpost">Add New Post</a>

        {posts ? (sortedPosts.map(post => (
          <Post key={post.id} post={post} posts={posts} userData={userData} />
        ))) : null}

        {posts ? <a href="/addeditpost">Add New Post</a> : null}

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