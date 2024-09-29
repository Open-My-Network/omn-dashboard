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
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";

const AddCourseDrawer = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    chapter: "",
    grade: "6",
    content: "",
    school_name: "",
  });
  const [file, setFile] = useState(null); // State to hold the file
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleGradeChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      grade: `grade-${e.target.value}`, // Prepend 'grade-' to the selected grade
    }));
  };

  const handleChapterChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      chapter: `chapter-${e.target.value}`, // Prepend 'chapter-' to the chapter value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update the file state with the selected file
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object to send form data

    // Append form values to FormData
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }
    formData.append("file", file); // Append the file

    try {
      await axios.post("http://localhost:3000/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type for file upload
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);
          setUploadProgress(percent); // Update the upload progress
        },
      });
      toast.success("Course added successfully!");
      onClose();
      setFormValues({
        title: "",
        chapter: "",
        grade: "6", // Reset to default value, without 'grade-' prefix
        content: "",
        school_name: "",
      });
      setFile(null); // Reset the file state
      setUploadProgress(0); // Reset the progress
    } catch (error) {
      toast.error("Failed to add course: " + error.message);
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
          <Typography variant="h6">Add Course</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleAddCourse}>
          <TextField
            fullWidth
            margin="normal"
            label="Course Title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Chapter</InputLabel>
            <Select
              value={formValues.chapter.replace("chapter-", "")} // Display chapter without prefix
              onChange={handleChapterChange}
              label="Chapter"
              required
            >
              {["1", "2", "3", "4", "5"].map((chapter) => ( // You can adjust this list as needed
                <MenuItem key={chapter} value={chapter}>{`Chapter ${chapter}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Grade</InputLabel>
            <Select
              value={formValues.grade.replace("grade-", "")} // Display grade without prefix
              onChange={handleGradeChange}
              label="Grade"
              required
            >
              {["6", "7", "8", "9", "10"].map((grade) => (
                <MenuItem key={grade} value={grade}>{`Grade ${grade}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Content"
            name="content"
            value={formValues.content}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="School Name"
            name="school_name"
            value={formValues.school_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            required
            style={{ margin: '10px 0', width: '100%' }}
          />
          {uploadProgress > 0 && (
            <Box sx={{ width: "100%", marginBottom: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="body2" color="textSecondary">
                Uploading: {uploadProgress}%
              </Typography>
            </Box>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Course
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddCourseDrawer;
