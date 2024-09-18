import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";

const roles = ["Administrator", "Teacher", "Student", "Author"];
const schools = ["School A", "School B", "School C"];
const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];

const AddUser = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    school: "",
    grades: [],
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        grades: checked
          ? [...prev.grades, value]
          : prev.grades.filter((grade) => grade !== value),
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log(formValues);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", mx: "auto", p: 3 }}
    >
      {/* Form Fields */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <TextField
        fullWidth
        label="Email"
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formValues.role}
              onChange={handleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>School</InputLabel>
            <Select
              name="school"
              value={formValues.school}
              onChange={handleChange}
            >
              {schools.map((school) => (
                <MenuItem key={school} value={school}>
                  {school}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Grade</Typography>
          {grades.map((grade) => (
            <FormControlLabel
              key={grade}
              control={
                <Checkbox
                  value={grade}
                  checked={formValues.grades.includes(grade)}
                  onChange={handleChange}
                />
              }
              label={grade}
            />
          ))}
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
};

export default AddUser;
