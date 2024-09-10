import { updateNews } from '../redux/reducers/newsReducer';
import { toast } from 'react-toastify';
import { settings } from '../settings';

export const fetchNews = async dispatch => {
  const url = `${settings.backendUrl}/api/news`;
  const options = {
    method: 'GET',
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const finalResponse = await JSON.parse(result)
    toast.success(finalResponse.msg)
    dispatch(updateNews(finalResponse.results));
    return finalResponse;
  } catch (error) {
    return error;
  }
}

export const createNews = async (payload) => {
  const url = `${settings.backendUrl}/api/news`;
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
    console.error('Error creating news:', error);
  }
};


export const updateSingleNews = async (newsId, payload) => {
  const url = `${settings.backendUrl}/api/news/${newsId}`;
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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      toast.success('News updated succesfully.');
    }
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    console.error('Error updating news:', error);
    toast.warning('There was an error updating the news. Please try again later.');
  }
};


export const deleteNews = async newsId => {
  const url = `http://localhost:5000/api/news/${newsId}`;
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
    const finalResult = await JSON.parse(result)
    toast.success('News deleted succesfully.');
    return finalResult;
  } catch (error) {
    toast.warning('There was an error deleting the news. Please try again later.');
    return error;
  }
}