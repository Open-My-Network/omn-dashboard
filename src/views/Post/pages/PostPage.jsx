import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid2 as Grid
} from "@mui/material";
import { fetchUsers } from "../../../services/get_service";
import PaginationControl from "../../../components/PaginationControl";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postType, setPostType] = useState("post");
  const [postStatus, setPostStatus] = useState("publish");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  const handlePostStatusChange = (event) => {
    setPostStatus(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const applyFilters = async () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers(currentPage, rowsPerPage, postType, postStatus);
        setPosts(response.data);
        setTotalCount(response.totalCount);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, rowsPerPage, postType, postStatus]);

  if (loading) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Typography color="error">Error: {error}</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ width: "100%" }} mb={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Post Type</InputLabel>
              <Select
                value={postType}
                onChange={handlePostTypeChange}
                label="Post Type"
              >
                <MenuItem value="post">Post</MenuItem>
                <MenuItem value="leep">Leep</MenuItem>
                <MenuItem value="survey">Survey</MenuItem>
                <MenuItem value="teacher-time">Teacher Time</MenuItem>
                <MenuItem value="student-workbook">Student Workbook</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Post Status</InputLabel>
              <Select
                value={postStatus}
                onChange={handlePostStatusChange}
                label="Post Status"
              >
                <MenuItem value="publish">Publish</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={applyFilters}
              fullWidth
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Post Title</TableCell>
                <TableCell>Post Name</TableCell>
                <TableCell>Post Status</TableCell>
                <TableCell>Post Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No posts available
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.post_title}</TableCell>
                    <TableCell>{post.post_name}</TableCell>
                    <TableCell>{post.post_status}</TableCell>
                    <TableCell>
                      {new Date(post.post_date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <PaginationControl
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Layout>
  );
};

export default PostPage;
