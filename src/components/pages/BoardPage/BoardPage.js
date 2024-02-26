import styles from './BoardPage.module.scss';
import RandomQuote from '../../features/RandomQuote/RandomQuote';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getBoard, updateBoard } from '../../../redux/reducers/boardReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { messages } from '../../../settings';

const BoardPage = () => {

  const dispatch = useDispatch();
  const boardArray = useSelector(state => getBoard(state));
  const [newPostText, setNewPostText] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState('');
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const handleSendNewPost = () => {
    const newPost = {
      text: newPostText,
      author: newPostAuthor,
    }
    boardArray.push(newPost);
    dispatch(updateBoard(boardArray));
    addNewPostToAPI(newPost);
    setNewPostText('');
    setNewPostAuthor('');
    setReloadTrigger(!reloadTrigger);
  }

  const fetchBoard = async () => {
    const url = `http://localhost:5000/board`;
    const options = {
      method: 'GET',
    }; 
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const finalResponse = await JSON.parse(result)
      dispatch(updateBoard(finalResponse));
      return finalResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const addNewPostToAPI = async payload => {
    const url = `http://localhost:5000/board`;
    const options = {
      method: 'POST',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(payload)
    }; 
    fetch(url, options)
    .then(function(response) {
      return response;
    })
    .then(function(parsedResponse) {
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchBoard();
  }, [reloadTrigger]);

  return (
    <div className={styles.board}>
      <h3>BoardPage component</h3>

      {boardArray.map(singlePost => (
        <div>
          {singlePost.data ? <div><p>{singlePost.data.text}</p> <p>{singlePost.data.author}</p> </div> : ''}
        </div>
      ))}

      <input id="new-post" type="text" placeholder={messages.newPost.text} 
             title={messages.newPost.text} value={newPostText} 
             onChange={event => setNewPostText(event.target.value)} />
      <input id="post-author" type="text" placeholder={messages.newPost.author} 
             title={messages.newPost.author} value={newPostAuthor} 
             onChange={event => setNewPostAuthor(event.target.value)} />
      <div onClick={handleSendNewPost}>send post</div>

      <RandomQuote />
    </div>
  );
}
    
export default BoardPage;