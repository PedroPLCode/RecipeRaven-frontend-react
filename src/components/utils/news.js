import { updateNews } from '../../redux/reducers/newsReducer';

export const fetchNews = async dispatch => {
  const url = `http://localhost:5000/api/news`;
  const options = {
    method: 'GET',
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const finalResponse = await JSON.parse(result)
    dispatch(updateNews(finalResponse));
    console.log(finalResponse)
    return finalResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const createNews = async (payload) => {
  const url = `http://localhost:5000/api/news`;
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
  const url = `http://localhost:5000/api/news/${newsId}`;
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
    }
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    console.error('Error updating news:', error);
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
    return finalResult;
  } catch (error) {
    console.log(error);
    return error;
  }
}