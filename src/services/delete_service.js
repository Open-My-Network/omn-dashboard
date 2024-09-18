import axios from 'axios';

export const deleteUser = async (url, query) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/${url}?${query}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
