import React from 'react';

const SchoolDrawer = ({ school, isOpen, onClose }) => {
  return (
    <div
      className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
      style={{ visibility: isOpen ? 'visible' : 'hidden', transition: 'visibility 0.3s ease-in-out' }}
      tabIndex="-1"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">School Details</h5>
        <button type="button" className="btn-close text-reset" onClick={onClose}></button>
      </div>
      <div className="offcanvas-body">
        {school ? (
          <div>
            <p><strong>School Name:</strong> {school.sch_name}</p>
            <p><strong>School Code:</strong> {school.sch_code}</p>
            <p><strong>School Est. Date:</strong> {school.sch_est}</p>
          </div>
        ) : (
          <p>No user selected</p>
        )}
      </div>
    </div>
  );
};

export default SchoolDrawer;
