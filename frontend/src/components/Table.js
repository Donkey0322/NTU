import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import { useDB } from "../hooks/useDB";

import Title from "./Title";
import Row from "./Row";

function Table_Board({ title }) {
  const { page, rowsPerPage, indexName, table, setPage, setRowsPerPage, CRUD } =
    useDB();
  const location = useLocation();
  const currentPath = location.pathname;
  // const sortedItems = table.slice().sort((a, b) => b.date - a.date);

  const Query = CRUD("R", currentPath);

  useEffect(() => {
    console.log(1);
    Query();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className="p-4">
      <Title>{title}</Title>
      <Table size="small">
       <TableHead>
          <TableRow>
            {table[0] && Object.keys(table[0]).map((column) => (
              <TableCell variant="head">{column}</TableCell>
            ))}
            <TableCell variant="head" />
          </TableRow>
        </TableHead>
        <TableBody>
          {table
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((tuple) => (
              <Row
                key={tuple[indexName]}
                item={tuple}
                updateItem={null}
                deleteItem={null}
              />
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={table.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}

export default Table_Board;
