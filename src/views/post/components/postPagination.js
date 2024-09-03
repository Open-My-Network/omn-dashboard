import { useState } from "react";

const postPagination = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleNextPage = (totalPages) => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return { currentPage, handleNextPage, handlePrevPage, setCurrentPage };
};

export default postPagination;
