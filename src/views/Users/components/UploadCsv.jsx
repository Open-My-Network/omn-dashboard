import React from "react";
import { Modal, Box, Typography, Button, Input } from "@mui/material";

const UploadCSV = ({ open, onClose }) => {
  const handleFileChange = (event) => {
    // Handle file change
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, width: 400, margin: "auto", bgcolor: "background.paper" }}>
        <Typography variant="h6">Upload CSV</Typography>
        <Input type="file" accept=".csv" onChange={handleFileChange} />
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default UploadCSV;
