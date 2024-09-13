import React, { useState } from 'react';

const UploadMemberPage = ({ onSchoolAdded }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type
      const allowedTypes = [
        'application/vnd.ms-excel', // .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
      ];

      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setErrorMessage(''); // clear any previous error
      } else {
        setFile(null);
        setErrorMessage('Please upload a valid Excel file (.xls or .xlsx).');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('Please select a valid file before uploading.');
      return;
    }

    // Create FormData to send the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/api/auth/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadMessage('File uploaded successfully.');
      } else {
        setUploadMessage('Failed to upload the file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('An error occurred during the upload.');
    }
  };

  return (
    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New School</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => onSchoolAdded(null)}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="d-flex justify-content-end">
              <a
                className="btn btn-sm btn-danger text-white"
                href="/public/sample-csv/UserCSV.xls"
                download="UserCSV.xls"
              >
                Download Sample
              </a>
            </div>
            <form className="my-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Upload CSV file
                </label>
                <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
              </div>
              {errorMessage && <div className="text-danger">{errorMessage}</div>}
              <button type="submit" className="btn btn-primary">Upload</button>
            </form>
            {uploadMessage && <div className="mt-3 text-success">{uploadMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMemberPage;
