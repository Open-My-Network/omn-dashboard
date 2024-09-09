import { useState, useEffect } from 'react';

const useFetchApiData = (url, page, limit, queryParams = {}) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Convert queryParams object to query string
      const queryString = new URLSearchParams({
        page,
        limit,
        ...queryParams
      }).toString();

      try {
        const response = await fetch(`${url}?${queryString}`);
        const result = await response.json();

        if (response.ok) {
          setData(result.data || []);
          const pagination = result.pagination || {};
          const calculatedTotalPages = pagination.totalPages || Math.ceil(pagination.totalCount / limit);

          setTotalPages(calculatedTotalPages);
        } else {
          setError(result.message || 'Something went wrong');
        }
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page, limit, JSON.stringify(queryParams)]);

  return { data, totalPages, loading, error };
};

export default useFetchApiData;
