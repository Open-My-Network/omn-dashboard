import React, { useEffect, useState } from 'react';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewPost, setViewPost] = useState(null);
  const [filter, setFilter] = useState({ status: 'publish', type: 'post' });
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts?page=${currentPage}&limit=${postsPerPage}&post_type=${filter.type}&post_status=${filter.status}&sort_order=desc`);
        const result = await response.json();
        if (response.ok) {
          setPosts(result.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, filter]); // Add filter as a dependency

  useEffect(() => {
    const applyFilter = () => {
      let filtered = posts;

      if (filter.status) {
        filtered = filtered.filter(post => post.post_status === filter.status);
      }

      if (filter.type) {
        filtered = filtered.filter(post => post.post_type === filter.type);
      }

      setFilteredPosts(filtered);
    };

    applyFilter();
  }, [filter, posts]);

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleViewPost = (post) => {
    setViewPost(post);
  };

  const closeViewModal = () => setViewPost(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className="form-select"
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
          >
            <option value="publish">Published</option>
            <option value="auto-draft">Draft</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            name="type"
            value={filter.type}
            onChange={handleFilterChange}
          >
            <option value="post">Post</option>
            <option value="leep">Leep</option>
            <option value="survey">Survey</option>
          </select>
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>View</th>
            <th>Published Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.post_title}</td>
              <td>{post.guid}</td>
              <td>{new Date(post.post_date).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-info me-2" onClick={() => handleViewPost(post)}>View</button>
                <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map(number => (
            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(number + 1)}>
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {viewPost && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Post Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Title:</strong> {viewPost.post_title}</p>
                <p><strong>Post Type:</strong> {viewPost.post_type}</p>
                <p><strong>Published Date:</strong> {new Date(viewPost.post_date).toLocaleDateString()}</p>
                <p><strong>Content:</strong> {viewPost.post_content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {viewPost && <div className="modal-backdrop fade show" onClick={closeViewModal}></div>}
    </div>
  );
};

export default PostPage;
