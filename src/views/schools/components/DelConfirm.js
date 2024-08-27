import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Confirm Deletion</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes />
          </button>
        </div>
        <p className="mb-4">Are you sure you want to delete this grade?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
