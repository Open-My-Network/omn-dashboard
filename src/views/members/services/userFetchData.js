import { useState, useEffect } from 'react';

const userFetchData = (url, page, limit) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}?page=${page}&limit=${limit}`);
        const result = await response.json();

        if (response.ok) {
          setData(result.data);
          setTotalPages(result.totalPages || Math.ceil(result.total / limit));
        } else {
          setError(result.message || 'Something went wrong');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page, limit]);

  return { data, totalPages, loading, error };
};

export default userFetchData;
