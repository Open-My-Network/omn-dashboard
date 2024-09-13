import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddMember = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      user_email: email,
      user_pass: password,
      user_nicename: username,
      meta: [
        { meta_key: 'first_name', meta_value: firstName },
        { meta_key: 'last_name', meta_value: lastName },
        {meta_key: 'school', meta_value: school},
      ]
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      if (response.ok) {
        // Success Toast
        toast.success('User registered successfully!');
        onClose(); // Close the offcanvas after successful submission
      } else {
        // Error Toast
        toast.error(`Error: ${data.message || 'Registration failed'}`);
      }
    } catch (error) {
      // Network Error Toast
      toast.error(`Network Error: ${error.message}`);
    }
  };

  return (
    <div
      className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
      style={{
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'visibility 0.3s ease-in-out',
      }}
      tabIndex="-1"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Add New User</h5>
        <button type="button" className="btn-close text-reset" onClick={onClose}></button>
      </div>
      <div className="offcanvas-body">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <span className="input-group-text"> </span>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* <div className="mb-3">
            <label className="form-label">School</label>
            <input
              type="password"
              className="form-control"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
            />
          </div> */}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
