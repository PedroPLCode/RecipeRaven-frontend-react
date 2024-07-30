import styles from './UserPosts.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getPosts } from '../../../redux/reducers/postsReducer';
import { getUser } from '../../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import Post from '../../features/Post/Post';
import { fetchPosts } from '../../utils/posts';
import { getUserData } from '../../utils/users';
import { useState } from 'react';
import { parse, compareAsc, compareDesc } from 'date-fns';

const UserPosts = () => {
  const dispatch = useDispatch();

  const [sortByNewest, setSortByNewest] = useState(true);

  const handleSortPosts = () => {
    setSortByNewest(!sortByNewest)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.token) {
          getUserData(dispatch);
          fetchPosts(dispatch);
        }
        fetchPosts(dispatch);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const posts = useSelector(state => getPosts(state));
  const userData = useSelector(state => getUser(state));

  const parseDate = (dateString) => {
    return parse(dateString.replace(' ', 'T').replace(' CET', 'Z'), 'yyyy-MM-dd\'T\'HH:mm:ssX', new Date());
  };
  
  const sortedPosts = posts
  .slice()
  .sort((a, b) => {
    const dateA = parseDate(a.creation_date);
    const dateB = parseDate(b.creation_date);
    console.log("Porównanie dat:", dateA, dateB);
    return sortByNewest ? compareDesc(dateA, dateB) : compareAsc(dateA, dateB);
  });

  if (posts) {    
    return (
      <div className={styles.board}>
        <h3>{userData ? (userData.name ? userData.name : userData.login): 'Your'} posts</h3>

        <button onClick={handleSortPosts}>
          Sorted by - {sortByNewest ? 'newest' : 'oldest'} - click to change
        </button>

        {sortedPosts
          .filter(post => post.user_id === userData.id)
          .map(post => (
            <Post key={post.id} post={post} posts={posts} userData={userData} />
          ))
        }

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

export default UserPosts;