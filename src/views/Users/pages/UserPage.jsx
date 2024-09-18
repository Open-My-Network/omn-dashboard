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
  TablePagination,
  CircularProgress,
  Tooltip,
  IconButton,
  Grid2 as Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ButtonGroup,
  Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteUser from "../components/DeleteUser";
import UploadCSV from "../components/UploadCsv";
import { usePagination } from "../../../services/pagination_service";
import { fetchUsers } from "../../../services/get_service";

const UserPage = () => {
  const { pagination, changePage, changeRowsPerPage } = usePagination();
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState("All"); // State for role filter
  const [openUploadCSV, setOpenUploadCSV] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchUsers("http://3.218.118.83/api/users", {
          page: pagination.currentPage,
          limit: 10,
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
  }, [pagination.currentPage, pagination.limit, roleFilter]);

  // Handle deletion of user
  const handleUserDeleted = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Handle role filter change
  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
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
          <Grid size={6} container justifyContent="flex-start">
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
          <Grid size={6} container justifyContent="flex-end">
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button onClick={() => setOpenUploadCSV(true)}>Upload</Button>
              <Button>Add</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>

      <UploadCSV open={openUploadCSV} onClose={() => setOpenUploadCSV(false)} />

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
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={totalCount}
          rowsPerPage={pagination.limit}
          page={pagination.currentPage - 1}
          onPageChange={(event, newPage) => changePage(event, newPage + 1)}
          onRowsPerPageChange={changeRowsPerPage}
        />
      </TableContainer>
    </Layout>
  );
};

export default UserPage;
