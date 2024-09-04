import React from 'react';

const UserDrawer = ({ user, isOpen, onClose }) => {
  return (
    <div
      className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
      style={{ visibility: isOpen ? 'visible' : 'hidden', transition: 'visibility 0.3s ease-in-out' }}
      tabIndex="-1"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">User Details</h5>
        <button type="button" className="btn-close text-reset" onClick={onClose}></button>
      </div>
      <div className="offcanvas-body">
        {user ? (
          <div>
            <p><strong>Full Name:</strong> {user.display_name}</p>
            <p><strong>Email:</strong> {user.user_email}</p>
            <p><strong>Username:</strong> {user.user_login}</p>
          </div>
        ) : (
          <p>No user selected</p>
        )}
      </div>
    </div>
  );
};

export default UserDrawer;
