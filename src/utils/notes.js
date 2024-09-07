export const updateNote = async (payload) => {
  const url = `http://localhost:5000/api/notes`;
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
    console.error('Error updating note:', error);
  }
};