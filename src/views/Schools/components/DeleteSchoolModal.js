import React from "react";
import { Modal, Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

const DeleteModal = ({ open, onClose, schoolId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/schools?schId=${schoolId}`);
      toast.success("School deleted successfully");
      onDelete(); // Callback to refresh the list
      onClose();
    } catch (error) {
      toast.error("Error deleting school");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Confirm Deletion
        </Typography>
        <Typography variant="body1">
          Are you sure you want to delete this school? This action cannot be undone.
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
