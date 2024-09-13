import React, { useState } from 'react'
import useFetchApiData from '../../services/FetchData.js'
import pagePagination from '../../services/PaginateData.js'
import UserDrawer from './UserDrawer.js'
import AddMember from './AddMember.js'
import UploadMemberPage from './UploadMember.js'

const Members = () => {
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedOrder, setSelectedOrder] = useState('asc')
  const { currentPage, handleNextPage, handlePrevPage } = pagePagination()
  const [isModalOpen, setModalOpen] = useState(false)

  const {
    data: users,
    totalPages,
    loading,
    error,
  } = useFetchApiData('http://localhost:3000/api/users', currentPage, 10, {
    role: selectedRole,
    sort: selectedOrder,
  })

  const [selectedUser, setSelectedUser] = useState(null)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [isAddDrawerOpen, setAddDrawerOpen] = useState(false)

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value)
  }

  const handlOrderChange = (event) => {
    setSelectedOrder(event.target.value)
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setDrawerOpen(false)
    setSelectedUser(null)
  }

  const handleShowAddDrawer = () => {
    setAddDrawerOpen(true)
  }

  const handleCloseAddDrawer = () => {
    setAddDrawerOpen(false)
  }

  const handleAddSchool = (user) => {
    setModalOpen(false) // Close the modal after adding the school
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching data: {error}</p>

  return (
    <div className="container mx-auto p-4">
      <div className="row">
        <button className="m-4 btn btn-primary col-lg-3" onClick={() => handleShowAddDrawer()}>
          Add User
        </button>
        <button className="m-4 btn btn-primary col-lg-3" onClick={() => setModalOpen(true)}>
          Upload User
        </button>
      </div>
      {/* Filter */}
      <div className="row mb-4">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <label htmlFor="roleFilter" className="form-label">
            Filter by Role:
          </label>
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
        <div className="col-lg-6 col-md-6 col-sm-6">
          <label htmlFor="sortFilter" className="form-label">
            Sort:
          </label>
          <select
            id="sortFilter"
            className="form-select"
            value={selectedOrder}
            onChange={handlOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-bordered">
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
          className={`btn btn-primary ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePrevPage()}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`btn btn-primary ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handleNextPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* display model for upload csv for user */}
      {isModalOpen && <UploadMemberPage onSchoolAdded={handleAddSchool} />}

      <UserDrawer user={selectedUser} isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
      <AddMember isOpen={isAddDrawerOpen} onClose={handleCloseAddDrawer} />
    </div>
  )
}

export default Members
