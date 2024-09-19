import React, { useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";

const AddUserDrawer = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    user_email: "",
    user_pass: "",
    user_nicename: "",
    role: "subscriber",
    grade: "6",
    section: "",
    school_name: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      role: e.target.value
    }));
  };

  const handleGradeChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      grade: e.target.value
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        user_email: formValues.user_email,
        user_pass: formValues.user_pass,
        user_nicename: formValues.user_nicename,
        meta: [
          {
            meta_key: "wp_capabilities",
            meta_value: formValues.role
          },
          {
            meta_key: "school_name",
            meta_value: formValues.school_name
          },
          {
            meta_key: "grades",
            meta_value: [{ grade: formValues.grade }]
          }
        ]
      };

      await axios.post("http://localhost:3000/api/auth/register", userData);
      toast.success("User added successfully!");
      onClose(); // Close the drawer after adding the user
      setFormValues({
        user_email: "",
        user_pass: "",
        user_nicename: "",
        role: "subscriber",
        grade: "6",
        section: "",
        school_name: ""
      });
      // Optionally, trigger a refresh or callback to update the user list
    } catch (error) {
      toast.error("Failed to add user: " + error.message);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ width: 400, flexShrink: 0 }}
    >
      <Box sx={{ width: 400, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Add User</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleAddUser}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="user_email"
            value={formValues.user_email}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="user_pass"
            value={formValues.user_pass}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Display Name"
            name="user_nicename"
            value={formValues.user_nicename}
            onChange={handleInputChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={formValues.role}
              onChange={handleRoleChange}
              label="Role"
            >
              <MenuItem value="administrator">Admin</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="subscriber">Subscriber</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="School Name"
            name="school_name"
            value={formValues.school_name}
            onChange={handleInputChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Grade</InputLabel>
            <Select
              value={formValues.grade}
              onChange={handleGradeChange}
              label="Grade"
            >
              {["6", "7", "8", "9", "10"].map((grade) => (
                <MenuItem key={grade} value={grade}>{grade}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Section"
            name="section"
            value={formValues.section}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add User
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddUserDrawer;
