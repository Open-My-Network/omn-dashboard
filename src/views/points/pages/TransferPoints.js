import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransferPoints = () => {
  const [pointsData, setPointsData] = useState(null); // Holds the points data
  const [selectedOption, setSelectedOption] = useState(''); // Holds the selected option
  const [selectedPoints, setSelectedPoints] = useState(null); // Holds the points for the selected option
  const [grantMessage, setGrantMessage] = useState(''); // Holds the message after granting points

  useEffect(() => {
    // Fetch points data from the API
    axios.get('http://localhost:3000/api/points')
      .then(response => {
        if (response.data && response.data.item) {
          setPointsData(response.data.item); // Save the API data
        } else {
          console.error("Invalid response format:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching points data:", error);
      });
  }, []);

  // Handle selection change
  const handleSelectChange = (e) => {
    const selectedKey = e.target.value;
    setSelectedOption(selectedKey); // Update the selected option

    if (pointsData && pointsData[selectedKey]) {
      setSelectedPoints(pointsData[selectedKey].points || 'No points available'); // Update the points based on the selected option
    } else {
      setSelectedPoints(null); // Clear points if no valid selection
    }
  };

  // Function to post the selected points to the backend
  const handleGrantPoints = () => {
    if (selectedOption && selectedPoints !== null) {
      axios.post('http://localhost:3000/api/development-plan/grant-point', {
        key: selectedOption,
      })
      .then(response => {
        console.log(response.data); // Log the full response for success
        setGrantMessage(`Success: ${response.data.message}`);
      })
      .catch(error => {
        console.error('Error:', error); // Log the full error object for debugging
  
        if (error.response) {
          console.error('Error data:', error.response.data); // Log response data for more details
          setGrantMessage(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request error:', error.request);
          setGrantMessage('No response from server.');
        } else {
          // Something else happened in setting up the request
          console.error('Setup error:', error.message);
          setGrantMessage('Error in request setup.');
        }
      });
    } else {
      setGrantMessage('Please select a valid option.');
    }
  };
  

  return (
    <div>
      <div className='row'>
        <div className='col-lg-6'>
          <p className='h3'>Transfer Points</p>
          <form>
            <div className='mb-3'>
              <label className='form-label'>Choose a Point</label>
              <select className='form-select' onChange={handleSelectChange}>
                <option value="">Select a Point</option>
                {/* Dynamically generate options from the pointsData */}
                {pointsData && Object.keys(pointsData).map((key) => (
                  <option key={key} value={key}>
                    {pointsData[key].label}
                  </option>
                ))}
              </select>
            </div>
            {/* Display points for the selected item */}
            <div className='mb-3'>
              <label className='form-label'>Points</label>
              <input
                type="text"
                className="form-control"
                value={selectedPoints !== null ? selectedPoints : ''}
                readOnly
              />
            </div>
            {/* Add button to grant points */}
            <button type="button" className="btn btn-primary" onClick={handleGrantPoints}>
              Grant Points
            </button>
          </form>
          {/* Display the message after the request */}
          {grantMessage && <p className="mt-3">{grantMessage}</p>}
        </div>
        <div className='col-lg-6'>
          <p className='h3'>Point List</p>
          {/* You can add more content related to the point list here */}
        </div>
      </div>
    </div>
  );
}

export default TransferPoints;
