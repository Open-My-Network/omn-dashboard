import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify"; 

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  overflowY: "auto",
};

const AddSchoolModal = ({ open, onClose }) => {
  const [schoolName, setSchoolName] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [schoolEst, setSchoolEst] = useState("");
  const [principal, setPrincipal] = useState("");
  const [grades, setGrades] = useState([{ name: "Grade 6", sections: [] }]);

  const handleAddGrade = () => {
    setGrades([...grades, { name: "Grade 6", sections: [] }]);
  };

  const handleRemoveGrade = (index) => {
    const newGrades = grades.filter((_, i) => i !== index);
    setGrades(newGrades);
  };

  const handleAddSection = (gradeIndex) => {
    const newGrades = [...grades];
    newGrades[gradeIndex].sections.push(""); // Add an empty section for user input
    setGrades(newGrades);
  };

  const handleRemoveSection = (gradeIndex, sectionIndex) => {
    const newGrades = [...grades];
    newGrades[gradeIndex].sections = newGrades[gradeIndex].sections.filter((_, i) => i !== sectionIndex);
    setGrades(newGrades);
  };

  const handleSectionChange = (gradeIndex, sectionIndex, value) => {
    const newGrades = [...grades];
    newGrades[gradeIndex].sections[sectionIndex] = value;
    setGrades(newGrades);
  };

  const handleSubmit = async () => {
    const schoolData = {
      sch_name: schoolName,
      sch_code: schoolCode,
      sch_est: schoolEst,
      principal,
      grades,
    };

    try {
      await axios.post("https://api.leepnetwork.com/schools", schoolData);
      toast.success("School added successfully"); // Success toast
      onClose(); // Close the modal on successful submission
    } catch (error) {
      toast.error("Error adding school: " + (error.response?.data?.message || error.message)); // Error toast
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="h2">
            Add New School
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          label="School Name"
          variant="outlined"
          margin="normal"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
        <TextField
          fullWidth
          label="School Code"
          variant="outlined"
          margin="normal"
          value={schoolCode}
          onChange={(e) => setSchoolCode(e.target.value)}
        />
        <TextField
          fullWidth
          label="School Establishment Date"
          type="date"
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={schoolEst}
          onChange={(e) => setSchoolEst(e.target.value)}
        />
        <TextField
          fullWidth
          label="Principal"
          variant="outlined"
          margin="normal"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        {grades.map((grade, gradeIndex) => (
          <Box key={gradeIndex} mb={2}>
            <Typography variant="h6">Grade {gradeIndex + 1}</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Grade</InputLabel>
              <Select
                value={grade.name}
                onChange={(e) => {
                  const newGrades = [...grades];
                  newGrades[gradeIndex].name = e.target.value;
                  setGrades(newGrades);
                }}
              >
                <MenuItem value="Grade 6">Grade 6</MenuItem>
                <MenuItem value="Grade 7">Grade 7</MenuItem>
                <MenuItem value="Grade 8">Grade 8</MenuItem>
                <MenuItem value="Grade 9">Grade 9</MenuItem>
                <MenuItem value="Grade 10">Grade 10</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={() => handleAddSection(gradeIndex)}>Add Section</Button>
            {grade.sections.map((section, sectionIndex) => (
              <Box key={sectionIndex} display="flex" alignItems="center" mb={1}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={`Section ${sectionIndex + 1}`}
                  value={section}
                  onChange={(e) => handleSectionChange(gradeIndex, sectionIndex, e.target.value)}
                />
                <IconButton onClick={() => handleRemoveSection(gradeIndex, sectionIndex)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            {grades.length > 1 && (
              <Button color="error" onClick={() => handleRemoveGrade(gradeIndex)}>Remove Grade</Button>
            )}
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={handleAddGrade}>
          Add Another Grade
        </Button>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add School
        </Button>
      </Box>
    </Modal>
  );
};

export default AddSchoolModal;
