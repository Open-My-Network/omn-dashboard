import React, { useState } from "react";
import {  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser } from "../../../services/delete_service";

const DeleteUser = ({ userId, onUserDeleted }) => {
  const [open, setOpen] = useState(false);

  // Open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle delete user
  const handleDelete = async () => {
    try {
      // Call the deleteUser service with dynamic userId
      await deleteUser("users", `userId=${userId}`);
      toast.success("User deleted successfully!");
      onUserDeleted(userId);
      handleClose();
    } catch (error) {
      toast.error("Error deleting user!");
    }
  };

  return (
    <>
      {/* Delete Button */}
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Delete
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Delete User"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteUser;
