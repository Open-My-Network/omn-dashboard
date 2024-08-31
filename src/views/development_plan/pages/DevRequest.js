import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DevPlanVerification = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/development-plan/verification-request?page=${page}&limit=10`);
      setData(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Development Plan Verification Requests</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">SDP Title</th>
            <th scope="col">Goal Title</th>
            <th scope="col">Goal Timeline</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.plan.sdp_title}</td>
              <td>{item.meta.goal_title}</td>
              <td>{item.meta.goal_time_line}</td>
              <td><a href="">Accept</a> | <a href="">Reject</a> </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DevPlanVerification;
