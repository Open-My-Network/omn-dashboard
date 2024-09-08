import React, { useState } from 'react';
import fetchApiData from '../../../services/FetchData.js';
import pagePagination from '../../../services/PaginateData.js';

const PostPage = () => {
  const [postType, setPostType] = useState('');
  const [postStatus, setPostStatus] = useState('');
  const [filterApplied, setFilterApplied] = useState(false); // State to track if filter is applied
  const { currentPage, handleNextPage, handlePrevPage } = pagePagination(1);

  // Use conditional queryParams based on filterApplied
  const queryParams = filterApplied ? { post_type: postType, post_status: postStatus } : {};

  const {
    data: users,
    totalPages = 1,
    loading,
    error,
  } = fetchApiData('http://localhost:3000/api/posts', currentPage, 10, queryParams);

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const handlePostStatusChange = (e) => {
    setPostStatus(e.target.value);
  };

  const applyFilters = () => {
    setFilterApplied(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Filters and Button */}
      <div className="flex items-center mb-4 space-x-4">
        <div className="flex items-center">
          <label htmlFor="postType" className="mr-2">
            Filter by Post Type:
          </label>
          <select id="postType" value={postType} onChange={handlePostTypeChange} className="form-select">
            <option value="">All</option>
            <option value="page">Page</option>
            <option value="leep">Leep</option>
            <option value="survey">Survey</option>
            <option value="post">Post</option>
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="postStatus" className="mr-2">
            Filter by Post Status:
          </label>
          <select id="postStatus" value={postStatus} onChange={handlePostStatusChange} className="form-select">
            <option value="">All</option>
            <option value="publish">Publish</option>
            <option value="draft">Draft</option>
            <option value="auto-draft">Auto Draft</option>
            <option value="inherit">Inherit</option>
          </select>
        </div>

        <button className="btn btn-primary ml-4" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      {/* Table for displaying data */}
      <div className="overflow-x-auto">
        <table className="table table-dark table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="px-6 py-3">S.N.</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((post, index) => (
              <tr key={post.id}>
                <td className="px-6 py-4">{(currentPage - 1) * 10 + index + 1}</td>
                <td className="px-6 py-4">{post.post_title}</td>
                <td className="px-6 py-4">
                  <span className="badge rounded-pill text-bg-primary">{post.post_status}</span>
                </td>
                <td className="px-6 py-4">{post.post_author}</td>
                <td className="px-6 py-4">
                  <button className="btn btn-outline-light btn-sm">Edit</button>
                  <button className="btn btn-outline-danger btn-sm ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className={`btn btn-secondary ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePrevPage()}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`btn btn-secondary ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handleNextPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostPage;
