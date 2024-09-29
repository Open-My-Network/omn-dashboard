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
  Tooltip,
  IconButton,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ButtonGroup,
  Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteUser from "../components/DeleteUser";
import UploadCSVModal from "../components/UploadCsv";
import PaginationControl from "../../../components/PaginationControl";
import { fetchUsers } from "../../../services/get_service";
import AddUserDrawer from "../components/AddUser";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState("All");
  const [openUploadCSV, setOpenUploadCSV] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchUsers(`https://api.leepnetwork.com/users`, {
          page: currentPage,
          limit: rowsPerPage,
          sort: "desc",
          role: roleFilter === "All" ? "" : roleFilter,
        });
        setUsers(result.items);
        setTotalCount(result.pagination.totalCount);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, rowsPerPage, roleFilter]);

  // Handle deletion of user
  const handleUserDeleted = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Handle role filter change
  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1); // MUI Pagination component uses 0-based indexing
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
  };

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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                onChange={handleRoleFilterChange}
                label="Role"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="administrator">Administrator</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="author">Author</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4} container justifyContent="flex-end">
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button onClick={() => setOpenUploadCSV(true)}>Upload</Button>
              <Button onClick={handleDrawerToggle}>Add</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>

      <UploadCSVModal open={openUploadCSV} onClose={() => setOpenUploadCSV(false)} />
      <AddUserDrawer open={drawerOpen} onClose={handleDrawerToggle} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Registered</TableCell>
              <TableCell>School</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users available
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.user_email}</TableCell>
                  <TableCell>{user.display_name}</TableCell>
                  <TableCell>
                    {new Date(user.user_registered).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user.school_name}</TableCell>
                  <TableCell>
                    {/* Update Button */}
                    <Tooltip title="Update User">
                      <IconButton aria-label="update">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    {/* Delete Button */}
                    <DeleteUser
                      userId={user.id}
                      onUserDeleted={handleUserDeleted}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <PaginationControl
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </Layout>
  );
};

export default UserPage;
