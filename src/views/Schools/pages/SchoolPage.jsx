import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import {
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
  Collapse,
  Box,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { usePagination } from "../../../services/pagination_service";
import { fetchUsers } from "../../../services/get_service";

const SchoolPage = () => {
  const { pagination, changePage, changeRowsPerPage } = usePagination();
  const [schools, setSchools] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchUsers("http://3.218.118.83/api/schools", {
          page: pagination.currentPage,
          limit: 10,
        });
        setSchools(result.data);
        setTotalCount(result.pagination.totalCount);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination.currentPage, pagination.limit]);

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

  const handleExpandClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>School Name</TableCell>
              <TableCell>School Code</TableCell>
              <TableCell>School Est.</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schools.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No School available
                </TableCell>
              </TableRow>
            ) : (
              schools.map((sch) => (
                <React.Fragment key={sch.id}>
                  <TableRow>
                    <TableCell>{sch.sch_name}</TableCell>
                    <TableCell>{sch.sch_code}</TableCell>
                    <TableCell>{sch.sch_est}</TableCell>
                    <TableCell>
                      {/* Update Button */}
                      <Tooltip title="Update School">
                        <IconButton aria-label="update">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      {/* Expand Button */}
                      <IconButton
                        aria-label="expand"
                        onClick={() => handleExpandClick(sch.id)}
                      >
                        {expandedRow === sch.id ? '-' : '+'}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Collapse in={expandedRow === sch.id}>
                        <Box sx={{ padding: 2 }}>
                          <Typography variant="h6">Grades</Typography>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Grade Name</TableCell>
                                <TableCell>Sections</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {sch.grades.map((grade) => (
                                <React.Fragment key={grade.id}>
                                  <TableRow>
                                    <TableCell>{grade.grade_name}</TableCell>
                                    <TableCell>
                                      <Collapse in={expandedRow === sch.id}>
                                        <Table>
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>Section Name</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {grade.sections.map((section) => (
                                              <TableRow key={section.id}>
                                                <TableCell>{section.sec_name}</TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </Collapse>
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
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

export default SchoolPage;
