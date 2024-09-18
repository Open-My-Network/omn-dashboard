import axios from "axios";

// Helper function to build query string from an object
const buildQueryString = (params) => {
  const query = new URLSearchParams(params);
  return query.toString();
};

export const fetchUsers = async (url, queryParams = {}) => {
  try {
    const queryString = buildQueryString(queryParams);
    const response = await axios.get(`${url}?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
