import React, { useState } from 'react';
import userFetchData from '../../members/services/userFetchData.js';
import userPagination from '../../members/components/userPagination.js';
import SchoolDrawer from './SchoolDrawer.js';
import AddSchoolPage from './AddSchoolPage.js'; // Import AddSchoolPage

const SchoolPage = () => {
  const { currentPage, handleNextPage, handlePrevPage } = userPagination();
  const {
    data: schools,
    totalPages,
    loading,
    error,
  } = userFetchData('http://localhost:3000/api/schools', currentPage, 10);

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const handleViewSchool = (school) => {
    setSelectedSchool(school);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedSchool(null);
  };

  const handleAddSchool = (newSchool) => {
    // Logic to handle the addition of the new school (e.g., updating the state or refetching data)
    setModalOpen(false); // Close the modal after adding the school
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Add School
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-dark table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>School Name</th>
              <th>School Code</th>
              <th>Established Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, index) => (
              <tr key={school.id}>
                <td className="px-6 py-4">{(currentPage - 1) * 10 + index + 1}</td>
                <td>{school.sch_name}</td>
                <td>{school.sch_code}</td>
                <td>{new Date(school.sch_est).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-info me-2" onClick={() => handleViewSchool(school)}>
                    View
                  </button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className={`btn btn-secondary ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={handlePrevPage}
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
      <SchoolDrawer school={selectedSchool} isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
      
      {/* Bootstrap Modal for Adding School */}
      {isModalOpen && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New School</h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <AddSchoolPage onSchoolAdded={handleAddSchool} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolPage;
