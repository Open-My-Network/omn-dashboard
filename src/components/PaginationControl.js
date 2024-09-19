import React from "react";
import { TablePagination } from "@mui/material";

const PaginationControl = ({ count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 50]} // Options for rows per page
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page - 1} // MUI Pagination component uses 0-based indexing
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default PaginationControl;
