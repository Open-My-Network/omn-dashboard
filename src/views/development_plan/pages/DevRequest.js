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
      const filteredData = response.data.data.filter(item => item.meta_key === 'sent_to');
      setData(filteredData);
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

  const handleAccept = async (item) => {
    try {
      // Step 1: Grant points by sending the SDP data
      await axios.post('http://localhost:3000/api/development-plan/grant-point', {
        key: "sdp" // Adjust if needed
      });

      // Step 2: After granting points, update the status to 'completed'
      await axios.put('http://localhost:3000/api/development-plan/verification-request', {
        id: item.meta.id,
        status: 'completed'
      });

      console.log(item.meta.id);

      // Step 3: Update the local state to reflect the status change
      setData((prevData) =>
        prevData.map((currentItem) =>
          currentItem.id === item.meta.id ? { ...currentItem, status: 'completed' } : currentItem
        )
      );
    } catch (error) {
      console.error('Error processing acceptance:', error);
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
              <td>
                {item.status === 'completed' ? (
                  <span>Completed</span>
                ) : (
                  <a href="#" onClick={() => handleAccept(item)}>Accept</a>
                )}
              </td>
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
