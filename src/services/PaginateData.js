import { useState } from 'react'

const pagePagination = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handleNextPage = (totalPages) => {
    if (totalPages && Number.isInteger(totalPages) && totalPages > 0 && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const goToPage = (page, totalPages) => {
    if (
      totalPages &&
      Number.isInteger(totalPages) &&
      totalPages > 0 &&
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page)
    }
  }

  return { currentPage, handleNextPage, handlePrevPage, setCurrentPage: goToPage }
}

export default pagePagination
