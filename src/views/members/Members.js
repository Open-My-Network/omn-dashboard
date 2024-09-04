import React, { useState } from 'react'
import userFetchData from './services/userFetchData.js'
import userPagination from './components/userPagination.js'
import UserDrawer from './UserDrawer.js'

const Members = () => {
  const { currentPage, handleNextPage, handlePrevPage } = userPagination()
  const {
    data: users,
    totalPages,
    loading,
    error,
  } = userFetchData('http://localhost:3000/api/users', currentPage, 10)

  const [selectedUser, setSelectedUser] = useState(null)
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setDrawerOpen(false)
    setSelectedUser(null)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching data: {error.message}</p>

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="table table-dark table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="px-6 py-3">S.N.</th>
              <th className="px-6 py-3">Fullname</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Username</th>
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
  )
}

export default Members
