import { useState } from 'react';

export const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    limit: initialLimit,
  });

  // Changing page when next/previous is clicked
  const changePage = (event, newPage) => {
    // Ensure the page does not go below 1
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage >= 0 ? newPage + 1 : 1, // Always at least page 1
    }));
  };

  const changeRowsPerPage = (event) => {
    setPagination((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      currentPage: 1, // Reset to first page when changing rows per page
    }));
  };

  return {
    pagination,
    changePage,
    changeRowsPerPage,
  };
};
