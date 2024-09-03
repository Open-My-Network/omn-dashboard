import React, { useState } from "react";
import postFetchData from "../services/postFetchData.js";
import postPagination from "../components/postPagination.js";

const PostPage = () => {
  // State for current page, post type, sort order, and filters
  const { currentPage, handleNextPage, handlePrevPage } = postPagination();
  const [postType, setPostType] = useState("leep");
  const [sortOrder, setSortOrder] = useState("asc");

  // State for pending changes (not yet applied)
  const [pendingPostType, setPendingPostType] = useState("leep");
  const [pendingSortOrder, setPendingSortOrder] = useState("asc");

  // Fetch data using the current state
  const { data: users, totalPages, loading, error } = postFetchData(
    "http://localhost:3000/api/posts",
    currentPage,
    10,
    postType,
    sortOrder
  );

  // Handle applying the changes
  const handleApplyFilters = () => {
    setPostType(pendingPostType);
    setSortOrder(pendingSortOrder);
  };

  // Handle change events for post type and sort order
  const handlePostTypeChange = (e) => {
    setPendingPostType(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setPendingSortOrder(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="postType" className="text-white mr-2">
            Select Post Type:
          </label>
          <select
            id="postType"
            value={pendingPostType}
            onChange={handlePostTypeChange}
            className="form-select"
          >
            <option value="leep">Leep</option>
            <option value="post">Post</option>
            <option value="survey">Survey</option>
          </select>
        </div>
        <div>
          <label htmlFor="sortOrder" className="text-white mr-2">
            Sort Order:
          </label>
          <select
            id="sortOrder"
            value={pendingSortOrder}
            onChange={handleSortOrderChange}
            className="form-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={handleApplyFilters}
          >
            Apply
          </button>
        </div>
      </div>

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
                  <span className="badge rounded-pill text-bg-primary">
                    {post.post_status}
                  </span>
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
      <div className="flex justify-between mt-4">
        <button
          className={`btn btn-secondary ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePrevPage()}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`btn btn-secondary ${currentPage === totalPages ? "disabled" : ""}`}
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
