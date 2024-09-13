import { updatePosts } from '../redux/reducers/postsReducer';
import { toast } from 'react-toastify';
import { settings } from '../settings';
import { displayApiResponseMessage } from './utlis.js'

export const fetchPosts = async dispatch => {
  const url = `${settings.backendUrl}/api/posts`;
  const options = {
    method: 'GET',
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const finalResponse = await JSON.parse(result)
    displayApiResponseMessage(response, finalResponse);
    dispatch(updatePosts(finalResponse['results']));
    return finalResponse;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export const createPost = async (payload) => {
  const url = `${settings.backendUrl}/api/posts`;
  const headers = {
    'Content-Type': 'application/json',
  };

  if (localStorage.token) {
    headers['Authorization'] = 'Bearer ' + localStorage.token;
  }

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    displayApiResponseMessage(response, result);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};


export const updatePost = async (postId, payload) => {
  const url = `${settings.backendUrl}/api/posts/${postId}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  if (localStorage.token) {
    headers['Authorization'] = 'Bearer ' + localStorage.token;
  }

  const options = {
    method: 'PUT',
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayApiResponseMessage(response, result);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};


export const deletePost = async postId => {
  const url = `${settings.backendUrl}/api/posts/${postId}`;
  const options = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token,
    },
  }; 
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const finalResult = await JSON.parse(result);
    displayApiResponseMessage(response, result);
    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export const handleUserReaction = async (target, reactionType, Id, reactionExists, setUserReacted, setCounter) => {
  const url = `${settings.backendUrl}/api/${target}/${reactionType}/${Id}`;
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const finalResult = JSON.parse(result);

    if (finalResult.msg.includes('successfully')) {
      setUserReacted(prevReacted => !prevReacted);
      setCounter(prevCounter => prevCounter + (reactionExists ? -1 : 1));
    }
    
    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const handleLikeHateOwn = () => {
  const msg = localStorage.token ? "You can't add reaction to your own enrty" : "Only logged in users can add reactions.";
  toast.warning(msg, {toastId: 8});
}