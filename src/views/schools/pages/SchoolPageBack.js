import React, { useEffect, useState } from 'react';
import AddSchoolPage from './AddSchoolPage';
import SchoolDrawer from './SchoolDrawer';

const SchoolPage = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewSchool, setViewSchool] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/schools?page=1&limit=10');
        const result = await response.json();
        if (response.ok) {
          setSchools(result.data);
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
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSchoolAdded = (newSchool) => {
    if (newSchool) {
      setSchools((prevSchools) => [...prevSchools, newSchool]);
    }
    closeModal();
  };

  const handleDeleteSchool = async (schId) => {
    try {
      const response = await fetch(`http://localhost:3000/schools?schId=${schId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSchools((prevSchools) => prevSchools.filter((school) => school.id !== schId));
      } else {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleViewSchool = (school, event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    setViewSchool(school);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setViewSchool(null);
  };

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
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-primary" onClick={openModal}>New School</button>
      </div>
      <table className="table table-striped table-bordered">
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
          {schools.map((school) => (
            <tr key={school.id}>
              <td>{school.id}</td>
              <td>{school.sch_name}</td>
              <td>{school.sch_code}</td>
              <td>{new Date(school.sch_est).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-info me-2" onClick={(event) => handleViewSchool(school, event)}>View</button>
                <button className="btn btn-danger" onClick={() => handleDeleteSchool(school.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <AddSchoolPage onSchoolAdded={handleSchoolAdded} />}
      {showModal && <div className="modal-backdrop fade show"></div>}
      <SchoolDrawer school={viewSchool} isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
};

export default SchoolPage;
