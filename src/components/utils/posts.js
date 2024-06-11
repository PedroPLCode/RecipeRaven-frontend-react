import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getPosts, updatePosts } from '../../redux/reducers/postsReducer';
import { getComments, updateComments } from '../../redux/reducers/commentsReducer';
import { getUser, updateUser } from '../../redux/reducers/userReducer';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { messages } from '../../settings';
import Post from '../features/Post/Post';

export const fetchPosts = async dispatch => {
  const url = `http://localhost:5000/api/posts`;
  const options = {
    method: 'GET',
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const finalResponse = await JSON.parse(result)
    dispatch(updatePosts(finalResponse));
    console.log(finalResponse)
    return finalResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const createPost = async (payload) => {
  const url = `http://localhost:5000/api/posts`;
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
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    console.error('Error creating post:', error);
  }
};


//PUT

//DELETE