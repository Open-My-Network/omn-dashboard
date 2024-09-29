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
  Button,
  CircularProgress,
} from "@mui/material";
import { fetchUsers } from "../../../services/get_service";
import AddCourseDrawer from "../components/AddCourseDrawer"; // Import your drawer component

const Courses = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseDrawerOpen, setCourseDrawerOpen] = useState(false);

  const handleCourseDrawerOpen = () => {
    setCourseDrawerOpen(true);
  };

  const handleCourseDrawerClose = () => {
    setCourseDrawerOpen(false);
    // Optionally refresh the post list when the drawer closes
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchUsers(`http://localhost:3000/courses`, {
        page: 1,
        limit: 10,
      });
      setPosts(result.items);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <div>Error: {error.message}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ width: "100%" }} mb={3}>
        <h2>Posts</h2>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleCourseDrawerOpen}
      >
        Add Course
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Chapter</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Video URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No posts available
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.chapter}</TableCell>
                  <TableCell>{post.grade}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>
                    <a
                      href={post.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.videoUrl}
                    </a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCourseDrawer open={courseDrawerOpen} onClose={handleCourseDrawerClose} />
    </Layout>
  );
};

export default Courses;
