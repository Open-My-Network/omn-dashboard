import React, { useState } from 'react';
import useFetchApiData from '../../services/FetchData.js';
import pagePagination from '../../services/PaginateData.js';
import UserDrawer from './UserDrawer.js';

const Members = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const { currentPage, handleNextPage, handlePrevPage } = pagePagination();
  
  const { data: users, totalPages, loading, error } = useFetchApiData(
    'http://localhost:3000/api/users', 
    currentPage, 
    10, 
    { role: selectedRole }
  );

  const [selectedUser, setSelectedUser] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedUser(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Role Filter */}
      <div className="mb-4">
        <label htmlFor="roleFilter" className="form-label">Filter by Role:</label>
        <select
          id="roleFilter"
          className="form-select"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option value="">All</option>
          <option value="administrator">Administrator</option>
          <option value="principal">Principal</option>
          <option value="student">Student</option>
          <option value="subscriber">Subscriber</option>
          <option value="author">Author</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-dark table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="px-6 py-3">S.N.</th>
              <th className="px-6 py-3">Fullname</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="px-6 py-4">{(currentPage - 1) * 10 + index + 1}</td>
                <td className="px-6 py-4">{user.display_name}</td>
                <td className="px-6 py-4">{user.user_email}</td>
                <td className="px-6 py-4">{user.user_login}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <button
                    className="btn btn-outline-info btn-sm mx-2"
                    onClick={() => handleViewUser(user)}
                  >
                    View
                  </button>
                  <button className="btn btn-outline-danger btn-sm mx-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

      <UserDrawer user={selectedUser} isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </div>
  );
};

export default Members;
